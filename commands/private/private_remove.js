module.exports.run = (client, message, args) => {
    con.query('SELECT * FROM private WHERE guild_id = ?', [message.guild.id], async (err, rows) => {
        if(rows.length < 1) return message.reply("У вас не установлена система приватных каналов!");
        con.query('DELETE FROM private WHERE guild_id = ?', [message.guild.id]);
        await message.reply("Система приватных каналов удалена.");
    });
}
  
module.exports.help = {
    name: 'private-remove'
} 