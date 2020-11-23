/*Written by Ese Curtis
oct 2, 2020*/

//define the constants 
const mainConversation = document.getElementById('main-conversation');
const sendButton = document.getElementById('send-button');
const sendValue = document.getElementById('send-value');

//define the contant functions
//sending messages
const send = str=>{
	var message = document.createElement('div');
	message.className = 'user';
	var messageContent = '<a class="bubble">'+htmlEnt(str)+'</a>';
	message.innerHTML = messageContent;
	mainConversation.append(message);
	mainConversation.scrollTo(0, mainConversation.scrollHeight);
}
//replying messages
const reply = str=>{
	var message = document.createElement('div');
	message.className = 'reply';
	var messageContent = '<a class="bubble">'+htmlEnt(str)+'</a>';
	message.innerHTML = messageContent;
	mainConversation.append(message);
	mainConversation.scrollTo(0, mainConversation.scrollHeight);
}
//purify input
const htmlEnt = str=>{
	str = str.replace(/</g, '&lt')
		  .replace(/>/g, '&gt')
		  .replace(/\n/g, '<br>');
		  
	return str;
}

//compute messages
const compute = str=>{
let sent = 0;
	setTimeout(()=>{
		wordDict.forEach(element=>{
			if(element.message == str){
				reply(str);	
				sent = 1;
			}
		});
		if(sent == 0){
			reply('sorry sir i wasn\'t taught that');	
		}
	}, 1100);
}

//addition of the onclick listener to the send button
sendButton.addEventListener('click',()=>{
	let replyValue = sendValue.value.trim();
	if(replyValue.length > 0){
		send(replyValue);
		sendValue.value = "";
		compute(replyValue);
	}
});

//chatbot dictionary 
const wordDict = [
	{
		message:"hello",
		reply:"hi"
	},
];
