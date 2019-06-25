function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

module.exports.run = (client, message, args) => {
	if(config.owner_id.indexOf(message.author.id) == -1) return message.reply("Команда работает только для разработчиков!");
	try {
		args.shift();
    	const code = args.join(" ");
    	let evaled = eval(code);
    	if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
    	if (evaled.length > 2000 || evaled.startsWith('Promise')) evaled = 'Выполняю!';
    	message.channel.send(clean(evaled), {code:"xl"}).then((msgd) => {if (evaled == 'Выполняю!') msgd.delete(2000);});
    } catch (err) {
     		message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
		}
}

module.exports.help = {
	name: "eval"
}