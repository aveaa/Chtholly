const talkedRecently = new Set();

module.exports.run = async (client, message) => {
    if (talkedRecently.has(message.author.id)) return message.reply("Данную команду можно прописывать раз в день");
    message.reply("Поздравляем, вы получили ежедневную награду!")
    con.query(`UPDATE account SET money = money + 10  WHERE d_id = ?`, [message.author.id]);
    talkedRecently.add(message.author.id);
    setTimeout(() => {
        talkedRecently.delete(message.author.id);
    }, 86400000);
}

module.exports.help = {
    name: "daily"
}