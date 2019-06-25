module.exports.run = (client, message, args) =>{
    let member = message.guild.member(message.mentions.users.first())
    if(!member) return message.reply("Вы не указали пользователя!");
    if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send('Недостаточно прав!')

    let reason = args[1];
    if(!reason) reason = "Не указана!";
    message.channel.send(`Пользователь ${member.user.username}, был забанен!\nПричина: \`${reason}\``);
    member.ban({ days:7, reason:reason })
    console.log(`${member.user.username} забанен, Причина: ${reason}`);
}

module.exports.help = {
    name: 'ban'
}