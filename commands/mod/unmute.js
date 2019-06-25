module.exports.run = (client, message, args) => {
   let member = message.guild.member(message.mentions.users.first());
   if(!message.member.hasPermission("MUTE_MEMBERS")) return message.reply("Недостаточно прав!");
   if(!member) return message.reply("Вы не указали пользователя!");
   if(!mute.has(member.id)) return message.reply('Пользователь не имеет мута!');
   if(mute.get(member.id) != message.guild.id) return message.reply('Пользователь не найден!');

   mute.forEach((value, key, map) => {
      if(key == member.id && value == message.guild.id) {
         mute.delete(key);
         message.reply(`${member.user.username} размучен!`);
         member.send('Вы были размучены!');
         if(!member.voiceChannel) return;
         member.setMute(false);
      }
	});
}
     
module.exports.help = {
	name: 'unmute'
}