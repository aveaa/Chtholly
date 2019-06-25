module.exports.run = (client, message, args) => {
    let embed = new Discord.RichEmbed()
    .setAuthor("Пригласить бота", client.user.avatarURL)
    .setColor(config.color)
    .setDescription("[Let's GO!](https://discordapp.com/oauth2/authorize?client_id=578573398435692544&scope=bot&permissions=8)")
    .setFooter("Нажми, не стесняйся ^-^")
    message.channel.send(embed);
}
  
module.exports.help = {
    name: "invite"
}