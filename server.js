require('./config.js');

const makeWASocket = require('phoenix-baileys').default;




const {
  default:
  generateWAMessageFromContent,
  getAggregateVotesInPollMessage,
  downloadContentFromMessage,
  useMultiFileAuthState,
  generateWAMessage,
  makeInMemoryStore,
  DisconnectReason,
  areJidsSameUser,
  getContentType,
  decryptPollVote,
  relayMessage,
  jidDecode,
  Browsers,
  proto,
  } = require("phoenix-baileys")




const pino = require("pino");
const fs = require("fs");
const chalk = require("chalk");
const FileType = require("file-type");

const CFonts = require("cfonts");
const { exec, spawn, execSync } = require("child_process");
const moment = require("moment-timezone");
const PhoneNumber = require("awesome-phonenumber");
const { promisify } = require("util");
const writeFileAsync = promisify(fs.writeFile);
const fetch = require('node-fetch'); 
const path = require("path");

const pendingRegistrationsFilePath = './pending_registrations.json';
const registeredUsersFilePath = './registered_users.json';
const axios = require("axios");
const {
  imageToWebp,
  videoToWebp,
  writeExifImg,
  writeExifVid,
} = require('./lib/exif.js');
const {
  smsg,
  isUrl,
  generateMessageTag,
  getBuffer,
  getSizeMedia,
  fetchJson,
  getRandom,

  sleep,
} = require('./lib/myfunc.js');
const ffmpeg = require('@ffmpeg/ffmpeg')

const figlet = require("figlet");
const { color } = require('./lib/color.js');
let start = new Date
const store = makeInMemoryStore({
  logger: pino().child({ level: "silent", stream: "store" }),
});
const readline = require("readline")
let phoneNumber = "491741711168"
const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code")
const useMobile = process.argv.includes("--mobile")

const Ehztext = (text, style = 1) => {
  var abc = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('');
  var ehz = {
    1: 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡxʏᴢ1234567890'
  };
  var replacer = [];
  abc.map((v, i) =>
    replacer.push({
      original: v,
      convert: ehz[style].split('')[i]
    })
  );
  var str = text.toLowerCase().split('');
  var output = [];
  str.map((v) => {
    const find = replacer.find((x) => x.original == v);
    find ? output.push(find.convert) : output.push(v);
  });
  return output.join('');
};

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))


const groupFile = "./database/group/groupchats.json";


function loadGroups() {
    if (!fs.existsSync(groupFile)) return [];
    const data = JSON.parse(fs.readFileSync(groupFile, "utf8"));
    return data.groups || [];
}

function saveGroups(groups) {
    fs.writeFileSync(groupFile, JSON.stringify({ groups }, null, 4));
}


const sessionFiles = [
  path.join('./sess/session', 'creds.json'),
  path.join('./sess/sessionName1_Private', 'creds.json'),
  path.join('./sess/sessionName2_Hadex', 'creds.json')
];


const lastPropHashRegex = /}"lastPropHash":".*?"}$/;

function checkAndFixJSON(filePath) {
  try {
      if (!fs.existsSync(filePath)) return;

      let content = fs.readFileSync(filePath, "utf8");

      
      if (lastPropHashRegex.test(content)) {
          console.log(`Fehlerhafte Endung erkannt in ${filePath}. Korrigiere Datei...`);

          
          let fixedContent = content.replace(lastPropHashRegex, "}");

        
          fs.writeFileSync(filePath, fixedContent, "utf8");
          console.log(`Datei ${filePath} korrigiert.`);
      }
  } catch (error) {
      console.error(`Fehler beim Verarbeiten von ${filePath}:`, error);
  }
}


setInterval(() => {
  sessionFiles.forEach(checkAndFixJSON);
}, 3000);

async function startPhoenix() {
  console.log(
    color(
      figlet.textSync("Exiqonbotz", {
        font: "Standard",
        horizontalLayout: "default",
        vertivalLayout: "default",
        //width: 80,
        // whitespaceBreak: true,
        whitespaceBreak: false,
      }),
      "green"
    )
  );
const { state, saveCreds } = await useMultiFileAuthState(global.sessionName);
  const Phoenix = makeWASocket({
    logger: pino({ level: "silent" }),
    printQRInTerminal: false,
    markOnlineOnConnect: true,
    auth: state,
    emitOwnEvents: true,
    version: [2, 3000, 1017531287],
     browser: Browsers.ubuntu("Edge"),
   
    }, store);

  store.bind(Phoenix.ev);


    // login use pairing code
   // source code https://github.com/WhiskeySockets/Baileys/blob/master/Beispiel/Beispiel.ts#L61
   if (!Phoenix.authState.creds.registered) {
   
    phoneNumberr = await question(chalk.bgBlack(chalk.greenBright(`The Number: `)))
    phoneNumber = phoneNumberr.replace(/[^0-9]/g, '')


   let code = await Phoenix.requestPairingCodeV2(phoneNumber, "AAAAAAAA");
    code = code?.match(/.{1,4}/g)?.join("-") || code
    console.log(chalk.black(chalk.bgGreen(`Your Pairing Code : `)), chalk.black(chalk.white(code)))

}

 //

  
Phoenix.ev.on("messages.upsert", async (message) => {
    try {
        // Deine Logik hier
    } catch (error) {
        // Fehlerbehandlung ohne Logging
    }
});

Phoenix.ev.on("group-participants.update", async (event) => {
    try {
        let groupId = event.id; // Stelle sicher, dass die richtige groupId genutzt wird
        let groups = loadGroups();
        if (groups.includes(groupId)) {
            groups = groups.filter(id => id !== groupId);
            saveGroups(groups);
            console.log(`Bot wurde aus der Gruppe ${groupId} entfernt.`);
        }
    } catch (error) {
        // Fehlerbehandlung ohne Logging
    }
});

Phoenix.ev.on("groups.update", async (updates) => {
    try {
        updates.forEach(group => {
            if (group.removed) {
                let groups = loadGroups();
                if (groups.includes(group.id)) {
                    groups = groups.filter(id => id !== group.id);
                    saveGroups(groups);
                    console.log(`Bot wurde aus der Gruppe ${group.id} entfernt.`);
                }
            }
        });
    } catch (error) {
        // Fehlerbehandlung ohne Logging
    }
});

Phoenix.ev.on('messages.upsert', async (msg) => {
  const message = msg.messages[0];
  if (!message.key.participant || !message.key.remoteJid.endsWith('@g.us')) return; // Nur Gruppen prüfen

  const groupId = message.key.remoteJid; // Gruppen-ID
  const senderId = message.key.participant.replace('@s.whatsapp.net', ''); // Nur Nummer extrahieren

  // Lade die Gruppen-Datenbank und Blacklist
  const groupData = JSON.parse(fs.readFileSync('./database/group/groupchats.json', 'utf8') || "{}");


  // Prüfen, ob die Gruppe in der Datenbank ist und die Nummer in der Blacklist ist
  if (groupData.groups.includes(groupId)) {
      try {
          // Nutzer aus der Gruppe entfernen
          


     
     
        } catch (error) {
          console.error(`Fehler beim Entfernen von ${senderId} aus der Gruppe ${groupId}:`, error);
      }
  }
});


Phoenix.ev.on('messages.upsert', async (msg) => {
  const message = msg.messages[0];
  const groupId = message.key.remoteJid;
  const senderId = message.key.participant || message.key.remoteJid;

  // muteids.json laden
  const muteData = JSON.parse(fs.readFileSync('./database/muteids.json', 'utf8') || "{}");

  // Falls der Nutzer stummgeschaltet ist, lösche die Nachricht
  if (muteData[groupId] && muteData[groupId].includes(senderId)) {
      await Phoenix.sendMessage(groupId, { delete: message.key });
  }

});





Phoenix.ev.on("messages.upsert", async chatUpdate => {
  try {
       mek = chatUpdate.messages[0];
      if (!mek.message) return
      mek.message =
          Object.keys(mek.message)[0] === "ephemeralMessage"
          ? mek.message.ephemeralMessage.message
          : mek.message;
      if (mek.key && mek.key.remoteJid === "status@broadcast") return;
         
             const ownerNumbers = ['491741711168@s.whatsapp.net']; // <- deine Nummer hier
const isCreator = ownerNumbers.includes(mek.key.participant || mek.key.remoteJid);
if (!Phoenix.public && !isCreator && chatUpdate.type === "notify") return;
   
          // if (mek.key.id.startsWith("BAE5") && mek.key.id.length === 16) return;
          if (mek.key.id.startsWith('Phoenix') && mek.key.id.length === 16) return
          if (mek.key.id.startsWith('BAE5')) return
      m = smsg(Phoenix, mek, store);
     require('./Core.js')(Phoenix, m, chatUpdate, store);
  }
  catch (err) {
      console.log(err)
  }
      
  
})





// Anti Call
Phoenix.ev.on('call', async (baronPapa) => {
  if (global.anticall){
console.log(baronPapa)
for (let baronFucks of baronPapa) {
if (baronFucks.isGroup == false) {
if (baronFucks.status == "offer") {
let baronBlokMsg = await Phoenix.sendTextWithMentions(baronFucks.from, `Automatisches Blocksystem!\n\nRufe diese Nummer nicht an!\n\nEine Entsperrung deiner nummer ist durch die Kontaktierung eines Owner möglich.`)
 Phoenix.sendContact(baronFucks.from, ["491741711168"], baronBlokMsg);
 Phoenix.sendContact(baronFucks.from, ["4365069006631"], baronBlokMsg);
//  Phoenix.sendContact(baronFucks.from, ["436502298906666"], baronBlokMsg);
          
// Phoenix.sendContact(baronFucks.from, Ownerblock, baronBlokMsg)
await sleep(4000)
 Phoenix.updateBlockStatus(baronFucks.from, "block")
}
}
}
}
})



  function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())]
  }




Phoenix.ev.on('group-participants.update', async (anu) => {
    try {
        const groupId = anu.id;
        if (global.groupEvents [groupId]) { // Check if group event handling is enabled for this group
            console.log(anu);
            
            let metadata = await Phoenix.groupMetadata(anu.id);
            let participants = anu.participants;
            for (let num of participants) {
                // ... existing logic for adding and removing participants ...

                let ppuser;
                try {
                    ppuser = await Phoenix.profilePictureUrl(num, 'image');
                } catch {
                    ppuser = 'https://images6.alphacoders.com/690/690121.jpg';
                }

                let ppgroup;
                try {
                    ppgroup = await Phoenix.profilePictureUrl(anu.id, 'image');
                } catch {
                    ppgroup = 'https://telegra.ph/file/4cc2712eee93c105f6739.jpg';
                }

                let targetname = await Phoenix.getName(num);
                let grpmembernum = metadata.participants.length;

                if (anu.action == 'add') {
                    // ... existing logic for welcoming new participants ...
                    let WAuserName = num;
                    let Phoenixtext = `Aloha! @${WAuserName.split("@")[0]}!\nIch bin │𝐏𝐇𝐎𝐄𝐍𝐈𝐗│𝐁𝐎𝐓 🌃\nWillkommen in: ${metadata.subject}.\nGruppenbeschreibung:\n${metadata.desc}`;
                    let buttonMessage = {
                        image: await getBuffer(ppgroup),
                        mentions: [num],
                        caption: Phoenixtext,
                        footer: `${global.BotName}`,
                        headerType: 4,
                    };
                    Phoenix.sendMessage(anu.id, buttonMessage);
                } else if (anu.action == 'remove') {
                    // ... existing logic for saying goodbye to departing participants ...
                    let WAuserName = num;
                    let Phoenixtext = `Bye Bye 👋🏼, @${WAuserName.split("@")[0]},\nKomm bitte nie wieder!❤️`;
                    let buttonMessage = {
                        image: await getBuffer(ppuser),
                        mentions: [num],
                        caption: Phoenixtext,
                        footer: `${global.BotName}`,
                        headerType: 4,
                    };
                    Phoenix.sendMessage(anu.id, buttonMessage);
                }
            }
        }
    } catch (err) {
      
    }
});




Phoenix.ev.on('group-participants.update', async (anu) => {
  try {
      const groupId = anu.id;
      if (global.groupEvents [groupId]) { 
          console.log(anu);
          
       
            let participants = anu.participants
            let user = anu.author
            for (let num of participants) {
            try {
            ppuser = await Phoenix.profilePictureUrl(num, 'image')
            } catch (err) {
            ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
            try {
            ppgroup = await Phoenix.profilePictureUrl(anu.id, 'image')
            } catch (err) {
            ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60'
            }
             if (anu.action == 'promote') {
              let user = anu.author
            let baronName = num
            baronbody = Ehztext(`@${user.split("@")[0]} hat @${baronName.split("@")[0]} Admin gegeben!`)
               Phoenix.sendMessage(anu.id,
             { text: baronbody,
             contextInfo:{
             mentionedJid:[num, user],
             "externalAdReply": {}
            }})
            } else if (anu.action == 'demote') {
         
            let baronName = num
            let user = anu.author
            baronbody = Ehztext(`@${user.split("@")[0]} hat @${baronName.split("@")[0]} Admin entzogen!`)
            Phoenix.sendMessage(anu.id,
             { text: baronbody,
             contextInfo:{
             mentionedJid:[num,user],
             "externalAdReply": {}
            }})
            }}
              
          
      }
  } catch (err) {
    
  }
});

  //
  Phoenix.decodeJid = (jid) => {
    if (!jid) return jid;
    if (/:\d+@/gi.test(jid)) {
      let decode = jidDecode(jid);
      if (decode && decode.user && decode.server) {
        return decode.user + "@" + decode.server;
      } else {
        console.error("jidDecode returned undefined or incomplete for jid:", jid);
        return jid;
      }
    } else {
      return jid;
    }
  };
  

  Phoenix.ev.on("contacts.update", (update) => {
    for (let contact of update) {
      let id = Phoenix.decodeJid(contact.id);
      if (store && store.contacts)
        store.contacts[id] = { id, name: contact.notify };
    }
  });

  Phoenix.getName = (jid, withoutContact = false) => {
    id = Phoenix.decodeJid(jid);
    withoutContact = Phoenix.withoutContact || withoutContact;
    let v;
    if (id.endsWith("@g.us"))
      return new Promise(async (resolve) => {
        v = store.contacts[id] || {};
        if (!(v.name || v.subject)) v = Phoenix.groupMetadata(id) || {};
        resolve(
          v.name ||
          v.subject ||
          PhoneNumber("+" + id.replace("@s.whatsapp.net", "")).getNumber(
            "international"
          )
        );
      });
    else
      v =
        id === "0@s.whatsapp.net"
          ? {
            id,
            name: "WhatsApp",
          }
          : id === Phoenix.decodeJid(Phoenix.user.id)
            ? Phoenix.user
            : store.contacts[id] || {};
    return (
      (withoutContact ? "" : v.name) ||
      v.subject ||
      v.verifiedName ||
      PhoneNumber("+" + jid.replace("@s.whatsapp.net", "")).getNumber(
        "international"
      )
    );
  };

  Phoenix.sendContact = async (jid, kon, quoted = "", opts = {}) => {
    let list = [];
    for (let i of kon) {
      list.push({
        displayName: await Phoenix.getName(i + "@s.whatsapp.net"),
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await Phoenix.getName(
          i + "@s.whatsapp.net"
        )}\nFN:Phoenix Owner\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Click here to chat\nEND:VCARD`,
      });
    }
    Phoenix.sendMessage(
      jid,
      {
        contacts: { displayName: `${list.length} Contact`, contacts: list },
        ...opts,
      },
      { quoted }
    );
  };

  Phoenix.setStatus = (status) => {
    Phoenix.query({
      tag: "iq",
      attrs: {
        to: "@s.whatsapp.net",
        type: "set",
        xmlns: "status",
      },
      content: [
        {
          tag: "status",
          attrs: {},
          content: Buffer.from(status, "utf-8"),
        },
      ],
    });
    return status;
  };

  Phoenix.public = true;

  Phoenix.serializeM = (m) => smsg(Phoenix, m, store);



  Phoenix.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;

    if (update.connection == "connecting" || update.receivedPendingNotifications == "false") {
      console.log(color(`\nVerbindung wird hergestellt...`, 'green'))
    }
    if (update.connection == "open" || update.receivedPendingNotifications == "true") {
           
            let end = new Date - start
            console.log(end + 'ms')
            console.log(color(` `,'magenta'))
            console.log(color(`Verbunden mit => ` + JSON.stringify(Phoenix.user, null, 2), 'green'))
            
            Phoenix.sendMessage("120363341591861773@g.us", {
      text: `Wieder verbunden &  ${end + 'ms'}`,
      contextInfo: {
      externalAdReply: {
      title: "Benachrichtigung online ",
        body:`Exiqonbotz` ,
        thumbnailUrl:"https://i.ibb.co/X8vVXd4/pic1.jpg",
        mediaType: 1,
        renderLargerThumbnail: true
      }}});
      await sleep(4000);
      Phoenix.sendMessage("120363341591861773@g.us", {text: `${prefix}`});
    
  }


    if (connection === "close") {
      let reason = lastDisconnect.error
        ? lastDisconnect?.error?.output.statusCode
        : 0;
      if (reason === DisconnectReason.badSession) {
        console.log(`Bad Session File, Please Delete Session and Scan Again`);
        process.exit();
      } else if (reason === DisconnectReason.connectionClosed) {
        console.log("Connection closed, Verbinde erneut....");
        startPhoenix();
      } else if (reason === DisconnectReason.connectionLost) {
        console.log("Connection Lost from Server, Verbinde erneut...");
        startPhoenix();
      } else if (reason === DisconnectReason.connectionReplaced) {
        console.log(
          "Connection Replaced, Another New Session Opened, Please Close Current Session First"
        );
        process.exit();
      } else if (reason === DisconnectReason.loggedOut) {
        console.log(`Device Logged Out, Please Delete Session and Scan Again.`);
        process.exit();
        
      } else if (reason === DisconnectReason.restartRequired) {
        console.log("Restart Required, Restarting...");
        startPhoenix();
      } else if (reason === DisconnectReason.timedOut) {
        console.log("Connection TimedOut, Verbinde erneut...");
        startPhoenix();
      } else {
        console.log(`Unknown DisconnectReason: ${reason}|${connection}`);
        startPhoenix();
         
     

      }

      
  }
    //console.log('Connected...', update)
  });

  Phoenix.ev.on("creds.update", saveCreds);



   
  Phoenix.copyNForward = async (jid, message, forceForward = false, options = {}) => {
    let vtype
    if (options.readViewOnce) {
    message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
    vtype = Object.keys(message.message.viewOnceMessage.message)[0]
    delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
    delete message.message.viewOnceMessage.message[vtype].viewOnce
    message.message = {
    ...message.message.viewOnceMessage.message
    }
    }
    let mtype = Object.keys(message.message)[0]
    let content = await generateForwardMessageContent(message, forceForward)
    let ctype = Object.keys(content)[0]
    let context = {}
    if (mtype != "conversation") context = message.message[mtype].contextInfo
    content[ctype].contextInfo = {
    ...context,
    ...content[ctype].contextInfo
    }
    const waMessage = await generateWAMessageFromContent(jid, content, options ? {
    ...content[ctype],
    ...options,
    ...(options.contextInfo ? {
    contextInfo: {
    ...content[ctype].contextInfo,
    ...options.contextInfo
    }
    } : {})
    } : {})
    await Phoenix.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
    return waMessage
    }








  /**
   *
   * @param {*} jid
   * @param {*} text
   * @param {*} quoted
   * @param {*} options
   * @returns
   */
  Phoenix.sendText = (jid, text, quoted = "", options) =>
    Phoenix.sendMessage(jid, { text: text, ...options }, { quoted });

  /**
   *
   * @param {*} jid
   * @param {*} path
   * @param {*} caption
   * @param {*} quoted
   * @param {*} options
   * @returns
   */
  Phoenix.sendImage = async (jid, path, caption = "", quoted = "", options) => {
    let buffer = Buffer.isBuffer(path)
      ? path
      : /^data:.*?\/.*?;base64,/i.test(path)
        ? Buffer.from(path.split`,`[1], "base64")
        : /^https?:\/\//.test(path)
          ? await await getBuffer(path)
          : fs.existsSync(path)
            ? fs.readFileSync(path)
            : Buffer.alloc(0);
    return await Phoenix.sendMessage(
      jid,
      { image: buffer, caption: caption, ...options },
      { quoted }
    );
  };

  /**
   *
   * @param {*} jid
   * @param {*} path
   * @param {*} caption
   * @param {*} quoted
   * @param {*} options
   * @returns
   */
  Phoenix.sendVideo = async (
    jid,
    path,
    caption = "",
    quoted = "",
    gif = false,
    options
  ) => {
    let buffer = Buffer.isBuffer(path)
      ? path
      : /^data:.*?\/.*?;base64,/i.test(path)
        ? Buffer.from(path.split`,`[1], "base64")
        : /^https?:\/\//.test(path)
          ? await await getBuffer(path)
          : fs.existsSync(path)
            ? fs.readFileSync(path)
            : Buffer.alloc(0);
    return await Phoenix.sendMessage(
      jid,
      { video: buffer, caption: caption, gifPlayback: gif, ...options },
      { quoted }
    );
  };

  /**
   *
   * @param {*} jid
   * @param {*} path
   * @param {*} quoted
   * @param {*} mime
   * @param {*} options
   * @returns
   */
  Phoenix.sendAudio = async (jid, path, quoted = "", ptt = false, options) => {
    let buffer = Buffer.isBuffer(path)
      ? path
      : /^data:.*?\/.*?;base64,/i.test(path)
        ? Buffer.from(path.split`,`[1], "base64")
        : /^https?:\/\//.test(path)
          ? await await getBuffer(path)
          : fs.existsSync(path)
            ? fs.readFileSync(path)
            : Buffer.alloc(0);
    return await Phoenix.sendMessage(
      jid,
      { audio: buffer, ptt: ptt, ...options },
      { quoted }
    );
  };

  /**
   *
   * @param {*} jid
   * @param {*} text
   * @param {*} quoted
   * @param {*} options
   * @returns
   */
  Phoenix.sendTextWithMentions = async (jid, text, quoted, options = {}) =>
    Phoenix.sendMessage(
      jid,
      {
        text: text,
        contextInfo: {
          mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(
            (v) => v[1] + "@s.whatsapp.net"
          ),
        },
        ...options,
      },
      { quoted }
    );

  /**
   *
   * @param {*} jid
   * @param {*} path
   * @param {*} quoted
   * @param {*} options
   * @returns
   */
  Phoenix.sendImageAsSticker = async (jid, media, m, options = {}) => {
    let { Sticker, StickerTypes } = require('wa-sticker-formatter')
    let jancok = new Sticker(media, {
        pack:"¿?𝐸𝑥ͥ𝑖𝑞ͣ𝑜ͫ𝑛¿?", // The pack name
        author:"𝐕𝐢𝐯𝐞𝐫𝐞 𝐝𝐢𝐮 𝐏𝐡𝐨𝐞𝐧𝐢𝐱🌃",// The author name
        type: StickerTypes.FULL, // The sticker type
        categories: ['🤩', '🎉'], // The sticker category
        id: '12345', // The sticker id
        quality: 50, // The quality of the output file
        background: '#FFFFFF00' // The sticker background color (only for full stickers)
    })
    let stok = getRandom(".webp")
    let nono = await jancok.toFile(stok)
    let nah = fs.readFileSync(nono)
   await Phoenix.sendMessage(jid, {  sticker: nah })   				
  return await fs.unlinkSync(stok)
  }

  /**
   *
   * @param {*} jid
   * @param {*} path
   * @param {*} quoted
   * @param {*} options
   * @returns
   */
  Phoenix.sendVideoAsSticker = async (jid, media, m, options = {}) => {
    const { Sticker, StickerTypes } = require('wa-sticker-formatter');

    // Erstellen eines neuen Stickers aus dem Video
    let videoSticker = new Sticker(media, {
        pack: "¿?𝐸𝑥ͥ𝑖𝑞ͣ𝑜ͫ𝑛¿?", // Der Pack-Name
        author: "𝐕𝐢𝐯𝐞𝐫𝐞 𝐝𝐢𝐮 𝐏𝐡𝐨𝐞𝐧𝐢𝐱🌃", // Der Autorenname
        type: StickerTypes.FULL, // Der Sticker-Typ
        categories: ['🤩', '🎉'], // Die Sticker-Kategorie
        id: '12345', // Die Sticker-ID
        quality: 50, // Die Qualität der Ausgabe
        background: '#FFFFFF00' // Hintergrundfarbe des Stickers (für Full Sticker)
    });

    // Generiere einen zufälligen Namen für die temporäre Datei
    let tempStickerFile = getRandom(".webp");

    // Konvertiere das Video zu einem Sticker und speichere es in einer Datei
    let stickerFilePath = await videoSticker.toFile(tempStickerFile);

    // Lese die konvertierte Datei ein und sende sie als Sticker
    let stickerBuffer = fs.readFileSync(stickerFilePath);
    await Phoenix.sendMessage(jid, { sticker: stickerBuffer }, { quoted: m });

    // Lösche die temporäre Datei
    await fs.unlinkSync(stickerFilePath);
};

  Phoenix.sendMedia = async (
    jid,
    path,
    fileName = "",
    caption = "",
    quoted = "",
    options = {}
  ) => {
    let types = await Phoenix.getFile(path, true);
    let { mime, ext, res, data, filename } = types;
    if ((res && res.status !== 200) || file.length <= 65536) {
      try {
        throw { json: JSON.parse(file.toString()) };
      } catch (e) {
        if (e.json) throw e.json;
      }
    }
    let type = "",
      mimetype = mime,
      pathFile = filename;
    if (options.asDocument) type = "document";
    if (options.asSticker || /webp/.test(mime)) {
      let { writeExif } = require('./lib/exif.js');
      let media = { mimetype: mime, data };
      pathFile = await writeExif(media, {
        packname: options.packname ? options.packname : global.packname,
        author: options.author ? options.author : global.author,
        categories: options.categories ? options.categories : [],
      });
      await fs.promises.unlink(filename);
      type = "sticker";
      mimetype = "image/webp";
    } else if (/image/.test(mime)) type = "image";
    else if (/video/.test(mime)) type = "video";
    else if (/audio/.test(mime)) type = "audio";
    else type = "document";
    await Phoenix.sendMessage(
      jid,
      { [type]: { url: pathFile }, caption, mimetype, fileName, ...options },
      { quoted, ...options }
    );
    return fs.promises.unlink(pathFile);
  };
  /**
   *
   * @param {*} message
   * @param {*} filename
   * @param {*} attachExtension
   * @returns
   */
  Phoenix.downloadAndSaveMediaMessage = async (
    message,
    filename,
    attachExtension = true
  ) => {
    let quoted = message.msg ? message.msg : message;
    let mime = (message.msg || message).mimetype || "";
    let messageType = message.mtype
      ? message.mtype.replace(/Message/gi, "")
      : mime.split("/")[0];
    const stream = await downloadContentFromMessage(quoted, messageType);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    let type = await FileType.fromBuffer(buffer);
    trueFileName = attachExtension ? filename + "." + type.ext : filename;
    // save to file
    await fs.writeFileSync(trueFileName, buffer);
    return trueFileName;
  };

  Phoenix.downloadMediaMessage = async (message) => {
    let mime = (message.msg || message).mimetype || "";
    let messageType = message.mtype
      ? message.mtype.replace(/Message/gi, "")
      : mime.split("/")[0];
    const stream = await downloadContentFromMessage(message, messageType);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }

    return buffer;
  };


  /**
   *
   * @param {*} path
   * @returns
   */
  Phoenix.getFile = async (PATH, save) => {
    let res;
    let data = Buffer.isBuffer(PATH)
      ? PATH
      : /^data:.*?\/.*?;base64,/i.test(PATH)
        ? Buffer.from(PATH.split`,`[1], "base64")
        : /^https?:\/\//.test(PATH)
          ? await (res = await getBuffer(PATH))
          : fs.existsSync(PATH)
            ? ((filename = PATH), fs.readFileSync(PATH))
            : typeof PATH === "string"
              ? PATH
              : Buffer.alloc(0);
    //if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
    let type = (await FileType.fromBuffer(data)) || {
      mime: "application/octet-stream",
      ext: ".bin",
    };
    filename = path.join(
      __filename,
      "../src/" + new Date() * 1 + "." + type.ext
    );
    if (data && save) fs.promises.writeFile(filename, data);
    return {
      res,
      filename,
      size: await getSizeMedia(data),
      ...type,
      data,
    };
  };

  

  Phoenix.sendFile = async (jid, PATH, fileName, quoted = {}, options = {}) => {
    let types = await Phoenix.getFile(PATH, true);
    let { filename, size, ext, mime, data } = types;
    let type = "",
      mimetype = mime,
      pathFile = filename;
    if (options.asDocument) type = "document";
    if (options.asSticker || /webp/.test(mime)) {
      let { writeExif } = require('./lib/sticker.js');
      let media = { mimetype: mime, data };
      pathFile = await writeExif(media, {
        packname: global.packname,
        author: global.packname,
        categories: options.categories ? options.categories : [],
      });
      await fs.promises.unlink(filename);
      type = "sticker";
      mimetype = "image/webp";
    } else if (/image/.test(mime)) type = "image";
    else if (/video/.test(mime)) type = "video";
    else if (/audio/.test(mime)) type = "audio";
    else type = "document";
    await Phoenix.sendMessage(
      jid,
      { [type]: { url: pathFile }, mimetype, fileName, ...options },
      { quoted, ...options }
    );
    return fs.promises.unlink(pathFile);
  };
  Phoenix.parseMention = async (text) => {
    return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(
      (v) => v[1] + "@s.whatsapp.net"
    );
  };
  return Phoenix
}

startPhoenix();


process.on('uncaughtException', function (err) {
  let e = String(err)
  if (e.includes("conflict")) return
  if (e.includes("Cannot derive from empty media key")) return
  if (e.includes("Socket connection timeout")) return
  if (e.includes("not-authorized")) return
  if (e.includes("already-exists")) return
  if (e.includes("rate-overlimit")) return
  if (e.includes("Connection Closed")) return
  if (e.includes("Timed Out")) return
  if (e.includes("Value not found")) return
  console.log('Caught exception: ', err)
  })
  


