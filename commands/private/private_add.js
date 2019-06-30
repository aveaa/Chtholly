module.exports.run = (client, message, args) => {
    if(!args[0] || !args[1]) return message.reply("Укажите id голосового канала и id категории!");
    con.query('SELECT * FROM private WHERE guild_id = ?', [message.guild.id], async (err, rows) => {
        if(rows.length >= 1) {
            con.query('UPDATE private SET channel_id = ?, category_id = ?, name = ? WHERE guild_id = ?', [args[0], args[1], message.guild.name, message.guild.id]);
            message.reply('Канал и категория обновлены!');
        }
        else {
            con.query('INSERT INTO private(name, channel_id, guild_id, category_id) VALUES (?, ?, ?, ?)', [message.guild.name, args[0], message.guild.id, args[1]]);
            message.reply("Теперь у вас на сервере есть собственная система приватных каналов!");
        }
    });
}
  
module.exports.help = {
    name: 'private-add'
} 