module.exports.run = (client, message, args) => {
    if(config.owner_id.indexOf(message.author.id) == -1) return message.reply("Команда работает только для разработчиков!");
    message.guild.leave();
}
  
module.exports.help = {
    name: "leave"
}