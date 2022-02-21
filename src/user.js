//Checks to see if theres an argument passed, if so, return the argument, otherwise, return author id
//Checks to see if the given user is a bot, if so, return True, newline, followed by the username of the author.
//If the given user is not a bot, return false
function botFetch(user){
	if(user.bot){
		return `True\n> Owner: ${user.owner.username}`;
	}else{
		return "False";
	}
}

//Async, makes everything run faster
async function userGet(message,args,client){
	if(args[2]){
		//Returns argument
		userID=args[2];
	}else{
		//Returns author ID
		userID=message.author._id;
	}
	let user=await client.users.fetch(userID);
	//Parsing the UNIX timestamp that user.createdAt returns into human readible date and time
	//Output: month/day/year at hour:minute:second
	let date = new Date(user.createdAt);
	let time = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

	//Loads profile info, doing some weird regex stuff
	let profileInfo=(await user.fetchProfile());

	//Send the message, then delete the original
	message.channel.sendMessage({
		//This makes it so no text needs to be visible in the message itself, only in the embed
		content:"#",
            embeds: [
                {
                    type: 'Text',
					//The small text at the top and the image next to it
                    title: user.username,
					icon_url: `https://autumn.revolt.chat/avatars/${client.user.avatar._id}`,
					description: `## Account creation date\n\`${time}\`\n## Bot\n${botFetch(user)}\n## Status\n${user.status.text}\n### Information\n${profileInfo.content}`,
					//For some reason, colour is the only spelling that works
					colour: "#0077b6",
                }
            ]});
	message.delete();
}

userGet(message,args,client);