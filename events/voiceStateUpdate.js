let Private = new Set(), channelOwners = new Map(); 

module.exports = async (client, oldMember, newMember) => {
	//if(mute.has(newMember.id) && mute.get(newMember.id) == newMember.guild.id) {newMember.setMute(true, Мут);} else {newMember.setMute(false);}  
	if(newMember.voiceChannelID == 560524689298948116) {
        newMember.guild.createChannel(`${newMember.user.username}`, {
            type: 'voice',
            userLimit: 2,
			permissionOverwrites: [{
				id: newMember.user.id,
				allow: ['CONNECT','SPEAK', 'MANAGE_CHANNELS']
            }],
            parent: '560524648417067008'
        }).then(newMember.setVoiceChannel(newMember.guild.channels.find('name', `${newMember.user.username}`).id));
    };

    if(oldMember.voiceChannelID == newMember.guild.channels.find('name', `${newMember.user.username}`).id){
        newMember.guild.channels.find('name', `${newMember.user.username}`).delete();
       };
}
