module.exports.run = (client, message, args) => {
    if(!args.join()) return message.reply("Вы не вставили ссылку на изображение!");
    con.query('UPDATE guilds SET w_image = ? WHERE guild_id = ?', [args.join(" "), message.guild.id]);
    message.reply("Изображение обновленно!");
}
  
module.exports.help = {
    name: 'welcome-image'
} 