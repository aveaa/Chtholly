module.exports = (client, guild) => {
    con.query('SELECT * FROM guilds WHERE guild_id = ?', [guild.id], (err, rows) => {
        if(err) throw err;
        if(rows.length < 1) return;
        con.query('DELETE FROM guilds WHERE guild_id = ?', [guild.id]);
        console.log(`Сервер: ${guild.name}, удалился, id: ${guild.id}`);
    });   
}
  