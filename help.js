function hello(message, args){
	fs.readFile('help.txt', 'utf8', function(err,data){
			message.channel.sendMessage(data);
		});
}
hello(message, args);