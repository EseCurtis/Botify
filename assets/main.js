/* Written by Ese Curtis
   Oct 2, 2020
*/

// Define the constants
const conversationContainer = document.getElementById('conversation-container');
const sendButton = document.getElementById('send-button');
const sendInput = document.getElementById('send-input');

// Define the constant functions
// Send messages
const sendMessage = (message) => {
  const messageElement = document.createElement('div');
  messageElement.className = 'user-message';
  const messageContent = '<a class="message-bubble">' + sanitizeInput(message) + '</a>';
  messageElement.innerHTML = messageContent;
  conversationContainer.append(messageElement);
  conversationContainer.scrollTo(0, conversationContainer.scrollHeight);
};

// Reply to messages
const replyToMessage = (message) => {
  const messageElement = document.createElement('div');
  messageElement.className = 'bot-message';
  const messageContent = '<a class="message-bubble">' + sanitizeInput(message) + '</a>';
  messageElement.innerHTML = messageContent;
  conversationContainer.append(messageElement);
  conversationContainer.scrollTo(0, conversationContainer.scrollHeight);
};

// Sanitize user input
const sanitizeInput = (input) => {
  input = input.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');
  return input;
};

// Compute replies
const computeReply = (input) => {
  let sent = false;
  setTimeout(() => {
    wordDict.forEach((word) => {
      if (word.message === input) {
        replyToMessage(word.reply);
        sent = true;
      }
    });
    if (!sent) {
      replyToMessage("Sorry, I wasn't taught that.");
    }
  }, 1100);
};

// Add click listener to send button
sendButton.addEventListener('click', () => {
  const inputValue = sendInput.value.trim();
  if (inputValue.length > 0) {
    sendMessage(inputValue);
    sendInput.value = '';
    computeReply(inputValue);
  }
});

// Chatbot dictionary
let wordDict = [
  {
    message: 'hello',
    reply: 'Hi!'
  },
];

// Config function for the chatbot
const configureBot = (config = []) => {
  if (!Array.isArray(config)) {
    console.warn('Please provide a valid config for the bot.');
    return;
  }
  wordDict = [...config, ...wordDict];
};
