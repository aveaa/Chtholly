module.exports.run = (client, message, args) => {
    if(!args.join()) return message.reply("Напишите новый префикс");
    if(args.join().length >= 6) return message.reply("Превышено максимальное количество символов (5)");
    con.query('UPDATE guilds SET prefix = ? WHERE guild_id = ?', [args.join(), message.guild.id]);
    message.reply("Прификс успешно изменён на: " + args.join());
}

module.exports.help = {
    name: 'setprefix'
}