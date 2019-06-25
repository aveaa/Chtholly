global.mute = new Map();

module.exports.run = (client, message, args) => {
    if(!message.mentions.users.first) return message.reply("Укажите пользователя!");
    if(!args[0] || !args[1] || !args[2]) return message.reply("Отстуствуют аргументы.\nФормат: `формат`");
    if(!message.member.hasPermission("MUTE_MEMBERS")) return message.reply("Недостаточно прав!")
    let member = message.guild.member(message.mentions.users.first());
    if(message.author.id == member.id) return message.reply("Вы не можете дать себе мут!");
    if(mute.has(member.id)) return message.reply("У пользователя уже стоит мут!");
    mute.set(member.id, message.guild.id);
    if(member.voiceChannel) member.setMute(true, "Мут");
    message.reply("Мут был выдан.");
    setTimeout(() => {
        mute.forEach((value, key, map) => {
            if(key == member.id && value == message.guild.id) {
               mute.delete(key);
               member.send('Вы были размучены на сервере ' + message.guild.name);
               if(!member.voiceChannel) return;
               member.setMute(false);
            }      
        });
    }, args[1] * 60000);
}
   
module.exports.help = {
    name: 'mute'
}
