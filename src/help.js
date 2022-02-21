//Async, makes everything run faster
async function hello(message, args){
	//Checking to see if theres an argument given(first is the prefix, second is the command, 3rd is the first argument)
	var text;
	var file;
	if(args[2]==null){

		//Default help message
		text=fs.readFileSync(`src/command-help/help.txt`,'utf8');
		file="help";
	
	}else{
		
		//If theres an argument, read and sendin corrosponding file for the given command catagory
		try{
			text=fs.readFileSync(`src/command-help/${args[2]}.txt`,'utf8');
			file=args[2];
		}
		
		//If theres an error thrown, it most likely means that its an invalid file
		//(theres also the chance of it being due to the bot not having message perms)
		catch{
			message.channel.sendMessage("No such command catagory!")
			return;
		}
	}
	message.channel.sendMessage({
		content:"#",
		embeds: [
			{
				type: "text",
				title: file,
				description:text,
				colour: "#0077b6",
				icon_url: `https://autumn.revolt.chat/avatars/${client.user.avatar._id}`,
			}
		]
	});
}
hello(message, args);