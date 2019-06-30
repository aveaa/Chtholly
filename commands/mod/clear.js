module.exports.run = (client, message, args) =>{
    if(message.author.bot) return message.channel.send('Бот не может использовать команды!')
    if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send('Недостаточно прав!')
    let val = args[0] 
    if(val = 0) message.channel.send('Размер не указан')
    message.delete().then(message => {message.channel.bulkDelete(val)})
    console.log(`${message.channel.name} был очищен в размере ${val} сообщений.`)
    
}
module.exports.help = {
    name: 'clear'
}