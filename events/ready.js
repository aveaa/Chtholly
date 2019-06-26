module.exports = async (client) => {
    console.log(`Бот работает под ником: ${client.user.tag}!`);
    client.user.setPresence({
        game: { 
            name: 'на звёзды',
            type: 'WATCHING'
        },
        status: 'dnd'
    });
}
