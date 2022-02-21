async function guild(message, client){
	guild=await client.servers.fetch(message.channel.server._id);
	var roles="";
	for(const i in guild.roles){
		roles+=guild.roles[i].name+"\n";
	}
	membersList=await guild.fetchMembers();
	var members=0;
	for(const i in membersList.members) {members++;console.log(membersList.members[i]);}
	send=`[](${await guild.generateIconURL()})[](${await guild.generateBannerURL()})\n> # ${guild.name}\n> ${guild.description}\n > ### Roles\n > ###### ${roles}\n > ### ${members} Members`
	await message.channel.sendMessage(send);
}
guild(message, client);