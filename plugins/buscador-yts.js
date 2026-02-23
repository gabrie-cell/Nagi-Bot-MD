import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

// Función para generar contacto falso
async function makeFkontak() {
try {
const res = await fetch('https://i.postimg.cc/rFfVL8Ps/image.jpg')
const thumb2 = Buffer.from(await res.arrayBuffer())
return {
key: { participants: '0@s.whatsapp.net', remoteJid: 'status@broadcast', fromMe: false, id: 'Halo' },
message: { locationMessage: { name: 'Tourl', jpegThumbnail: thumb2 } },
participant: '0@s.whatsapp.net'
}
} catch {
return null
}
}

// Función principal para enviar resultados de ytsearch
async function sendYTSearch(m, conn, query, usedPrefix) {
let fkontak = await makeFkontak()
if (!fkontak) fkontak = m

const r = await fetch(`https://gawrgura-api.onrender.com/search/youtube?q=${encodeURIComponent(query)}`)
const data = await r.json()

const videos = data.result || []

if (!videos.length) {
await conn.reply(m.chat, 'No se encontraron resultados', m)
return true
}

// Preparar media de cabecera (miniatura del primer video)
let mediaHeader = null
try {
mediaHeader = await prepareWAMessageMedia(
{ image: { url: videos[0].imageUrl } },
{ upload: conn.waUploadToServer }
)
} catch {}

// Crear filas de lista interactiva
const rows = videos.map(v => ({
title: v.title,
description: `Duración: ${v.duration} • Canal: ${v.channel}`,
id: `.play ${v.link}` // 🔥 Aquí está el cambio
}))

const interactiveMessage = {
body: { text: `Resultados de búsqueda para: ${query}` },
footer: { text: 'Selecciona un video para reproducir' },
header: { title: 'YouTube Search', hasMediaAttachment: !!mediaHeader?.imageMessage, imageMessage: mediaHeader?.imageMessage },
nativeFlowMessage: {
buttons: [
{ name: 'single_select', buttonParamsJson: JSON.stringify({ title: 'DESCARGAR', sections: [ { title: 'Opciones', rows } ] }) }
],
messageParamsJson: ''
}
}

const msg = generateWAMessageFromContent(
m.chat,
{ viewOnceMessage: { message: { interactiveMessage } } },
{ userJid: conn.user.jid, quoted: fkontak }
)

await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
return true
}

// Handler principal
let handler = async (m, { conn, args, usedPrefix }) => {
const query = args.join(' ')
if (!query) return conn.reply(m.chat, `Usa: ${usedPrefix}ytsearch <consulta>`, m)
return sendYTSearch(m, conn, query, usedPrefix)
}

handler.help = ['ytsearch <consulta>']
handler.tags = ['descargas']
handler.command = /^(ytsearch|yts)$/i

export default handler