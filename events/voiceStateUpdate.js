const categoryId = config.private_category       // ID категории для созданных каналов
, cooldown = 15         // Кулдаун между перезаходами в секундах (Если поставить меньше, есть возможность сломать Дискорд)
    ;

let Private = new Set(), channelOwners = new Map(); // таймер и map

module.exports = async (client, oldMember, newMember) => {
    if(!newMember.voiceChannel) return;
    if(mute.has(newMember.id) && mute.get(newMember.id) == newMember.guild.id) newMember.setMute(true, "Мут");
    if(!mute.has(newMember.id)) newMember.setMute(false);

	if (oldMember.voiceChannel && oldMember.voiceChannel.parentID == categoryId && oldMember.voiceChannelID == channelOwners.get(oldMember.id)) {oldMember.voiceChannel.delete(); channelOwners.delete(oldMember.id)}
	if (newMember.voiceChannelID != channelId) return;
	if (Private.has(newMember.id)) {client.creatorVoice.overwritePermissions(newMember.user, {VIEW_CHANNEL: false}); return;}

	newMember.voiceChannel.clone(`${newMember.user.tag} 🔐`, false, false).then(async clone => {
		await clone.setParent(categoryId);
		clone.setUserLimit(2);
		clone.overwritePermissions(newMember.user, {MANAGE_CHANNELS: true, VIEW_CHANNEL: true, CONNECT: true, SPEAK: true});
		newMember.setVoiceChannel(clone.id);
		Private.add(newMember.id);
		channelOwners.set(newMember.id, clone.id);
		setTimeout(() => {Private.delete(newMember.id); client.creatorVoice.overwritePermissions(newMember.user, {VIEW_CHANNEL: true});}, cooldown * 1000);
	}).catch(console.log);
}
