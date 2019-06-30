module.exports.run = (client, message, args) => {
    if(config.owner_id.indexOf(message.author.id) == -1) return message.reply("Команда работает только для разработчиков!");
    if(!args[0]) return message.reply("Вы забыли указать id пользователя!");
    let member = client.users.get(args[0]);
    let servers = client.guilds.filter(g => g.members.has(args[0])).map(g => g.name).join(', ');
    message.reply("**Ник: **" + member.username + "\nСервера: " + servers)
}
  
module.exports.help = {
    name: "search"
}