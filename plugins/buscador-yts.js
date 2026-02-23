import fetch from 'node-fetch'

var handler = async (m, { text, conn, args, command, usedPrefix }) => {

  if (!text) return conn.reply(m.chat, `🔎 Por favor, ingresa una búsqueda de YouTube.`, m)

  conn.reply(m.chat, `⏳ Buscando...`, m)

  try {
    const res = await fetch(`https://gawrgura-api.onrender.com/search/youtube?q=${encodeURIComponent(text)}`)
    const data = await res.json()

    if (!data.status || !data.result || !data.result.length) {
      return conn.reply(m.chat, `❌ No se encontraron resultados.`, m)
    }

    const results = data.result
    const first = results[0]

    let teks = results.slice(0, 5).map((v, i) => {
      return `「✦」Resultado ${i + 1}

┃ ☁️ Título » ${v.title}
┃ 🍬 Canal » ${v.channel}
┃ 🕝 Duración » ${v.duration}
┃ 🔗 Enlace » ${v.link}`
    }).join('\n\n••••••••••••••••••••••••••••••••\n\n')

    await conn.sendFile(
      m.chat,
      first.imageUrl,
      'yts.jpeg',
      teks,
      m
    )

  } catch (e) {
    console.error(e)
    conn.reply(m.chat, `⚠️ Ocurrió un error al consultar la API.`, m)
  }
}

handler.help = ['ytsearch']
handler.tags = ['busquedas']
handler.command = ['ytbuscar', 'ytsearch', 'yts']
handler.register = true
handler.coin = 1

export default handler