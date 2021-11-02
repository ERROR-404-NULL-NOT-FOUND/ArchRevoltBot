const Revolt = require('revolt.js')
var fs = require('fs');
let prefix = "sudo"
let client = new Revolt.Client();

client.on('ready', async () =>
	console.info(`Logged in as ${client.user.username}!`)
);
async function debugLog(message){
	console.log(message);
	debug+=message+"\n";
}
let debug="";

async function command(command,message){
	debug="";
	args=message.content.split(" ");
	if (args[1]==command){
		debugLog("\nDebug info\n");
		debugLog("Arguments:");
		debugLog(args);
		fs.readFile(command+".js", 'utf8', function(err,data){
			debugLog(`\nReading from ${command}.js\n`);
			debugLog("Code:\n\n\033[94;1m"+data+"\033[0m\n");
			try {debugLog('Attempting to run file');eval(data);debugLog('File run sucsesfully');}
			catch(err){
			message.channel.sendMessage(`\`\`\`\n ${err.message}\n${err.name}\n\nIssue in ${command}.js\n\`\`\`\nFull debug info: \n\`\`\`\n${debug}\`\`\``);
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