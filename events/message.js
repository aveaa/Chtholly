module.exports = async (client, message) => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;

    if(mute.has(message.author.id) && mute.get(message.author.id) == message.guild.id) {
        message.delete();
        return message.author.send("Вы не можете писать сообщение, так как у вас мут.");
    }

    con.query('SELECT * FROM account WHERE d_id = ?', [message.author.id], (err, rows) => {
        if(rows.length < 1) return con.query('INSERT INTO account (name, d_id) VALUES (?, ?)', [message.author.username, message.author.id]);
        con.query('UPDATE account SET xp = xp + 1 WHERE d_id = ?', [message.author.id]);
        if(rows[0].xp >= 100+10*rows[0].level) {
            message.reply("Вы получили новый уровень, поздравляем!");
            con.query('UPDATE account SET level = level + 1,  xp = 0  WHERE d_id = ?', [message.author.id]);
        }
    });
    
    let prefix = "k.";
    con.query('SELECT * FROM guilds WHERE guild_id = ?', [message.guild.id], (err, rows) => {
        if(rows.length < 1) return con.query('INSERT INTO guilds (guild_name, guild_id) VALUES (?, ?)', [message.guild.name, message.guild.id]);

        prefix = rows[0].prefix;
        if(message.content.startsWith(prefix)) {
            let messageArray = message.content.split(' ') // разделение пробелами
            let command = messageArray[0] // команда после префикса
            let args = messageArray.slice(1) // аргументы после команды
        
            let command_file = client.commands.get(command.slice(prefix.length)) // получение команды из коллекции
            if (command_file) command_file.run(client, message, args)
            return;
        }
    }); 
    
    if(message.content.startsWith(prefix)) {
        let messageArray = message.content.split(' ') // разделение пробелами
        let command = messageArray[0] // команда после префикса
        let args = messageArray.slice(1) // аргументы после команды
    
        let command_file = client.commands.get(command.slice(prefix.length)) // получение команды из коллекции
        if (command_file) command_file.run(client, message, args)
        return;
    }
}
