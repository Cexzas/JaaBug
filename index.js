const { default: makeWASocket, DisconnectReason, makeInMemoryStore, useMultiFileAuthState, jidDecode, Browsers } = require('@whiskeysockets/baileys')
const fs = require('fs')
const pino = require('pino')
const { Boom } = require('@hapi/boom')
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, sleep } = require('./Database/myfunction');

async function connectToWhatsApp () { 
const store = makeInMemoryStore({ })
// can be read from a file
store.readFromFile('./baileys_store.json')
// saves the state to a file every 10s
setInterval(() => {
    store.writeToFile('./baileys_store.json')
}, 10_000)
const { state, saveCreds } = await useMultiFileAuthState('session')
    const sock = makeWASocket({
        // can provide additional config here
        auth: state, 
        printQRInTerminal: true, 
        logger: pino({ level: "fatal" }),
        browser: Browsers.ubuntu('Chrome'), 
        emitOwnEvents: true, 
        markOnlineOnConnect: false, 
        syncFullHistory: true,
        fireInitQueries: true,
        getMessage: async key => {
			const jid = jidNormalizedUser(key.remoteJid);
			const msg = await store.loadMessage(jid, key.id);

			return msg?.message || '';
		},
		shouldSyncHistoryMessage: msg => {
			console.log(`Memuat Chat [${msg.progress}%]`);
			return !!msg.syncType;
		},
    })
    
    sock.public = true
    sock.serializeM = (m) => smsg(sock, m, store)
    sock.ev.on ('creds.update', saveCreds)
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if(connection === 'close') {
            let shouldReconnect = new Boom(lastDisconnect?.error)?.output.statusCode
            console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect)
            // reconnect if not logged out
            if(shouldReconnect) {
                connectToWhatsApp()
            }
        } else if(connection === 'open') {
            console.log('opened connection')
        }
    })
    
    sock.ev.on('messages.upsert', async chatUpdate => {
        try {
            mek = chatUpdate.messages[0]
            if (!mek.message) return
            mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
            if (mek.key && mek.key.remoteJid === 'status@broadcast') return
            if (!sock.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
            if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
            if (mek.key.id.startsWith('FatihArridho_')) return
            m = smsg(sock, mek, store)
            require('./sock')(sock, m, chatUpdate, store)
        } catch (err) {
            console.log(err)
        }
    })
    
    sock.decodeJid = (jid) => {
    if (!jid) return jid; 
    if (/:\d+@/gi.test(jid)) {
      let decode = jidDecode(jid) || {}; 
      return decode.user && decode.server && decode.user + '@' + decode.server || jid;
    } else return jid;
  }; 
  sock.ev.on('contacts.update', update => { 
    for (let contact of update) {
      let id = sock.decodeJid(contact.id); 
      if (store && store.contacts) store.contacts[id] = { id, name: contact.notify };
    }
   });
}
// run in main file
connectToWhatsApp()