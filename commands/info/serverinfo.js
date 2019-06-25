module.exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL)
    .setColor('BLUE')
    .setThumbnail(message.guild.iconURL)
    .setDescription(`**Участников: ${message.guild.memberCount}
    Участников онлайн: ${message.guild.members.filter(m => m.presence.status == 'online' && !m.user.bot).size} 
    Овнер Сервера: ${message.guild.owner.user.username}
    Регион: ${message.guild.region}

    Дата создания: ${message.guild.createdAt}**`);
    message.channel.send(embed);
}
  
module.exports.help = {
    name: 'server-info'
} 