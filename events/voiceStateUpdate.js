let
	channelId,
	categoryId, 
	cooldown = 15;

let talkedRecently = new Set(), channelOwners = new Map(); // таймер и map

module.exports = async (client, oldMember, newMember) => {
	async function checkmute() {  mute.has(newMember.id) ? newMember.setMute(true, "Мут") : newMember.setMute(false) }
	con.query("SELECT * FROM private WHERE guild_id = ?", [newMember.guild.id], async (err, rows) => {
		if (err) throw err;
		console.log(rows);
		if(rows.length < 1) return;
		categoryId = rows[0].category_id;
		channelId = rows[0].channel_id;
		client.creatorVoice = client.channels.get(channelId);
		if (oldMember.voiceChannel && oldMember.voiceChannel.parentID == categoryId && oldMember.voiceChannel.members.size <= 0 && oldMember.voiceChannelID != channelId) oldMember.voiceChannel.delete(); 
		if (oldMember.voiceChannel && oldMember.voiceChannel.parentID == categoryId && oldMember.voiceChannelID == channelOwners.get(oldMember.id)) {
			channelOwners.delete(oldMember.id);
			if(oldMember.voiceChannel.members.size <= 0) oldMember.voiceChannel.delete(); 
		}
		if (newMember.voiceChannelID != channelId) return;
		if (talkedRecently.has(newMember.id)) {client.creatorVoice.overwritePermissions(newMember.user, {VIEW_CHANNEL: false}); return;}

		await newMember.voiceChannel.clone(`${newMember.user.username} 🔐`, false, false).then(async clone => {
			await clone.setParent(categoryId);
			await newMember.setVoiceChannel(clone.id);
			await clone.setUserLimit(2);
			clone.overwritePermissions(newMember.user, {MANAGE_CHANNELS: true, VIEW_CHANNEL: true, CONNECT: true, SPEAK: true});
			talkedRecently.add(newMember.id);
			channelOwners.set(newMember.id, clone.id);
			setTimeout(() => {talkedRecently.delete(newMember.id); client.creatorVoice.overwritePermissions(newMember.user, {VIEW_CHANNEL: true});}, cooldown * 1000);
		}).catch(console.log);
	});
}
