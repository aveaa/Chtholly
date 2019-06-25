module.exports = (client, guild) => {
    con.query('SELECT * FROM guilds WHERE guild_id = ?', [guild.id], (err, rows) => {
        if(err) throw err;
        if(rows.length >= 1) return;
        con.query('INSERT INTO guilds (guild_name, guild_id) VALUES (?, ?)', [guild.name, guild.id]);
        console.log(`Сервер: ${guild.name}, добавлен в базу, id: ${guild.id}`);
    });   
}
  