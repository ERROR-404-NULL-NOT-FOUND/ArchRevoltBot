const Revolt = require('revolt.js')
var fs = require('fs');
let prefix = "sudo"
let client = new Revolt.Client();

client.on('ready', async () =>
	console.info(`Logged in as ${client.user.username}!`)
);
async function command(command,message){

	args=message.content.split(" ");
	if (args[1]==command){
		fs.readFile(command+".js", 'utf8', function(err,data){
			try {eval(data);}
			catch(err){
				message.channel.sendMessage(`\`\`\`${err}`);
				console.error(err);
			}
		});
	}

}

client.on('message', async message => {
	if (message.author!=client.username&&message.content.startsWith(prefix)) {
	console.info(`[${message.author.username}]: ${message.content}`)
    
			command("help",message);
			command("user",message);
			command("guild",message);
			command("warn",message);
		}
});

// To login as a bot:
client.loginBot('S9WfSsrJ9s4J0hqpLFy63HBO2gDTVKXRCbPbnJ4WNKBZohgSDgsrpTVzh0q5JdkF');

// To login as a user,
// either create a new session:
//client.login({ email: '..', password: '..' });

// Or use an existing session:
//client.useExistingSession({ token: '..' });