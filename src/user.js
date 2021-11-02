async function user(message,args,client){
	
	let user1=await bot(message,args,client);
	let profile=await user1.fetchProfile();
	var profileInfo="";
	profileInfo=(profile.content).replace(/(\n)+/g, "\n > ");
	let send=`> # ${user1.username}\n> $$$$\n> ## Bot \n >    ${bot(user1)}\n> ## Status\n >    ${user1.status.text}\n > ### Information\n > ${profileInfo}\n[ ](https://autumn.revolt.chat/avatars/${user1.avatar._id})`;
	message.channel.sendMessage(send);
	await message.delete();
}
async function uID(messsage,args,client){
	console.log(args[2]);
	if(args[2]!=""){
		return await client.users.fetch(args[2]);
	}else{
		return await client.users.fetch(message.author._id);
	}
}
function bot(user){
	if(user.bot){
		return `True\n> Owner: ${user.bot.owner}`;
	}else{
		return "False";
	}
}
user(message,args,client);