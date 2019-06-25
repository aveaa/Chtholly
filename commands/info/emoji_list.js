module.exports.run = async (client, message, args) => {
    const emojiList = message.guild.emojis.map((e, x) => (e.name + ' = ' + e) + ' | ' +x).join('\n');
    if(!emojiList) return message.reply("На сервере нету emoji :(");
    message.channel.send(emojiList);
}

module.exports.help = {
    name: "emoji-list"
}
