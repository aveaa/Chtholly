module.exports.run = (client, message, args) => {
  if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send('Недостаточно прав!')
  if(!args.join()) return message.reply("Вы не ввели текст!");
  message.channel.send(args.join());
}
module.exports.help = {
    name: 'say'
}