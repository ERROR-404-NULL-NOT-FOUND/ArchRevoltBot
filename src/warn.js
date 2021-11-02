async function warn(message, client, args){
	let perms=false;
	let user=await client.users.fetch(message.author._id);
	for(const i in user.roles){
		console.log(message.author.roles[i].name);
		if(message.author.roles[i].name==="Admin"){perms=true;}
	}
	console.log(message.author.roles);
	if(perms){
		message.channel.sendMessage("In dev");
	}else{
	message.channel.sendMessage("# YOU DO NOT HAVE PERMISSION TO DO THAT!");
}}
warn(message,client,args);