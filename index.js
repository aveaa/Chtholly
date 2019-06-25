/*
    Copyright © 2019. All rights reserved.
    Author: Limit, MADDEN
*/

// подключение библиотек
const 
    fs = require('fs'),
    mysql = require('mysql');

// глобальные переменные
global.Discord = require('discord.js'),
global.client = new Discord.Client(),
global.config = require('./config.json'),
global.request = require('request');

// подключение к базе

global.con = mysql.createConnection({
    host: config.myslq_host,
    user: config.myslq_user,
    password: config.myslq_password,
    database: config.myslq_database,
    charset : 'utf8mb4',
    insecureAuth : true
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database!");
});
  
// создание клиента
client.discord = Discord;

client.login(config.token);

client.commands = new Discord.Collection() // создаём коллекцию для команд
fs.readdir('./commands', (err, files) => { // чтение файлов в папке commands
  if (err) console.log(err)

  files.forEach((element,iterator) => {
      if(!element.includes(".")) {
          fs.readdir(`./commands/${element}`,(err,sub_files)=>{
              sub_files.forEach((elem,iterator)=>{
                  let props = require(`./commands/${element}/${elem}`);
                  client.commands.set(props.help.name, props);
              })
          }) 
      }
      else {
        let props = require(`./commands/${element}`);
        client.commands.set(props.help.name, props);
      }   
  }) 
})

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));