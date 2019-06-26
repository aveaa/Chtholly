module.exports = async (client, oldMember, newMember) => {
    if(!newMember.voiceChannel) return;
    if(mute.has(newMember.id) && mute.get(newMember.id) == newMember.guild.id) newMember.setMute(true, "Мут");
    if(!mute.has(newMember.id)) newMember.setMute(false);
}
