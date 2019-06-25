module.exports.run = async (client, message, args) => {
    if(!args.join()) return message.reply("Введите id");
    request.get({url: `https://api.opendota.com/api/players/${args.join()}`, json: true}, async (err, body, res) => {
        if(!res.solo_competitive_rank) return message.reply("Пользователь не найден!");
       const embed = new Discord.RichEmbed()
       .setAuthor("Dota 2", res.profile.avatarfull)
       .setColor('RED')
       .setThumbnail(res.profile.avatarfull)
       .setDescription(`Статистика
       **Игровой ник: [${res.profile.personaname}](${res.profile.profileurl})**`);
       request.get({url: `https://api.opendota.com/api/players/${args.join()}/wl`, json: true}, async (err, body, res) => {
            embed.addField("Матчей выиграно", res.win, true)
            embed.addField("Проиграно матчей", res.lose, true)
            embed.addField("Win rate", res.win / (res.lose + res.win));
            message.channel.send(embed);
        })
    })
}

module.exports.help = {
    name: "dota"
}