module.exports.run = (client, message, args) => {
    if(!args.join()) return message.reply("Напишите текст!");
    con.query('UPDATE guilds SET w_text = ? WHERE guild_id = ?', [args.join(" "), message.guild.id]);
    message.reply("Текст успешно обновлён!");
}
  
module.exports.help = {
    name: 'welcome-text'
} 