module.exports.run = async (client, message, args) => {
    if(!args.join()) return message.reply("Введите id");
    request.get({url: `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${config.SteamAPI}&steamids=${args.join()}`, json: true}, async (err, body, res) => {
    if(!res.response.players[0]) return message.reply("Пользователь не найден!");
    const embed = new Discord.RichEmbed()
       .setAuthor("Steam", res.response.players[0].avatarfull)
       .setColor('BLUE')
       .setThumbnail(res.response.players[0].avatarfull)
       .setDescription(`Информация о профиле
       **Ник: [${res.response.players[0].personaname}](${res.response.players[0].profileurl})**`);
    message.channel.send(embed);
    })
}

module.exports.help = {
    name: "steam"
}