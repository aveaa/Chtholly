module.exports = (client, member) => {
    con.query('SELECT * FROM guilds WHERE guild_id = ?', [member.guild.id], (err, rows) => {
        if(rows[0].w_status == 0) return;
        let str = rows[0].w_text;
        let w_channel = client.channels.get(rows[0].w_channel)
        if(!str) return w_channel.send(member + ", Добро пожаловать!");
        
        str = str
            .replace("{member}", member.user.username)
            .replace("{count}", member.guild.memberCount)
            .replace("{name}", member.guild.name);

        const embed = new Discord.RichEmbed()
        .setTitle('Test')
        .setDescription(str)
        .setColor(config.color);
        if (rows[0].w_image) embed.setImage(rows[0].w_image);
        w_channel.send(embed);
    });   
}
