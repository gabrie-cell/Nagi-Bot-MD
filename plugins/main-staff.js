let handler = async (m, { conn, command, usedPrefix }) => {
let img = './src/catalogo.jpg'
let staff = `ᥫ᭡ *EQUIPO DE AYUDANTES* ❀
✰ *Dueño* » perri-rip
✦ *Bot* » ׄ❀ׅᮢ໋۬۟   ׁ ᮫᩠ERZA SCARLET  ꫶֡ᰵ࡙🌸̵໋ׄᮬ͜✿֪
⚘ *Versión* » ${vs}
❖ *Libreria* » ${libreria} ${baileys}
> ✧ GitHub » https://github.com/gabrie-ux

✰ *Colaborador 1* » 
✦ *Rol* » Ayudante y desarrollador. 
> ✧ Github » 

✰ *Colaborador 2* » 
✦ *Rol* » Soporte/ayudante, editor.
> ✧ Github » 
`
await conn.sendFile(m.chat, img, 'yuki.jpg', staff.trim(), m)
}
  
handler.help = ['staff']
handler.command = ['colaboradores', 'staff']
handler.register = true
handler.tags = ['main']

export default handler
