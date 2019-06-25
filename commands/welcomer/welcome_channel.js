module.exports.run = (client, message, args) => {
    let welcome_channel = message.mentions.channels.first();
    if(!welcome_channel) return message.reply("Укажите канал!");

    con.query('UPDATE guilds SET w_channel = ?, w_status = 1 WHERE guild_id = ?', [welcome_channel.id, message.guild.id])
    welcome_channel.send("Теперь этот канал служит приветствия новых пользователей!");
}
  
module.exports.help = {
    name: 'welcome-channel'
} 