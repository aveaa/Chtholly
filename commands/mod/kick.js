module.exports.run = (client, message, args) =>{
    let member = message.guild.member(message.mentions.users.first())
    if(!member) return message.reply("Вы не указали пользователя!")
    if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send('Недостаточно прав!')

    let reason = args[1];

    member.kick()
    message.channel.send(`Пользователь ${member.name}, был кикнут!\nПричина: \`${reason}\``)
    console.log(`${member.name} кикнут, Причина: ${reason}`)
}

module.exports.help = {
    name: 'kick'
}