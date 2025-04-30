process.on("uncaughtException", console.error);
require('./config.js');

const fs = require('fs');
const pm2 = require('pm2');
const util = require("util");
const { promisify } = require('util');
const setTimeoutPromise = promisify(setTimeout);
const chalk = require("chalk");
const path = require('path');
const axios = require('axios');
const { spawn, exec, execSync } = require("child_process");
const moment = require("moment-timezone");

const { smsg, formatp, tanggal, GIFBufferToVideoBuffer, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, format, parseMention, getRandom, fetchBuffer } = require('./lib/myfunc')
const _ = require("lodash");
const { createHash } = require('crypto');
const archiver = require('archiver');
const { LowSync, JSONFileSync } = require('./lib/lowdb')
const FileSync = require('./lib/lowdb/adapters/JSONFileSync')
const cara = "cara"

const yargs = require("yargs/yargs");
const _user = JSON.parse(fs.readFileSync('./database/bot/user.json'))
//const _register = JSON.parse(fs.readFileSync('./database/bot/registered.json'))
const ownertag = global.ownertag


let kaitime = moment.tz('Europe/Berlin').format('HH:mm:ss');
const time2 = moment().tz('Europe/Berlin').format('HH:mm:ss');
const kaidate = moment.tz('Europe/Berlin').format('DD/MM/YYYY');
const currentDate = new Date();
const options = { weekday: 'long' }; // Specify 'long' to get the full day name
const currentDay = new Intl.DateTimeFormat('de-EU', options).format(currentDate);

function updateCurrentTime() {
  kaitime = moment.tz('Europe/Berlin').format('HH:mm:ss');
}

setInterval(updateCurrentTime, 1000);


setInterval(() => {

}, 1000);


const speed = require('performance-now');

// const thiccysapi = require('textmaker-thiccy');
const ffmpeg = require('@ffmpeg/ffmpeg');
// const ffmpegPath = require('ffmpeg-static').path;
// ffmpeg.setFfmpegPath(ffmpegPath);
const Jimp = require('jimp');  // for full dp etc.

const fetch = require('node-fetch')
const { antispam } = require('./antispam.js')

const os = require('os');
// for os info

const {
  default: PhoenixConnect,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  generateForwardMessageContent,
  prepareWAMessageMedia,
  generateWAMessageFromContent,
  generateMessageID,
  downloadContentFromMessage,
  makeInMemoryStore,
  jidDecode,
  proto,
  MessageType
} = require("phoenix-baileys");


const { addPremiumUser, getPremiumExpired, getPremiumPosition,expiredPremiumCheck, checkPremiumUser,getAllPremiumUser, } = require('./function/premiun')





/********** UTILS **********/
const { register} = require('./function')

const cd = 4.32e+7
const limitCount = 25
const errorImg = 'https://i.ibb.co/jRCpLfn/user.png'
/********** END OF UTILS **********/

/********** DATABASES **********/
const _antilink = JSON.parse(fs.readFileSync('./database/group/antilink.json'))
const _antinsfw = JSON.parse(fs.readFileSync('./database/group/antinsfw.json'))
const database = JSON.parse(fs.readFileSync ('./database/group/groupchats.json'))
const _leveling = JSON.parse(fs.readFileSync('./database/group/leveling.json'))
const _welcome = JSON.parse(fs.readFileSync('./database/group/welcome.json'))
const _autosticker = JSON.parse(fs.readFileSync('./database/group/autosticker.json'))
const _badwords = JSON.parse(fs.readFileSync('./database/group/badwords.json'))
const _ban = JSON.parse(fs.readFileSync('./database/bot/banned.json'))
const _premium = JSON.parse(fs.readFileSync('./database/bot/premium.json'))
const _mute = JSON.parse(fs.readFileSync('./database/bot/mute.json'))
const _registered = JSON.parse(fs.readFileSync('./database/bot/registered.json'))
const _level = JSON.parse(fs.readFileSync('./database/user/level.json'))
let _limit = JSON.parse(fs.readFileSync('./database/user/limit.json'))
const _afk = JSON.parse(fs.readFileSync('./database/user/afk.json'))
const _reminder = JSON.parse(fs.readFileSync('./database/user/reminder.json'))
const _daily = JSON.parse(fs.readFileSync('./database/user/daily.json'))
const _backup = ('./database');
const _setting = JSON.parse(fs.readFileSync('./database/bot/setting.json'))
//const importFresh = require('import-fresh');



// Konstruiere den absoluten Pfad zur eng.js-Datei
//const engFilePath = path.join(__dirname, 'message', 'text', 'lang', 'eng.js');

// Lade die Datei mit import-fresh
//const eng = importFresh(engFilePath);



let { memberLimit, groupLimit } = _setting
/********** END OF DATABASES **********/

//"parse-ms": "^1.1.0",

const time0 = kaitime
//
let nowtime = '';

if (time0 < "05:00:00") {
  nowtime = '𝘎𝘜𝘛𝘌𝘕 𝘔𝘖𝘙𝘎𝘌𝘕';
} else if (time0 < "11:00:00") {
  nowtime = '𝘎𝘜𝘛𝘌𝘕 𝘔𝘖𝘙𝘎𝘌𝘕';
} else if (time0 < "15:00:00") {
  nowtime = '𝘎𝘜𝘛𝘌𝘕 𝘛𝘈𝘎';
} else if (time0 < "18:00:00") {
  nowtime = '𝘎𝘜𝘛𝘌𝘕 𝘈𝘉𝘌𝘕𝘋';
} else if (time0 < "19:00:00") {
  nowtime = '𝘎𝘜𝘛𝘌𝘕 𝘈𝘉𝘌𝘕𝘋';
} else {
  nowtime = '𝘎𝘜𝘛𝘌 𝘕𝘈𝘊𝘏𝘛';
}




//
const timestampe = speed();
const latensie = speed() - timestampe

var low;
try {
  low = require("lowdb");
} catch (e) {
  low = require("./lib/lowdb");
}

const { Low, JSONFile } = low;
const mongoDB = require("./lib/mongoDB");

global.opts = new Object(
  yargs(process.argv.slice(2)).exitProcess(false).parse()
);
global.db = new Low(
  /https?:\/\//.test(opts["db"] || "")
    ? new cloudDBAdapter(opts["db"])
    : /mongodb/.test(opts["db"])
      ? new mongoDB(opts["db"])
      : new JSONFile(`src/database.json`)
);
global.DATABASE = global.db; // Backwards Compatibility
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ)
    return new Promise((resolve) =>
      setInterval(function () {
        !global.db.READ
          ? (clearInterval(this),
            resolve(
              global.db.data == null ? global.loadDatabase() : global.db.data
            ))
          : null;
      }, 1 * 1000)
    );
  if (global.db.data !== null) return;
  global.db.READ = true;
  await global.db.read();
  global.db.READ = false;
  global.db.data = {
    users: {},
    chats: {},
    database: {},
    game: {},
    settings: {},
    others: {},
    sticker: {},
    ...(global.db.data || {}),
  };
  global.db.chain = _.chain(global.db.data);
};
loadDatabase();
global.db = JSON.parse(fs.readFileSync("./src/database.json"));
if (global.db)
  global.db = {
    sticker: {},
    database: {},
    game: {},
    others: {},
    users: {},
    ...(global.db || {}),
  };
///////////////

///////////////


//
let isSleeping = false; // Move the declaration here.
let banUser = JSON.parse(fs.readFileSync('./database/banUser.json'));
let banchat = JSON.parse(fs.readFileSync('./database/banChat.json'));

let ntnsfw = JSON.parse(fs.readFileSync('./database/nsfw.json')); //

global.db = JSON.parse(fs.readFileSync('./src/database.json'))
let _sewa = require("./lib/sewa");
const { default: mongoose } = require("mongoose");


const sewa = JSON.parse(fs.readFileSync('./database/sewa.json'))
const time = moment.tz('Europe/Berlin').format('DD/MM HH:mm:ss')
const ucap = moment(Date.now()).tz('Europe/Berlin').locale('id').format('a')
var buln = ['/01/', '/02/', '/03/', '/04/', '/05/', '/06/', '/07/', '/08/', '/09/', '/10/', '/11/', '/12/'];
var myHari = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
var tgel = new Date();
var hri = tgel.getDate();
var bulnh = tgel.getMonth();
var thisHari = tgel.getDay(),
  thisDaye = myHari[thisHari];
var yye = tgel.getYear();
var syear = (yye < 1000) ? yye + 1900 : yye;
const jangwak = (hri + '' + buln[bulnh] + '' + syear)
const janghar = (thisDaye)
var myHari = [
  "Sonntag",
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
];
var tgel = new Date();
var thisHari = tgel.getDay(),
  thisDaye = myHari[thisHari];
var yye = tgel.getYear();


const {
  addRegisteredUser,
  checkRegisteredUser,
  isUserNotRegistered,
  checkRegisteredUserFromSerial,
  getRegisteredNameFromSerial,
  getRegisteredTimeFromSerial,
  getRegisteredIdFromSerial,
  getRegisteredRandomId,
  getRegisteredUserId,
  getRegisteredPosition
} = require('./function/register');

const gTTS = require('gtts');
//
module.exports = Phoenix = async (Phoenix, m, chatUpdate, store) => {
  try {
    var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectreply.selectedRowId : (m.mtype == 'templateButtonreplyMessage') ? m.message.templateButtonreplyMessage.selectedId : m.mtype === 'InteractiveResponseMessage' ? JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson)?.id : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectreply.selectedRowId || m.message.InteractiveResponseMessage.NativeFlowResponseMessage || m.text) : ''
    
    var budy = (typeof m.text == 'string' ? m.text : '')
    const {
      type,
      quotedMsg,
      mentioned,
      now,
      fromMe
    } = m
    const prefix = global.prefa
    const id = m.sender
    const isCmd = body.startsWith(prefix)
    const notCmd = body.startsWith('')
    const command =  isCmd ? body.slice(1).trim().split(' ')[0].toLowerCase() : ''

    const args = body.trim().split(/ +/).slice(1)
    const pushname = m.pushName || "No Name"
    const botNumber = await Phoenix.decodeJid(Phoenix.user.id)

    //console.log(`MESSAGE DEBUG: ` + JSON.stringify(m, null, 4))
    if(!m.key.participant && m.isGroup) return //console.debug("MSG")

    const isCreator = [botNumber, ...global.Owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    global.iscreator = isCreator
    const isSup = [botNumber, ...global.sup].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    const itsMe = m.sender == botNumber ? true : false
    const text = args.join(" ")
    const from = m.chat
    const quoted = m.quoted ? m.quoted : m
    const mime = (quoted.msg || quoted).mimetype || ''
    const isMedia = /image|video|sticker|audio/.test(mime)
    const isImage = (type == 'imageMessage')
    const isVideo = (type == 'videoMessage')

    const isAudio = (type == 'audioMessage')
    const isText = (type == 'textMessage')
    const isSticker = (type == 'stickerMessage')
    const isQuotedText = type === 'extendexTextMessage' && content.includes('textMessage')
    const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
    const isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage')
    const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
    const isQuotedContact = type === 'extendedTextMessage' && content.includes('contactMessage')
    const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')
    const sticker = []
    const messagesD = body.slice(0).trim().split(/ +/).shift().toLowerCase()
    const groupMetadata = m.isGroup ? await Phoenix.groupMetadata(m.chat).catch(e => { }) : ''
    const groupName = m.isGroup ? groupMetadata?.subject : ''
    const participants = m.isGroup ? await groupMetadata.participants : ''
    const groupAdmins = m.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
    const isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
    const groupOwner = m.isGroup ? groupMetadata.owner : ''
    const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
    const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
    global.isadmins = isAdmins
    const isBan = banUser.includes(m.sender)
    const welcm = m.isGroup ? wlcm.includes(from) : false
    const isBanChat = m.isGroup ? banchat.includes(from) : false
    const isRakyat = isCreator || global.rkyt.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender) || false
    const AntiLink = m.isGroup ? ntilink.includes(from) : true
    const AntiLinkYoutubeVid = m.isGroup ? ntilinkytvid.includes(from) : false
    const AntiLinkYoutubeChannel = m.isGroup ? ntilinkytch.includes(from) : false
    const AntiLinkInstagram = m.isGroup ? ntilinkig.includes(from) : false
    const AntiLinkFacebook = m.isGroup ? ntilinkfb.includes(from) : false
    const AntiLinkTiktok = m.isGroup ? ntilinktt.includes(from) : false
    const AntiLinkTelegram = m.isGroup ? ntilinktg.includes(from) : false
    const AntiLinkTwitter = m.isGroup ? ntilinktwt.includes(from) : false
    const AntiLinkAll = m.isGroup ? ntilinkall.includes(from) : true
    const antiWame = m.isGroup ? ntwame.includes(from) : false
    const antiVirtex = m.isGroup ? ntvirtex.includes(from) : false
    const AntiNsfw = m.isGroup ? ntnsfw.includes(from) : false
    let premium = JSON.parse(fs.readFileSync('./database/premium.json'))
    const isPremium = isCreator || checkPremiumUser(m.sender, premium)
    expiredPremiumCheck(Phoenix, m, premium)
    async function loading() {
      var baronlod = [
        "《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
        "《 ████▒▒▒▒▒▒▒▒》30%",
        "《 ███████▒▒▒▒▒》50%",
        "《 ██████████▒▒》80%",
        "《 ████████████》100%",
        "𝙻𝙰𝙳𝙴𝚅𝙾𝚁𝙶𝙰𝙽𝙶 𝙴𝚁𝙵𝙾𝙻𝙶𝚁𝙴𝙸𝙲𝙷!"
      ]
      let { key } = await Phoenix.sendMessage(from, { text: 'ʟᴏᴀᴅɪɴɢ...' })

      for (let i = 0; i < baronlod.length; i++) {
        await Phoenix.sendMessage(from, { text: baronlod[i], edit: key });
      }
    }

    const changelog = `
🆕🤖 *UPDATES des Bots PhoenixBots*
Datum des Updates: 11.07.2024 12:00 Uhr

🔹 Verbesserung von AntiSpam (${prefix}antispam)
🔹 Einführung von einer DSGVO (${prefix}dsgvo)
🔹 Einführung vom TNC-System (${prefix}tnc)

⚠️ Die obigen Befehle befinden sich derzeit noch in der *BETA Phase!* Das bedeutet, dass die Befehle möglicherweise noch nicht zu 100% funktionieren.

`

    const dsgvoPolicy = `

    📊🔒 -----[ DATEN ]----- 🔒📊

    ⚠️ Wir speichern Daten.
    Das Speichern von Daten ist notwendig, um viele Funktionen des Bots anzubieten.
    
    Folgende Daten werden gespeichert (Datenbank):
    
    1️⃣ >> AFK (Bei Benutzung, nach Ablauf automatische Löschung)
    📞 Rufnummer; Text; Zeitpunkt der Nachricht
    
    2️⃣ >> Bannstatus (Bei Bann, bleiben erhalten, um Missbrauch zu verhindern)
    📞 Rufnummer; Banngrund; Ersteller; Zeitpunkt der Erstellung
    
    3️⃣ >> Erinnerung (Bei Benutzung, nach Ablauf automatische Löschung)
    📞 Rufnummer; Text; Ablaufdatum
    
    4️⃣ >> GruppenInfo (Entsprechende Gruppe wird beim Verlassen (${prefix}leave) automatisch gelöscht)
    🆔 GruppenID; Gruppenspezifische Funktionen (Ein/Aus)
    
    5️⃣ >> Premium (Nur beim Besitz von Premium, nach Ablauf automatische Löschung)
    📞 Rufnummer; Ablaufdatum
    
    6️⃣ >> Level (Wird automatisch erstellt beim ersten Befehl)
    📞 Rufnummer; Level; XP
    
    7️⃣ >> LogBefehle (Werden für Fehlerdiagnosen gespeichert und nach manueller Diagnose gelöscht)
    🆔 GruppenID; Rufnummer; Befehl; Zeitpunkt
    📵 Nachrichten außerhalb von Befehlen werden nicht gespeichert. Chatverläufe werden 1-2x pro Woche beim Bot (WhatsApp) gelöscht.
    
    8️⃣ >> Registrierung
    📞 Rufnummer; Name; Alter; Zeitpunkt der Registrierung; Serial
    
    9️⃣ >> Support (Bei Benutzung steigt der Wert um +1)
    🆔 SupportID
    
    🔟 >> Vorstellung
    Solltest du dich bei einem Admin vorgestellt haben (${prefix}vt), werden folgende Daten erhoben:
    📝 Name; Alter; Ort; 🖼️ Bild (wenn angegeben)
    Zum Löschen dieser Informationen, verwende ${prefix}vt delete
    
    = = = = = = = = = = = = = = = =
    
    ❓💡 *Ihr möchtet eure Daten löschen?*
    ${prefix}unregister
     - Löscht Informationen im Punkt #Registrierung
       (Ermöglicht eine neue Registrierung mit anderen Angaben zum Namen & Alter)
    ${prefix}datadelete
     - Löscht alle Informationen außer #Bannstatus, #LogBefehle und temporäre Daten wie z. B. #AFK
    
    Gebannte Nutzer, deren Daten gelöscht werden sollen, melden sich bitte mit ihrer Rufnummer bei:
    ${prefix}owner
    Hierbei wird die Löschung manuell durchgeführt, wie beim Befehl ${prefix}datadelete.
    
    ⚙️ Eine technische Lösung zur automatischen Löschung von Daten ist in Planung.
    
    = = = = = = = = = = = = = = = =
    
    ❓📜 Ihr möchtet Einsicht in eure gespeicherten Daten?
    Meldet euch bei uns mit ${prefix}support und nennt uns die gewünschten Daten.
    
    ⚙️ Eine automatische Funktion über einen Befehl zur Auskunft der Daten ist in Planung.
    
    Stand: 07/2024
    
    `

    const privacyPolicy = `
🔒 *❖ Phoenix Bot Datenschutzrichtlinie, Nutzungsbedingungen ❖* 🔒

*◉ [ Datenschutzerklärung ]*
1️⃣ Phoenix-Bot zeichnet keine Benutzer-Chat-Verlaufsdaten auf.
2️⃣ Phoenix-Bots geben keine Benutzer-IDs weiter.
3️⃣ Phoenix-Bot speichert keine vom Benutzer übermittelten Medien.
4️⃣ Phoenix-Bot wird Benutzerdaten nicht missbrauchen.
5️⃣ Der Phoenix-Bot-Eigentümer hat das Recht, die Chat-Verlaufsdaten des Benutzers einzusehen.
6️⃣ Der Phoenix-Bot-Eigentümer hat die Berechtigung, den Status des Benutzers anzuzeigen.
7️⃣ Phoenix-Bot-Eigentümer können den Chat-Verlauf und die von Benutzern gesendeten Medien anzeigen.

*◉ [ Phoenix-Bot Regeln ]*
1️⃣ Benutzern ist es untersagt, Bot-Nummern anzurufen oder per Videoanruf anzurufen.
2️⃣ Benutzern ist es untersagt, verschiedene Bugs, Virtexe usw. an die Bot-Nummer zu senden.
3️⃣ Von den Benutzern wird erwartet, dass sie bei der Verwendung von Bots nicht spammen.
4️⃣ Benutzern ist es untersagt, Bot-Nummern illegal hinzuzufügen. Wenden Sie sich zum Hinzufügen bitte an den Eigentümer.
5️⃣ Von den Benutzern wird erwartet, dass sie die Bot-Funktionen nicht missbrauchen.

*◉ [ Phoenix Bot-Nutzungsbedingungen ]*
1️⃣ Der Bot verlässt die Gruppe bei Nichterfüllung der Vorraussetzungen von 15 Teilnehmern.
2️⃣ Phoenix-Bot kann Benutzer einseitig sperren, wenn es sich um einen falschen Benutzer handelt.
3️⃣ Der Phoenix-Bot führt die Bot-Funktion aus.
4️⃣ Phoenix-Bot wird Strafen verhängen: Benutzer sperren oder sperren, die gegen die Regeln verstoßen.
5️⃣ Phoenix-Bot ist verantwortlich für schwerwiegende Fehler in der Programmierung und Besitzer.

-Phoenix-Bot 🌌
-Phillip V. 👤
Verordnung: 27. November 2022 📅
`

    autoreadsw = true
    const content = JSON.stringify(m.message)
    const q = args.join(' ')

    const isQuotedVideo = m.mtype === 'extendedTextMessage' && content.includes('videoMessage')
    const isQuotedAudio = m.mtype === 'extendedTextMessage' && content.includes('audioMessage')
    /********** VALIDATOR **********/





 
  


    // Funktion zum Erstellen einer ZIP-Datei des "database"-Ordners
    const createDatabaseZip = (zipPath) => {
      return new Promise((resolve, reject) => {
        const output = fs.createWriteStream(zipPath);
        const archive = archiver('zip', { zlib: { level: 9 } });

        output.on('close', () => resolve());
        archive.on('error', (err) => reject(err));

        archive.pipe(output);
        archive.directory('./database/', 'database');
        archive.finalize();
      });
    };
    const isLeveling = false
    const isRegistered = register.checkRegisteredUser(m.sender, _registered)
    const _dir = JSON.parse(fs.readFileSync('./database/bot/registered.json'))


    /********** END OF VALIDATOR **********/

   

    /*function restartProcess() {
      console.log('Der Prozess wird neu gestartet...');
      process.exit();
    }

    function scheduleRestart() {


      setInterval(() => {
       
        restartProcess();
      }, 3600000); // 1 Stunde
    }

    scheduleRestart();/*

    /********** END OF VALIDATOR **********/
    ///////////////////////////
   
      
    //console.log('Nachricht', m);
    //console.log('Prefix:', isCmd);

    ////////////////


    const filePathh = './database/bot/registered.json';
    const updatedDataa = require(filePathh);
    const numberOfUserss = Object.keys(updatedDataa).length;
    const loll = numberOfUserss
    // Funktion zum Laden der Datei und Ausführen von Aktionen nach einem Update
    const updateFile = () => {
      console.log(chalk.redBright(`Update ${filePathh}`));

      // Lade die aktualisierte Datei
      const updatedData = require(filePathh);


      const numberOfUsers = Object.keys(updatedData).length;


      console.log(`Anzahl der Registrierten User: ${numberOfUsers}`);
    };


    // Funktion zum Starten des Dateiüberwachung
    const startFileWatcher = () => {
      // Überwache die Datei auf Änderungen
      fs.watch(filePathh, (eventType, filename) => {
        if (eventType === 'change') {
          // Wenn sich die Datei ändert, führe die Update-Funktion aus
          updateFile();
        }
      });
    };

    // Starte den Updater
    startFileWatcher();
    //============================//
    const dbPath = './database/user/level.json';

    // Sicherstellen, dass die globale Datenbank initialisiert wird
    global.db = global.db || {};
    global.db.data = global.db.data || { users: {}, chats: {}, stats: {}, msgs: {}, sticker: {}, settings: {} };

    // Daten aus Datei laden oder initialisieren
    function loadDatabase() {
      try {
        const data = fs.readFileSync(dbPath, 'utf-8');
        global.db.data.users = JSON.parse(data);
      } catch (error) {
        console.error('Fehler beim Laden der Datenbank:', error);
        global.db.data.users = {};
      }
    }

    // Daten in Datei speichern
    function saveDatabase() {
      try {
        fs.writeFileSync(dbPath, JSON.stringify(global.db.data.users, null, 4));
        // console.log('Daten erfolgreich in die Datei geschrieben.');
      } catch (error) {
        console.error('Fehler beim speichern der Datei:', error);
      }
    }
    // Benutzer abrufen oder erstellen und aktualisieren
    function getUserData(sender) {
      if (!global.db.data.users[sender]) {
        global.db.data.users[sender] = { exp: 0, level: 1, role: global.rolee(1).name };
      }
      return global.db.data.users[sender];
    }

    // Datenbank laden beim Start
    loadDatabase();

    function updateUser(m, isCmd) {
      try {
        let userr = global.db.data.users[m.sender];
        if (!userr) {
          userr = global.db.data.users[m.sender] = { exp: 0, level: 1, role: global.rolee(1).name };
        }

        let expPoints = Math.floor(Math.random() * 25) + 10; // 25-50 für Nachrichten
        if (isCmd) expPoints += Math.floor(Math.random() * 60) + 30; // 50-100 für Befehle
        userr.exp += expPoints;

        // Level up Logik
        while (userr.exp >= 1000) { // Level up bei jeder 1000 XP
          userr.level++;
          userr.exp -= 1000;
        }

        // Rolle aktualisieren
        userr.role = global.rolee(userr.level).name;

        // Datenbank speichern
        saveDatabase();

        //console.log(userr);
      } catch (error) {
        console.error('Fehler beim Aktualisieren des Benutzers:', error);
      }
    }

    // Beispielaufruf
    updateUser(m, isCmd);


    function xpRange(level, multiplier = global.multiplier || 1) {
      if (level < 0) throw new TypeError('Level cannot be negative value');
      level = Math.floor(level);
      let min = level === 0 ? 0 : Math.round(Math.pow(level, global.xpGrowth) * multiplier) + 1;
      let max = Math.round(Math.pow(++level, global.xpGrowth) * multiplier);
      return { min, max, xp: max - min };
    }

    function sort(property, ascending = true) {
      return (a, b) => ascending ? a[property] - b[property] : b[property] - a[property];
    }

    function toNumber(property, _default = 0) {
      return (a) => a[property] === undefined ? _default : a[property];
    }

    function enumGetKey(a) {
      return a.jid;
    }

    function getNextRank(level) {
      let arr = Object.keys(global.multiplier);
      let position = false;
      for (let key of arr) {
        if (level <= key) {
          position = key;
          break;
        }
      }
      return position !== false ? arr[position] : null;
    }



    //============================//
    if (m.mtype === "interactiveResponseMessage") {
      console.log("interactiveResponseMessage Detected!")
      let msg = m.message[m.mtype] || m.msg
      if (msg.nativeFlowResponseMessage && !m.isBot) {
        let { id } = JSON.parse(msg.nativeFlowResponseMessage.paramsJson) || {}
        if (id) {
          let emit_msg = {
            key: { ...m.key },
            message: { extendedTextMessage: { text: id } },
            pushName: m.pushName,
            messageTimestamp: m.messageTimestamp || 754785898978
          }
          return Phoenix.ev.emit("messages.upsert", { messages: [emit_msg], type: "notify" })
        }
      }
    }
    //=======================================
    const fsp = fs.promises;
    const downloadMp44 = async (Link) => {
      try {
          // Video direkt von der API herunterladen
          const videoResponse = await fetch(`https://baroapi--api--hf9nfmvp9f7y.code.run/api/v2/ytmp4?url=${encodeURIComponent(Link)}`);
  
          // Prüfen, ob die Antwort erfolgreich ist
          if (!videoResponse.ok) {
              throw new Error(`Fehler beim Abrufen des Videos: ${videoResponse.statusText}`);
          }
  
          // Das Video als Buffer lesen
          const videoBuffer = await videoResponse.buffer();
  
          // Video senden
          loading();
          await sleep(2000)
          await Phoenix.sendMessage(from, { video: videoBuffer, gifPlayback: false }, { quoted: m });
        
      } catch (err) {
          // Fehlerbehandlung
          m.reply(`Fehler: ${err.message}`);
      }
  };
  
  const tiktokmp4 = async (Link) => {
    try {
        // Video direkt von der API herunterladen
        const videoResponse = await fetch(`https://baroapi--api--hf9nfmvp9f7y.code.run/api/tiktokv2?url=${encodeURIComponent(Link)}`);
  
        // Prüfen, ob die Antwort erfolgreich ist
        if (!videoResponse.ok) {
            throw new Error(`Fehler beim Abrufen des Videos: ${videoResponse.statusText}`);
        }
  
        // Das Video als Buffer lesen
        const videoBuffer = await videoResponse.buffer();
  
        // Video senden
        loading();
        await sleep(2000)
        await Phoenix.sendMessage(from, { video: videoBuffer, gifPlayback: false }, { quoted: m });
      
    } catch (err) {
        // Fehlerbehandlung
        m.reply(`Fehler: ${err.message}`);
    }
  };
  
  const downloadMp33 = async (Link) => {
      try {
          //  direkt von der API herunterladen
          const audioResponse = await fetch(`https://baroapi--api--hf9nfmvp9f7y.code.run/api/v2/ytmp3?url=${encodeURIComponent(Link)}`);
          if (!audioResponse.ok) {
              throw new Error(`Fehler beim Abrufen des Videos: ${audioResponse.statusText}`);
          }
  
          const audioBuffer= await audioResponse.buffer();
          loading();
          await sleep(2000)
   await Phoenix.sendMessage(from, { audio: audioBuffer, mimetype: 'audio/mp4' }, { quoted: m })
      } catch (err) {
     
          m.reply(`Fehler: ${err.message}`);
      }
  };


    // Pfade zu den JSON-Dateien
    const USER_CHATS_FILE = path.join(__dirname, 'database/user/userchats.json');
    const GROUP_CHATS_FILE = path.join(__dirname, 'database/group/groupchats.json');

    // Funktion zur Initialisierung der JSON-Dateien, falls sie nicht existieren
    const initializeFiles = async () => {
      try {
        // Sicherstellen, dass die Benutzerchats-Datei existiert
        await fsp.mkdir(path.dirname(USER_CHATS_FILE), { recursive: true });
        try {
          await fsp.access(USER_CHATS_FILE);
        } catch {
          await fsp.writeFile(USER_CHATS_FILE, JSON.stringify({ users: [] }, null, 4));
        }

        // Sicherstellen, dass die Gruppenchats-Datei existiert
        await fsp.mkdir(path.dirname(GROUP_CHATS_FILE), { recursive: true });
        try {
          await fsp.access(GROUP_CHATS_FILE);
        } catch {
          await fsp.writeFile(GROUP_CHATS_FILE, JSON.stringify({ groups: [] }, null, 4));
        }
      } catch (error) {
        console.error("Fehler bei der Initialisierung der Dateien:", error);
      }
    };

    // Funktion zum Laden der Daten aus einer JSON-Datei
    const loadData = async (filePath) => {
      try {
        const data = await fsp.readFile(filePath, 'utf8');
        return JSON.parse(data);
      } catch (error) {
        console.error(`Fehler beim Laden der Daten aus ${filePath}:`, error);
        return null;
      }
    };

    // Funktion zum Speichern der Daten in einer JSON-Datei
    const saveData = async (filePath, data) => {
      try {
        await fsp.writeFile(filePath, JSON.stringify(data, null, 4));
      } catch (error) {
        console.error(`Fehler beim Speichern der Daten in ${filePath}:`, error);
      }
    };

    // Funktion zum Hinzufügen einer Benutzer-ID
    const addUserId = async (userId) => {
      let userChats = await loadData(USER_CHATS_FILE);
      if (!userChats || !Array.isArray(userChats.users)) {
        console.error("Fehler: Benutzerchats-Daten sind ungültig.");
        userChats = { users: [] };
      }

      if (!userChats.users.includes(userId)) {
        userChats.users.push(userId);
        await saveData(USER_CHATS_FILE, userChats);
      }
    };

    // Funktion zum Hinzufügen einer Gruppen-ID
    const addGroupId = async (groupId) => {
      let groupChats = await loadData(GROUP_CHATS_FILE);
      if (!groupChats || !Array.isArray(groupChats.groups)) {
        console.error("Fehler: Gruppenchat-Daten sind ungültig.");
        groupChats = { groups: [] };
      }

      // Überprüfen, ob die Gruppen-ID mit "@g.us" endet
      if (groupId.endsWith('@g.us') && !groupChats.groups.includes(groupId)) {
        groupChats.groups.push(groupId);
        await saveData(GROUP_CHATS_FILE, groupChats);
      }
    };

    // Funktion zum Abrufen der Anzahl der Benutzer- und Gruppenchats
    const getChatCounts = async () => {
      const userChats = await loadData(USER_CHATS_FILE);
      const groupChats = await loadData(GROUP_CHATS_FILE);

      return {
        userCount: userChats && Array.isArray(userChats.users) ? userChats.users.length : 0,
        groupCount: groupChats && Array.isArray(groupChats.groups) ? groupChats.groups.length : 0
      };
    };

    // Initialisierung der JSON-Dateien
    initializeFiles()
      .then(async () => {
        // Beispielhafte Verwendung der Funktionen
        await addUserId(m.sender);
        await addGroupId(m.chat);
        const counts = await getChatCounts();
        // console.log('Anzahl der Benutzerchats:', counts.userCount);
        // console.log('Anzahl der Gruppenchats:', counts.groupCount);
      })
      .catch(console.error);
    const counts = await getChatCounts();






    //=======================================

    // Datei laden oder leeren Array initialisieren, wenn Datei nicht existiert
    const antilinkPath = './database/group/antilink.json';

    let antilinkData;
    try {
      antilinkData = JSON.parse(fs.readFileSync(antilinkPath));
    } catch (error) {
      antilinkData = [];
    }

    function saveAntilinkData() {
      fs.writeFileSync(antilinkPath, JSON.stringify(antilinkData, null, 2));
    }

    const antilinkPathall = './database/group/antilinkall.json';

    let antilinkDataall;
    try {
      antilinkDataall = JSON.parse(fs.readFileSync(antilinkPathall));
    } catch (error) {
      antilinkDataall = [];
    }

    function saveAntilinkDataall() {
      fs.writeFileSync(antilinkPathall, JSON.stringify(antilinkDataall, null, 2));
    }

    let privateChatData = { groups: [] };

    // Funktion zum Laden der JSON-Datei
    function loadPrivateChatData() {
      try {
        // Prüfen, ob die Datei existiert, falls nicht, eine neue Datei mit Standardwerten erstellen
        if (!fs.existsSync('./database/group/privatechat.json')) {
          fs.writeFileSync('./database/group/privatechat.json', JSON.stringify({ groups: [] }, null, 2));
        }

        // Datei lesen
        let data = fs.readFileSync('./database/group/privatechat.json', 'utf8');

        // JSON parsen und Struktur überprüfen
        privateChatData = JSON.parse(data);
        if (!Array.isArray(privateChatData.groups)) {
          privateChatData.groups = [];
        }
      } catch (error) {
        console.error('Fehler beim Laden der privaten Chat-Daten:', error);
        privateChatData = { groups: [] };
      }
    }

    // Daten beim Start des Bots laden
    loadPrivateChatData();


    const pathh = './database/group/welcome.json';


    function loadGroupEvents() {
      try {
        return JSON.parse(fs.readFileSync(pathh, 'utf8'));
      } catch (err) {
        return {}; // Return an empty object if file doesn't exist or can't be read
      }
    }

    function saveGroupEvents(groupEvents) {
      fs.writeFileSync(pathh, JSON.stringify(groupEvents, null, 2));
    }

    // Load group events when the bot starts
    global.groupEvents = loadGroupEvents();

   

    ////////////////////////////
    autoreadsw = true;
    _sewa.expiredCheck(Phoenix, sewa);

    const reply = (teks) => {
      Phoenix.sendMessage(m.chat, { text: teks })
    }


    /* const reply = (teks) => {
      Phoenix.sendMessage(m.chat, { text: teks }, { quoted: m }); 
    }; */


    const sender = m.isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid
    const senderNumber = sender.split('@')[0]

    function randomNomor(angka) {
      return Math.floor(Math.random() * angka) + 1;
    }
    // Anti-Spam
    const cooldown = 30000;
    if (global.antispam) {
      // console.log('1')
      // console.log('m.isGroup' , m.isGroup)
      // console.log('m.chat  ', m.chat)
      // console.log('antispam.isFiltered(m.sender)  ', antispam.isFiltered(m.sender))
      if (m.isGroup && m.chat && antispam.isFiltered(m.sender)) {
        console.log('2')
        console.log(`[SPAM]`, color(moment(m.messageTimestamp * 100).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(m.pushname));
        console.log('3')
        const ignoredUntil = Date.now() + cooldown;
        console.log('4')
        db.data.users[from].ignoreUntil = ignoredUntil;

        await Phoenix.sendMessage(m.chat, `Du wurdest für ${cooldown / 1000} Sekunden gesperrt, weil du spamst.`);

        return;
      }
    }




    // if (m.message) {
      

      const messageType = budy || m.mtype;
      const fromm = m.isGroup ? 'Gruppe: ' + groupName : 'Private Chat';
      const chatName = m.isGroup ? pushname : pushname;
      const inChat = m.chat;

      // Erstelle eine strukturierte und farbige Konsolenausgabe
       if (isCmd) {
        console.log(
          chalk.white(chalk.bgBlack("[ COMMAND ]")),
          "\n" +
          chalk.magenta("=> User:") + " " +
          chalk.blue(chatName) + " (" + chalk.yellow(m.sender) + ")" + "\n" +
          chalk.magenta("=> Befehl:") + " " +
          chalk.cyan(messageType) + "\n" +
          chalk.magenta("=> In:") + " " +
          chalk.red(fromm) + " (" + chalk.green(inChat) + ")"
        );
       }
    // }

// logss

  



    //----------------------------------------------------------------------------------------------------------//

    /*
    if (global.autoReadAll = true) {
      
      
        
    
          const lastMsgInChat = await getLastMessageInChat(m.chat);

          await Phoenix.chatModify(
            { markRead: true, lastMessages: [lastMsgInChat] }, m.chat
          );

      
      
    } */

    if (global.autoreadgc) {
      if (command) {
        await Phoenix.sendPresenceUpdate('composing', m.chat);

        // Create an array of message keys to mark as read
        const keysToMarkAsRead = [
          {
            remoteJid: m.chat,
            id: m.key.id,
            participant: m.sender,
          },
          // You can add more message keys to mark multiple messages as read
        ];

        // Use the sock object to read the specified messages
        await Phoenix.readMessages(keysToMarkAsRead);
      }
    }


    if (global.autoRecord) {
      if (m.chat) {
        Phoenix.sendPresenceUpdate("recording", m.chat);
      }
    }

    if (global.autoTyping) {
      if (m.chat) {
        Phoenix.sendPresenceUpdate("composing", m.chat);
      }
    }

    if (global.available) {
      if (m.chat) {
        Phoenix.sendPresenceUpdate("available", m.chat);
      }
    }





    //don't edit this part.
    const formatTime = (seconds) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    function updateStatus() {
      const uptimeInSeconds = Math.floor(process.uptime());
      const uptimeFormatted = formatTime(uptimeInSeconds);

      // Set the status using Phoenix.setStatus or your equivalent method

      // Update the status randomly within 5 minutes (300000 milliseconds)
      const randomTime = Math.floor(Math.random() * 300000) + 1000; // don't edit.
      setTimeout(updateStatus, randomTime);
    }

    // Initial call to start the random status updates
    updateStatus();

    // Annahme: isBotAdmins, isAdmins, m.key.fromMe, isCreator sind definierte Variablen




    if (antilinkDataall.includes(from)) {
   



      if (budy.match('http') && budy.match('https')) { // Überprüfung, ob die Nachricht einen Link enthält
        if (!isBotAdmins) return;

        if (isAdmins) return;
        if (m.key.fromMe) return;
        if (isCreator) return;
        const kice = m.sender;
        await Phoenix.sendMessage(from, {
          delete: {
            remoteJid: m.chat,
            fromMe: false,
            id: m.key.id,
            participant: m.key.participant
          },
        });

        await Phoenix.sendMessage(from, {
          text: `\`\`\`「  Antilink System  」\`\`\`\n\n*⚠️ Link Erkannt!*\n\n*🚫@${kice.split("@")[0]} Mach keine Werbung du Schwuchtel🏳‍🌈⃠!*\n`,
          contextInfo: {
            mentionedJid: [kice]
          }
        });
        await Phoenix.groupParticipantsUpdate(m.chat, [kice], 'remove')
      }
    }

    if (antilinkData.includes(from)) { // Prüfen, ob Anti-Link für die aktuelle Gruppe aktiviert ist
    
      if (budy.match(`chat.whatsapp.com`)) { // Überprüfung, ob die Nachricht einen Link enthält
        if (!isBotAdmins) return;

        bvl = ` `
        if (isAdmins) return;
        if (m.key.fromMe) return;
        if (isCreator) return;
        const kice = m.sender;
        await Phoenix.sendMessage(from, {
          delete: {
            remoteJid: m.chat,
            fromMe: false,
            id: m.key.id,
            participant: m.key.participant
          },
        });

        await Phoenix.sendMessage(from, {
          text: `\`\`\`「  Antilink System  」\`\`\`\n\n*⚠️ Link Erkannt!*\n\n*🚫@${kice.split("@")[0]} Mach keine Werbung du Schwuchtel🏳‍🌈⃠!*\n`,
          contextInfo: {
            mentionedJid: [kice]
          }
        });
        await Phoenix.groupParticipantsUpdate(m.chat, [kice], 'remove')
      }
    }






    //
    this.game = this.game ? this.game : {}
    let room = Object.values(this.game).find(room => room.id && room.game && room.state && room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender) && room.state == 'PLAYING')
    if (room) {
      let ok
      let isWin = !1
      let isTie = !1
      let isaufgeben = !1
      //m.reply(`[DEBUG]\n${parseInt(m.text)}`)
      if (!/^([1-9]|(me)?give up|auf?geben|off|skip)$/i.test(m.text)) return
      isaufgeben = !/^[1-9]$/.test(m.text)
      if (m.sender !== room.game.currentTurn) {
        if (!isaufgeben) return !0
      }
      if (!isaufgeben && 1 > (ok = room.game.turn(m.sender === room.game.playerO, parseInt(m.text) - 1))) {
        reply({
          '-3': 'Spiel ist vorbei.',
          '-2': 'Ungültig',
          '-1': 'Ungültige Position',
          0: 'Ungültige Position',
        }[ok])
        return !0
      }
      if (m.sender === room.game.winner) isWin = true
      else if (room.game.board === 511) isTie = true
      let arr = room.game.render().map(v => {
        return {
          X: '❌',
          O: '⭕',
          1: '1️⃣',
          2: '2️⃣',
          3: '3️⃣',
          4: '4️⃣',
          5: '5️⃣',
          6: '6️⃣',
          7: '7️⃣',
          8: '8️⃣',
          9: '9️⃣',
        }[v]
      })
      if (isaufgeben) {
        room.game._currentTurn = m.sender === room.game.playerX
        isWin = true
      }
      let winner = isaufgeben ? room.game.currentTurn : room.game.winner
      let str = `Spiel ID: ${room.id}
${arr.slice(0, 3).join('')}
${arr.slice(3, 6).join('')}
${arr.slice(6).join('')}
${isWin ? `@${winner.split('@')[0]} hat Gewonnen!` : isTie ? `Unentschieden` : `Turn ${['❌', '⭕'][1 * room.game._currentTurn]} (@${room.game.currentTurn.split('@')[0]})`}
❌: @${room.game.playerX.split('@')[0]}
⭕: @${room.game.playerO.split('@')[0]}
Verwende *${prefix}aufgeben* um aufzugeben.`
      if ((room.game._currentTurn ^ isaufgeben ? room.x : room.o) !== m.chat)
        room[room.game._currentTurn ^ isaufgeben ? 'x' : 'o'] = m.chat
      if (room.x !== room.o) await Phoenix.sendText(room.x, str, m, { mentions: parseMention(str) })
      await Phoenix.sendText(room.o, str, m, { mentions: parseMention(str) })
      if (isTie || isWin) {
        delete this.game[room.id]
      }
    }


    //-----------------------------------------------------------------------------------------------------------------------------------//
   // Handler für die Züge
   if (m.text && this.game) {
    let room = Object.values(this.game).find(room => 
        room.id && room.game && room.state &&
        room.id.startsWith('connectfour') &&
        [room.game.playerRed, room.game.playerYellow].includes(m.sender) &&
        room.state === 'PLAYING'
    );

    if (room) {
        const input = m.text.trim();
        if (!/^[1-7]$/.test(input)) {
            return await reply("Bitte gib eine Zahl zwischen 1 und 7 ein, um eine Spalte zu wählen.");
        }

        if (m.sender !== room.game.currentTurn) {
            return await reply("Es ist nicht dein Zug.");
        }

        const column = parseInt(input) - 1; // Konvertiere die Eingabe in eine Zahl
        let dropResult = room.game.dropDisc(m.sender === room.game.playerYellow, column);

        if (dropResult < 0) {
            return await reply("Diese Spalte ist voll. Wähle eine andere.");
        }

        const isWin = room.game.checkWin();
        const isTie = room.game.isBoardFull();

        const arr = room.game.renderBoard().map(row => row.map(cell => ({
            'R': '🔴',
            'Y': '🟡',
            ' ': '⚪'
        }[cell])).join('')).join('\n');

        const resultMessage = isWin ? `@${m.sender.split('@')[0]} hat gewonnen!` : 
                          isTie ? 'Unentschieden' : 
                          `Nächster Zug: ${room.game.currentTurn === room.game.playerRed ? '🔴' : '🟡'} (@${room.game.currentTurn.split('@')[0]})`;

        const str = `Spiel ID: ${room.id}\n\n${arr}\n\n${resultMessage}\n` +
            `🔴: @${room.game.playerRed.split('@')[0]}\n` +
            `🟡: @${room.game.playerYellow.split('@')[0]}`;

        // Nachricht an beide Spieler senden
        await Phoenix.sendText(room.x, str, m, { mentions: parseMention(str) });

        if (isWin || isTie) {
            delete this.game[room.id]; // Löscht das Spiel, wenn es beendet ist
        }
    }
}



    //
    const pickRandom = (arr) => {
      return arr[Math.floor(Math.random() * arr.length)]
    }



   



    //-----------------------------------------------------------------------------------------------------------------------------------//
    // Beispiel: Hypothetische API für den Zugriff auf den Chat
    // Commands befehle
    async function Profile() {
      if (!isRegistered) return await reply(mess.nonreg, id);
      if (isBan) return reply(mess.banned);
      if (isBanChat) return reply(mess.bangc);


      try {
        ppimg = await Phoenix.profilePictureUrl(m.sender, 'image')
      } catch {
        ppimg = 'https://i.ibb.co/jRCpLfn/user.png'
      }
      //Benutzerinformationen abrufen und aktualisieren

      const user = m.sender

      const cara = "cara"

      const balance = await eco.balance(user, cara); 

      let userrr = getUserData(m.sender);

      const pf = `
│╭────────────···▸▸
┴│   
  │⊳  👤 *User*: @${sender.split("@")[0]} 
  │⊳  📅 *Registriert*: ✅
  │⊳  💰 *Geldbörse*: ${balance.wallet}💎
  │⊳  📈 *Level*: ${userrr.level}
  │⊳  ⚡ *XP*: ${userrr.exp}
  │⊳  🎖️ *Rolle*: ${userrr.role}
┬│  
│╰───────────···▸▸
└──────────────···▸▸▸

`
Phoenix.sendMessage(from, { image: { url: ppimg }, caption: pf, mentions: [m.sender] },)
if (userrr.level == undefined && userrr.exp == undefined) {
  reply(mess.nonreg)
}
};
      async function Ownerr() {
        if (!isRegistered) return await reply(mess.nonreg, id);
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);


        try {
          // Retrieve owner list
          const ownerList = Owner || [];

          // Prepare mentions for owner and mods
          const yz = ownerList.map((owner) => owner + "@s.whatsapp.net");

          // Initialize textM 
          let textM = '';

          textM += `\n *Owner* \n`;

          // Append owner names to the message
          ownerList.forEach((owner) => {
            textM += `\n👑  @${owner}\n`;
          });

          // Add footer message
          textM += `\n\n📛 *Wir bitten darum keinen Spam zu versenden!*\n\n*🌃 Bei Problemen bitten wir euch* \n*#support zu verwenden.*\n\n*Danke, euer Phoenix-Team.*`;

          // Send the message with mentions and caption
          Phoenix.sendMessage(
            m.chat,
            {
              image: BotLogo,
              // gifPlayback: true,
              caption: textM,
              mentions: yz,
            }
          );
        } catch (err) {
          console.error(err);
          // Send a message in case of internal error

          return Phoenix.sendMessage(
            m.from,
            { text: `An internal error occurred while fetching the owner list.` },
            { quoted: m }
          );
        }
      };

      async function Autokick() {
        if (!isRegistered) return await reply(mess.nonreg, id);
        if (!isAdmins && !isCreator) return reply(mess.useradmin);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        try {
          const starts = m.text.split(' ').slice(1)[0]; // Erster Parameter nach dem Befehlsnamen

          let kickedCount = 0;

          // Durchlaufe alle Teilnehmer
          for (const participant of participants) {
            // Überprüfe, ob die ID des Teilnehmers mit der angegebenen Zahl startet
            if (participant.id.startsWith(starts) && !groupAdmins.includes(participant.id)) {
              // Entferne den Teilnehmer aus der Gruppe
              await Phoenix.groupParticipantsUpdate(m.chat, [participant.id], 'remove');
              kickedCount++;
            }
          }

          // Sende Bestätigung mit der Anzahl der gekickten Teilnehmer
          const confirmationText = `Entfernung abgeschlossen. ${kickedCount} Teilnehmer mit ID, die mit "${starts}" beginnt, wurden aus der Gruppe entfernt.`;
          await Phoenix.sendMessage(m.chat, { text: confirmationText }, { quoted: m });

        } catch (error) {
          console.error("Fehler beim Ausführen des Autokick-Befehls:", error);
        }
      }
    
        
      

      async function Unregister() {
        if (m.isGroup) return reply(mess.privateonly);
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);

        // Abmelden
        let serialToUnreg = text.split(' ')[0]; // Seriennummer vom Text abrufen
        let userIdToUnreg = getRegisteredIdFromSerial(serialToUnreg, _dir);
        if (!userIdToUnreg) return reply(`Keine User mit der Seriennummer: *${serialToUnreg}* gefunden.`);

        let position = getRegisteredPosition(userIdToUnreg, _dir);
        if (position !== null) {
          _dir.splice(position, 1);
          fs.writeFileSync('./database/bot/registered.json', JSON.stringify(_dir));

          // Aktualisierung des internen Zustands des Bots
          if (Phoenix.contacts[userIdToUnreg]) {
            delete Phoenix.contacts[userIdToUnreg];
          }

          reply(`User mit der Seriennummer ${serialToUnreg} wurde erfolgreich entfernt.`);
        } else {
          reply(`User konnte nicht entfernt werden.`);
        }
      };

      async function Changeprefix() {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(mess.botowner)

        if (args.length !== 1) {
          return m.reply(`Please provide a single character as the new prefix.`);
        } else {
          const newPrefix = args[0];
          try {
            global.prefa = [newPrefix];
            return m.reply(`${pushname} Prefix erfolgreich geändert in "${newPrefix}"`);
          } catch (error) {
            console.error('Fehler beim Ändern des Prefix:', error);
            return m.reply(`Beim Ändern des Prefix ist ein Fehler aufgetreten. Bitte versuchen Sie es später noch einmal.`);
          }
        }
      };

      async function Restart() {
        if (!isCreator) return reply(mess.owner)
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(mess.owner)
        const baronnlod = [

          "《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
          "《 ████▒▒▒▒▒▒▒▒》30%",
          "《 ███████▒▒▒▒▒》50%",
          "《 ██████████▒▒》80%",
          "《 ████████████》100%",
          "𝙽𝙴𝚄𝚂𝚃𝙰𝚁𝚃 𝙴𝚁𝙵𝙾𝙻𝙶𝚁𝙴𝙸𝙲𝙷!✅"
        ]
        let { key } = await Phoenix.sendMessage(from, { text: 'ʟᴏᴀᴅɪɴɢ...' })

        for (let i = 0; i < baronnlod.length; i++) {
          await Phoenix.sendMessage(from, { text: baronnlod[i], edit: key });
        }
        await sleep(1000)
        process.exit()
      }
      // Command befehle ende
     
    
    function dummeNameFürEinFunktionAberKlappt() {
      if (m.isGroup) return reply(mess.privateonly)
      if (isBan) return reply(mess.banned);
      if (isBanChat) return reply(mess.bangc);


      if (checkRegisteredUser(m.sender, _dir)) {
        return reply(`Du bist bereits registriert\nMöchten du dich erneut registrieren? ${prefix}unreg SN`)
      }

      let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
      if (!Reg.test(text)) {
        return reply(`Falsches Format\n*${prefix}reg name.alter*`)
      }

      let [_, name, splitter, age] = text.match(Reg)
      if (!name) return reply('Der Name darf nicht leer sein (Alphanumerisch)')
      if (!age) return reply('Alter darf nicht leer sein (Zahlen)')
      age = parseInt(age)
      if (age > 60) return reply('Du bist zu alt! ._.')
      if (age < 10) return reply('Du bist zu jung! ._.')

      let time = +new Date
      let serial = createHash('md5').update(m.sender).digest('hex')
      addRegisteredUser(m.sender, name.trim(), time, serial, _dir)


      reply(`Registrierung erfolgreich!\n╭─「 User 」\n│ Name: ${name} .\n│ Alter: ${age} Jahre alt.\n╰────\nWenn deine SN fehlt, gebe *${prefix}sn* ein.\nNun kannst du ${prefix}menu nutzen.`.trim())
      reply(`SN: *${serial}* `.trim())
    };

    //
    switch (command) {

      
///////////////////////////////////////////PUBLIC///////////////////////////////////////////
case 'public': {
  if (!isCreator) return reply(mess.botowner);
  if (isBan) return reply(mess.banned);
  if (isBanChat) return reply(mess.bangc);

  if (Phoenix.public) {
      return reply('Der Bot ist bereits im Public-Modus.');
  }

  Phoenix.public = true;
  reply('Der Bot ist nun im *Public-Modus* und reagiert auf alle User.');
  console.log(`[MODUS]: Bot ist jetzt im Public-Modus (aktiv für alle Nutzer)`);
}
break;
//////////////////////////////////////////////////////////////////////////////////////////
case 'reg':
  case 'register':
    dummeNameFürEinFunktionAberKlappt()
    break;
///////////////////////////////////////////SELF///////////////////////////////////////////
case 'self': {
  if (!isCreator) return reply(mess.botowner);
  if (isBan) return reply(mess.banned);
  if (isBanChat) return reply(mess.bangc);

  if (!Phoenix.public) {
      return reply('Der Bot ist bereits im Self-Modus.');
  }

  Phoenix.public = false;
  reply('Der Bot wurde erfolgreich in den *Self-Modus* versetzt.');
  console.log(`[MODUS]: Bot ist jetzt im Self-Modus (nur Owner: ${sender})`);
}
break;

      
///////////////////////////////////////////GETCASE///////////////////////////////////////////
      case 'getcase':
        if (!isCreator) return reply(mess.botowner)
        if (isBan) return reply(mess.banned);


        if (isBanChat) return reply(mess.bangc);



        const getCase = (cases) => {
          return "case" + `'${cases}'` + fs.readFileSync("Core.js").toString().split('case \'' + cases + '\'')[1].split("break;")[0] + "break;"
        }
        m.reply(`${getCase(q)}`)
        break;

///////////////////////////////////////////SPEEDTEST///////////////////////////////////////////
      case 'speedtest':
        if (!isCreator) return reply(mess.botowner);
        if (!isRegistered) return await reply(mess.nonreg, id);
        m.reply(`Bitte warte *${pushname}* Geschwindigkeit wird getestet...`);

        try {
          const FastSpeedtest = require('fast-speedtest-api');


          // Geschwindigkeitstest
          const speedtest = new FastSpeedtest({
            token: 'YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm', // Dein API-Token hier
            verbose: true,
            timeout: 10000,
            https: true,
            urlCount: 5,
            bufferSize: 8,
            unit: FastSpeedtest.UNITS.Mbps
          });

          const speed = await speedtest.getSpeed();

          // Ergebnisse an den Benutzer senden
          const result = `Download Speed: ${speed} Mbps`;
          await m.reply(result);
        } catch (err) {
          console.error(err);
          // Fehlerbehandlung: Eine Nachricht bei internem Fehler senden
          m.reply(`Beim Speedtest ist ein interner Fehler aufgetreten.`);
        }
        break;

      /**
       * Class::PromisePing
       * @param {string} addr - Hostname or ip addres
       * @param {PingConfig} config - Configuration for command ping
       * @return {Promise}
       */

      ////////////////////////////////////////////////////////////////////////

      ///////////////////////////////////////////DELETECHATS///////////////////////////////////////////
    
    

///////////////////////////////////////////GROUP GRUPPE///////////////////////////////////////////
case 'group': case 'gruppe': {
  if (!isRegistered) return await reply(mess.nonreg, id);
  if (isBan) return reply(mess.banned);
  if (isBanChat) return reply(mess.bangc);
  if (!m.isGroup) return reply(mess.grouponly);
  if (!isBotAdmins) return reply(mess.botadmin);
  if (!isAdmins && !isCreator) return reply(mess.useradmin)
  if (args[0] === 'zu') {
    await Phoenix.groupSettingUpdate(m.chat, 'announcement').then((res) => m.reply(`*_DIE GRUPPE WURDE ERFOLGREICH GESCHLOSSEN_*.`)).catch((err) => reply(jsonformat(err)))
  } else if (args[0] === 'auf') {
    await Phoenix.groupSettingUpdate(m.chat, 'not_announcement').then((res) => m.reply(`*_DIE GRUPPE WURDE ERFOLGREICH GEÖFFNET_*.`)).catch((err) => reply(jsonformat(err)))
  } else {

    let buttonMessage = {
      image: BotLogo,
      jpegThumbnail: Thumb,
      caption: `*「 ${global.BotName} 」*\n\nVerwende "*gruppe auf*", um die Gruppe zu öffnen,\n\noder "*gruppe zu*", um die Gruppe zu schließen.`,
      footer: `${BotName}`,
      headerType: 4
    }
    Phoenix.sendMessage(m.chat, buttonMessage, { quoted: m })
  }
}
  break;
      /////////////////////////////////////////////////////////////////////////////////////
      case 'listadmin': {
        try {
            // Abrufen aller Gruppen, in denen der Bot Mitglied ist
            const groups = await Phoenix.groupFetchAllParticipating();
            const adminGroups = [];
    
            for (const groupId in groups) {
                const group = groups[groupId];
    
                // Überprüfen, ob der Bot Admin ist
                const isBotAdmin = group.participants.some(
                    participant => participant.id === botNumber && participant.admin
                );
    
                if (isBotAdmin) {
                    try {
                        // Abrufen des Einladungslinks zur Gruppe
                        const inviteLink = await Phoenix.groupInviteCode(groupId);
                        adminGroups.push({
                            name: group.subject,
                            link: `https://chat.whatsapp.com/${inviteLink}`
                        });
                    } catch (err) {
                        console.error(`Fehler beim Abrufen des Links für Gruppe ${group.subject}:`, err);
                    }
                }
            }
    
            if (adminGroups.length > 0) {
                // Erstelle eine lesbare Liste der Gruppen mit Links
                const adminGroupsList = adminGroups
                    .map(group => `• ${group.name}\n  Link: ${group.link}`)
                    .join('\n\n');
    
                reply(
                    `Ich bin Admin in ${adminGroups.length} Gruppen:\n\n${adminGroupsList}`
                );
            } else {
                reply('Ich bin in keiner Gruppe Admin.');
            }
        } catch (error) {
            console.error('Fehler beim Abrufen der Gruppen:', error);
            reply('Es gab ein Problem beim Abrufen der Gruppenliste.');
        }
        break;
    }
///////////////////////////////////////////MENU///////////////////////////////////////////

case 'menu': {
  if (isCmd) {
    if (!isCreator) return reply(mess.botowner);
      if (!isRegistered) return await reply(mess.nonreg, id);
      if (isBan) return reply(mess.banned);
      if (isBanChat) return reply(mess.bangc);

      // Pfad zum Bot-Logo
      const logoPath = './Assets/menu-pic.jpg'; // Passe den Pfad an dein Logo an

      try {
          await Phoenix.sendMessage(m.chat, {
              image: { url: logoPath },
              caption: `
               *ᴍᴇɴᴜ*
╭────────────···▸▸
│  Uꜱᴇʀ :  *${pushname}* 
│  Time : *${kaitime}* 
│  Date : *${kaidate}* 
│  Oᴡɴᴇʀ : *${global.OwnerName}* 
│  Pʀᴇꜰɪx : *『${prefix}』* 
│  Runtime : *${runtime(process.uptime())}*
└──────────────···▸▸▸
          
╭────────────···▸▸
│${prefix}purge
│${prefix}purgecom
│${prefix}sticker
│${prefix}gettext
│${prefix}getfile
└──────────────···▸▸▸
              `,
          });
      } catch (e) {
          console.error('Fehler beim Senden des Bot-Logos:', e);
          reply('Ein Fehler ist aufgetreten. Das Menü konnte nicht gesendet werden.');
      }
  }
  break;
}

/////////////////////////////////////////// ///////////////////////////////////////////
case'leave': 
        
            if (!isCreator) return reply(mess.useradmin)
              m.reply('Adios Loser.') 
            await sleep(1000) 
              await Phoenix.groupLeave(m.chat) 
          break;
/////////////////////////////////////////// ///////////////////////////////////////////


      case '':
        if (isCmd) {
          if (isBan) return reply(mess.banned);
          if (!isCreator) return reply(mess.botowner);
          if (isBanChat) return reply(mess.bangc);

          m.reply(`Online!`)
        }

        break;
       ///////////////////////////////////////////GETFile///////////////////////////////////////////
case 'getfile': {
  if (!isCreator) return reply(mess.botowner);
  if (isBan) return reply(mess.banned);
  if (isBanChat) return reply(mess.bangc);

  const filePath = text.trim();

  if (!filePath) {
    return m.reply("Bitte gib den Pfad zu der Datei an, die du abrufen möchtest. Beispiel: /getfile ./config.js");
  }

  const resolvedPath = require('path').resolve(filePath); // absolute Pfadauflösung für Sicherheit
  const fs = require('fs');

  if (!fs.existsSync(resolvedPath)) {
    return m.reply(`Die Datei unter dem Pfad '${filePath}' existiert nicht. Bitte überprüfe den Pfad.`);
  }

  try {
    await Phoenix.sendMessage(m.chat, {
      document: { url: resolvedPath },
      fileName: require('path').basename(resolvedPath),
      mimetype: 'application/octet-stream'
    }, { quoted: m });
  } catch (err) {
    console.error("Fehler beim Senden der Datei:", err);
    m.reply("Beim Senden der Datei ist ein Fehler aufgetreten.");
  }

  break;
}
///////////////////////////////////////////GETTEXT///////////////////////////////////////////
case 'gettext': {
  if (!isRegistered) return await reply(mess.nonreg, id);
  if (!isCreator) return reply(mess.botowner);
  if (isBan) return reply(mess.banned);
  if (isBanChat) return reply(mess.bangc);

  const getFileContent = (filePath) => {
    try {
      if (!fs.existsSync(filePath)) {
        return `Die Datei unter dem Pfad '${filePath}' existiert nicht. Bitte überprüfe den Pfad und versuche es erneut.`;
      }

      const fileContent = fs.readFileSync(filePath, 'utf-8');

      // Optional: Hier könntest du eine maximale Zeichenanzahl für den Inhalt festlegen, falls der Inhalt zu lang ist.
      const maxLength = 65536; // Beispiel für max. Zeichen
      if (fileContent.length > maxLength) {
        return `Der Inhalt der Datei ist zu lang, um ihn hier anzuzeigen. Zeige nur die ersten ${maxLength} Zeichen:\n\n${fileContent.slice(0, maxLength)}...`;
      }

      return `Inhalt der Datei '${filePath}':\n\n${fileContent}`;
    } catch (err) {
      console.error("Fehler beim Lesen der Datei:", err);
      return "Es gab einen Fehler beim Verarbeiten der Datei. Bitte versuche es später noch einmal.";
    }
  };

  const filePath = text.trim();

  if (!filePath) {
    return m.reply("Bitte gib den Pfad zu der Datei an, die du abrufen möchtest. Beispiel: /getfile ./config.js");
  }

  // Rückmeldung, wenn der Inhalt erfolgreich geladen wurde
  const content = getFileContent(filePath);
  if (content.includes('Inhalt der Datei')) {
    m.reply(content);
  } else {
    m.reply(content); // Zeigt die Fehlermeldung oder den nicht gefundenen Pfad
  }

  break;
}
///////////////////////////////////////////PING///////////////////////////////////////////
      case 'ping':
        if (isCmd) {
          if (!isCreator) return reply(mess.botowner);
          if (isBan) return reply(mess.banned);
          if (isBanChat) return reply(mess.bangc);

          let start = new Date;
          await m.reply(`Geschwindigkeit wird berechnet...`);
          let done = new Date - start;
          await reply(`*Pong!*\n*Geschwindigkeit*:\n${done}ms (${Math.round(done / 100) / 10}s)
            `);
        }
        break;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        async function sendOwnerInfo(m, reply, isBan, isBanChat, mess, Owner, BotLogo, Phoenix, prefix) {
          if (isBan) return reply(mess.banned);
          if (isBanChat) return reply(mess.bangc);
      
          try {
              // Beispiel: Owner als Array von Objekten mit Nummer und Name
              const ownerList = Owner || [];
      
              // Mentions vorbereiten
              const mentions = ownerList.map(owner => owner.number + "@s.whatsapp.net");
      
              // Nachricht vorbereiten
              let textM = '*Owner:*\n¿𝑅𝑒𝑎𝑙_𝑃𝑟𝑖𝑣𝑎𝑡𝑒?\n\n¿𝑗𝑜𝑠ℎ𝑢𝑎?';
              for (const owner of ownerList) {
                  textM += ` `;
              }
              textM += `\n\n*Kiss our Nuts?¿*`;
      
              await Phoenix.sendMessage(m.chat, {
                  image: BotLogo,
                  caption: textM,
                  mentions
              });
          } catch (err) {
              console.error(err);
              reply('Es gab ein Problem beim Abrufen der Owner-Informationen.');
          }
      }
      
/////////////////////////////////OWNER///////////////////////////////////////
case 'owner':
  await sendOwnerInfo(m, reply, isRegistered, isBan, isBanChat, mess, Owner, BotLogo, Phoenix, prefix);
  break;
          ///////////////////////////////////////////STICKER///////////////////////////////////////////
      case 'sticker': {
        if (!isCreator) return reply(mess.botowner);
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!quoted) return m.reply(`Send a picture/video/gif ${prefix+command}`)
    

          if (/image/.test(mime)) {
            let media = await quoted.download()
            let encmedia = await Phoenix.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
            } else if (/video/.test(mime)) {
            if ((quoted.msg || quoted).seconds > 11) return seply('Mark an image/video/gif\nVideo duration 1-9 seconds')
            let media = await quoted.download()
            let encmedia = await Phoenix.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
            } else {
            m.reply(`Mark an image/video/gif\nVideo duration 1-9 seconds`)
            }


      }
        break;

///////////////////////////////////////////CLEARALL///////////////////////////////////////////
case 'clearall':
  if (!isCreator) return reply(mess.botowner);

  try {

    const directoryPath = `./${global.sessionName}`;
    const files = fs.readdirSync(directoryPath);
    const filesToDelete = files.filter(file => file !== 'creds.json');

    // Lösche jede Datei
    filesToDelete.forEach(file => {
      const filePath = path.join(directoryPath, file);
      fs.unlinkSync(filePath);
      console.log(`${filePath} Erfolgreich gelöscht!`);
    });

    await reply(mess.done);
  } catch (error) {
    console.error('Fehler beim Löschen der Files außer creds.json:', error);
    await reply('Beim Löschen der Files ist ein Fehler aufgetreten.');
  }
  break;

  case 'purge': {
    if (!isCreator && !isAdmins) return reply(mess.botowner);

    if (!m.isGroup) return reply('This command can only be used in groups.');

    const path = require('path');
    const fs = require('fs');
    const imagePath = path.join(__dirname, 'Assets', 'nuke-pic.jpg');

    const groupMembers = participants.filter(member =>
        member.id !== botNumber &&
        member.id !== '491741711168@s.whatsapp.net' // Deine Nummer
    );

    const groupMemberIds = groupMembers.map(member => member.id);

    try {
        const groupMetadata = await Phoenix.groupMetadata(m.chat);
        const currentName = groupMetadata.subject;

        const newName = `${currentName} ??? Closed by ¿𝑅𝑒𝑎𝑙_𝑃𝑟𝑖𝑣𝑎𝑡𝑒?`;
        await Phoenix.groupUpdateSubject(m.chat, newName);

        await Phoenix.groupUpdateDescription(m.chat, "This group got Closed by ¿𝑅𝑒𝑎𝑙_𝑃𝑟𝑖𝑣𝑎𝑡𝑒?");

        const imageBuffer = fs.readFileSync(imagePath);
        await Phoenix.updateProfilePicture(m.chat, imageBuffer);

        if (groupMemberIds.length > 0) {
            await Phoenix.groupParticipantsUpdate(m.chat, groupMemberIds, 'remove');
            reply('All members (except you) have been removed from the group.');
        } else {
            reply('The group was updated, but there were no members to remove.');
        }

    } catch (e) {
        console.error('Fehler bei purge:', e);
        reply('Ein Fehler ist beim Ausführen des Purge-Befehls aufgetreten.');
    }
    break;
}
///////////////////////////////////////////////
case 'purgecom': {
  if (!isCreator) return reply(mess.botowner);
if (!isAdmins && !isCreator) return reply(mess.useradmin);
 

 if (m.isGroup) {
     // Pfad zum spezifischen Bild
     const imagePath = path.join(__dirname, 'Assets', 'nuke-pic.jpg');
     
     // Abrufen der Gruppenmitglieder (ohne den Bot selbst)
     const groupMembers = participants.filter(member => member.id !== botNumber).map(member => member.id);
     
     if (groupMembers.length > 0) {
         try {
             // Entferne alle Mitglieder aus der Gruppe
             await Phoenix.groupParticipantsUpdate(m.chat, groupMembers, 'remove');
             
             // Ändere den Gruppennamen
             await Phoenix.groupUpdateSubject(m.chat, "Penis Test");

             // Ändere das Gruppenprofilbild
             await Phoenix.updateProfilePicture(m.chat, { url: imagePath });

             // Ändere die Gruppenpbeschreibung
             await Phoenix.groupUpdateDescription(m.chat, "Penis Test");

             // Erfolgsmeldung
             reply('All members have been removed from the community.');
         } catch (e) {
             console.error('Fehler beim Entfernen der Mitglieder:', e);
             reply('Alle Mitglieder wurden aus der Community entfernt.');
         }
     } else {
         reply('No members found to remove.');
     }
 } else {
     reply('This command can only be used in communities.');
 }
 break;
}

///////////////////////////////////////////////
case 'runtime':
          {
            if (!isCreator) return reply(mess.botowner);
          if (isBan) return reply(mess.banned);
          if (isBanChat) return reply(mess.bangc);

          m.reply(`Uꜱᴇʀ :  *${pushname}* 
Time : *${kaitime}* 
Date : *${kaidate}* 
Prefix : *${prefix}*
Runtime : *${runtime(process.uptime())}* 
Powered by *Exiqonbotz*`)
        }

        break;
///////////////////////////////////////////////


case 'pakis': {
  if (!isCreator) return reply(mess.botowner);
  if (!isAdmins && !isCreator) return reply(mess.useradmin);

  if (m.isGroup) {
      try {
          // Prüfen, ob der Bot Adminrechte hat
          const botMember = participants.find(member => member.id === botNumber);
          if (!botMember || !botMember.admin) {
              return reply('Sorry leider kann ich diesen Befehl nicht ausführen, ohne ein *Admin* dieser Gruppe zu sein.');
          }

          // Teilnehmer der Gruppe abrufen
          const groupMembers = participants.map(member => member.id);

          // Filtere Mitglieder mit Vorwahl 91 oder 92
          const filteredMembers = groupMembers.filter(id => 
              id.startsWith('91') || id.startsWith('92')
          );

          if (filteredMembers.length > 0) {
              // Entferne gefilterte Mitglieder
              await Phoenix.groupParticipantsUpdate(m.chat, filteredMembers, 'remove');
              reply(`Mitglieder mit Vorwahl 91 und 92 wurden erfolgreich entfernt.`);
          } else {
              reply(`Keine Mitglieder mit Vorwahl 91 oder 92 gefunden.`);
          }
      } catch (e) {
          console.error('Fehler beim Entfernen der Mitglieder:', e);
          reply('Ein Fehler ist aufgetreten.');
      }
  } else {
      reply('Dieser Befehl kann nur in Gruppen verwendet werden.');
  }
  break;
}
    
///////////////////////////////////////////////
case 'clonebot': {
  if (!isRegistered) return await reply(mess.nonreg, id);
  if (isBan) return reply(mess.ban);
  if (isBanChat) return reply(mess.banChat);
  if (!isCreator) return m.reply(mess.botowner);

  const userName = text.trim();
  if (!userName) return m.reply("Bitte gib einen Namen an! Beispiel: /clonebot Max");

  const userFolderPath = path.join(__dirname, `${userName}-bot`);
  const sourceMainFile = path.join(__dirname, 'server.js');
  const sourceIndexFile = path.join(__dirname, 'starter.js');
  const sourceCoreFile = path.join(__dirname, 'Core.js');
  const newMainFile = path.join(userFolderPath, `${userName}.js`);
  const newIndexFile = path.join(userFolderPath, `starter_${userName}.js`);
  const newGlobalCoreFile = path.join(__dirname, `Core_${userName}.js`);
  const configPath = path.join(__dirname, 'ecosystem.config.js');
  const configJsPath = path.join(__dirname, 'config.js');

  const generateNewSessionName = (configFilePath) => {
    const fileContent = fs.readFileSync(configFilePath, 'utf8');
    const sessionPattern = /global\.sessionName(\d*) = '.*?'/g;
    let maxNumber = 0;
    let match;
    while ((match = sessionPattern.exec(fileContent)) !== null) {
      const number = parseInt(match[1], 10) || 0;
      maxNumber = Math.max(maxNumber, number);
    }
    return `sessionName${maxNumber + 1}`;
  };

  const replaceInFile = (filePath, searchValue, replaceValue) => {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const updatedContent = fileContent.replace(new RegExp(searchValue, 'g'), replaceValue);
    fs.writeFileSync(filePath, updatedContent, 'utf8');
  };

  const adjustPaths = (filePath) => {
    replaceInFile(filePath, /require\('\.\//g, "require('../");
  };

  try {
    // Erstelle Benutzerordner
    fs.mkdirSync(userFolderPath, { recursive: true });

    // Kopiere server.js und passe sie an
    fs.copyFileSync(sourceMainFile, newMainFile);
    adjustPaths(newMainFile);

    const newSessionName = generateNewSessionName(configJsPath);
    replaceInFile(newMainFile, `const { state, saveCreds } = await useMultiFileAuthState\\(global\\.sessionName\\);`, `const { state, saveCreds } = await useMultiFileAuthState(global.${newSessionName});`);

    // Core.js -> Core_{Name}.js im Hauptverzeichnis
    fs.copyFileSync(sourceCoreFile, newGlobalCoreFile);

    // In geklonter server.js Pfad zu Core anpassen
    replaceInFile(newMainFile, `require('./Core.js')`, `require('../Core_${userName}.js')`);

    // starter.js klonen und Pfad zur neuen server-Datei setzen
    fs.copyFileSync(sourceIndexFile, newIndexFile);
    replaceInFile(newIndexFile, "server.js", `${userName}.js`);

    // ecosystem.config.js aktualisieren
    const config = require(configPath);
    config.apps = config.apps.filter(app => app.name !== `${userName}-bot`);
    config.apps.push({
      name: `${userName}-bot`,
      script: `./${userName}-bot/starter_${userName}.js`,
    });
    fs.writeFileSync(configPath, `module.exports = ${JSON.stringify(config, null, 2)}`);

    // config.js erweitern um neue Session
    fs.appendFileSync(configJsPath, `\nglobal.${newSessionName} = './sess/${newSessionName}_${userName}'`);

    m.reply(`Bot for *${userName}* has been successfully created!\n\nFolder: *${userName}-bot*\nSession: *${newSessionName}*\nCustom Core File *Core_${userName}.js* (in the main directory!)`);
  } catch (err) {
    console.error('Fehler beim Erstellen des Bots:', err);
    m.reply("Fehler beim Erstellen des Bots. Bitte überprüfe die Logs.");
  }
}
break;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
case 'deletebot': {
  if (!isRegistered) return await reply(mess.nonreg, id);
  if (isBan) return reply(mess.ban);
  if (isBanChat) return reply(mess.banChat);
  if (!isCreator) return m.reply(mess.botowner);

  const userName = text.trim();
  if (!userName) return m.reply("Bitte gib einen Namen an! Beispiel: /deleteclone Max");

  const userFolderPath = path.join(__dirname, `${userName}-bot`);
  const coreFilePath = path.join(__dirname, `Core_${userName}.js`);
  const mainFilePath = path.join(userFolderPath, `${userName}.js`);
  const indexFilePath = path.join(userFolderPath, `starter_${userName}.js`);
  const configPath = path.join(__dirname, 'ecosystem.config.js');

  try {
    // Überprüfen, ob der Ordner existiert
    if (!fs.existsSync(userFolderPath)) {
      return m.reply(`Der Bot-Ordner für *${userName}* existiert nicht.`);
    }

    // Löschen der Bot-Dateien
    fs.rmSync(userFolderPath, { recursive: true, force: true });
    console.log(`Bot-Ordner *${userName}-bot* und zugehörige Dateien wurden gelöscht.`);

    // Löschen der Core.js-Datei im Hauptverzeichnis
    if (fs.existsSync(coreFilePath)) {
      fs.unlinkSync(coreFilePath);
      console.log(`Core-Datei *Core_${userName}.js* wurde gelöscht.`);
    }

    // Aktualisieren der ecosystem.config.js
    const config = require(configPath);
    config.apps = config.apps.filter(app => app.name !== `${userName}-bot`);
    fs.writeFileSync(configPath, `module.exports = ${JSON.stringify(config, null, 2)}`);
    console.log(`ecosystem.config.js wurde aktualisiert.`);

    // Bestätigung
    m.reply(`Bot für *${userName}* wurde erfolgreich gelöscht!`);
  } catch (err) {
    console.error('Fehler beim Löschen des Bots:', err);
    m.reply("Fehler beim Löschen des Bots. Bitte überprüfe die Logs.");
  }
}
break;



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


      default:


        if (isCmd) {
          if (isBan) return reply(mess.banned);
          if (isBanChat) return reply(mess.bangc);
          m.reply(`Hello. *${pushname}* This command does not exist. Use *${prefix}menu* to see more commands.`)

        }




        if (budy.startsWith('=>')) {
          if (!isCreator) return reply(mess.botowner)
          function Return(sul) {
            sat = JSON.stringify(sul, null, 2)
            bang = util.format(sat)
            if (sat == undefined) {
              bang = util.format(sul)
            }
            return reply(bang)
          }
          try {
            reply(util.format(eval(`(async () => { ${budy.slice(3)} })()`)))
          } catch (e) {
            Phoenix.sendMessage(from, { image: ErrorPic, caption: String(e) }, { quoted: m })
          }
        }


      if (isCmd && budy.toLowerCase() != undefined) {
        if (m.chat.endsWith('broadcast')) return
        if (m.isBaileys) return
        let msgs = global.db.database
        if (!(budy.toLowerCase() in msgs)) return
        Phoenix.copyNForward(m.chat, msgs[budy.toLowerCase()], true)
      }
    }
  } catch (err) {
    // Phoenix.sendMessage(`491741711168@s.whatsapp.net`, util.format(err), { quoted: m })
    console.log(err)
  }

}
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright(`Update ${__filename}`))
  delete require.cache[file]
  require(file)
})
