//Required libraries
const Revolt = require('revolt.js')
require('dotenv').config();
var fs = require('fs');

//Configuration
let prefix = "sudo"

let client = new Revolt.Client();

//Print logged in as * on startup
client.on('ready', async () =>
	console.info(`Logged in as ${client.user.username}!`)
);

async function command(command,commandName,message){
	args=message.content.split(" ");
	
	if (command.indexOf(args[1]) > -1){

		//Debug info, printing arguments
		console.log("\nDebug info\n");
		console.log("Arguments:");
		console.log(args);

		//Loading the file for the specified command
		let text=fs.readFileSync(`src/${commandName}.js`,'utf8');
		
		//More debug info
		console.log(text);
		console.log(`\nReading from ${commandName}.js\n`);
		console.log("Code:\n\n\033[94;1m"+text+"\033[0m\n");

		//Attempt to run the file
		try {
			console.log("Attempting to run file");
			eval(text);
			console.log('File run sucsesfully');
		}

		//Mostly async issues
		catch(err){
			await message.channel.sendMessage(
				`\`\`\`\n ${err.message}\n${err.name}\n\nIssue in ${command}.js`
				);
			console.error(err);
		}
	}

}
//Runs when the bot recieves a message
client.on('message', async message => {
	
	//Checks to see if the author of the message isn't the bot itself, 
	//as well as checking to see if the message starts with the prefix
	if (message.author!=client.username&&(message.content.toString()).startsWith(prefix)) {
	
	//Print out the message in "[Author username]: message" syntax 
	console.info(`[${message.author.username}]: ${message.content}`)
    
	//Command proccessor, each of these functions checks to see if the given command is equal to the first argument,
	//The second argument is so that the bot knows which channel to send it in, as well as giving message content, author, etc
	await command(["-h","--help"],"help",message);
	await command(["-u","--user"],"user",message);
	await command(["-g","--guild"],"guild",message);
	await command(["-e","--eval"],"eval",message);
		}
});

//Log in as the bot
client.loginBot(process.env['token']);
