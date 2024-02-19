const socket = io('http://localhost:4000');
const groupSelector = document.querySelector('#group-selector');
const channelSelector = document.querySelector('#channel-selector');
const messageContainer = document.querySelector('#message-container');
const messageForm = document.querySelector('#send-container');
const messageInput = document.querySelector('#message-input');

const username = prompt('Username?');
const password = prompt('Password?');

appendMessage('You joined');
socket.emit('new-user', username);

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`);
});

socket.on('user-connected', name => {
    appendMessage(`${name} connected`);
});

socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`);
});

messageForm.addEventListener('submit', error => {
    error.preventDefault();
    const message = messageInput.value;
    appendMessage(`You: ${message}`);
    socket.emit('send-chat-message', message);
    messageInput.value = '';
});

groupSelector.addEventListener('change', () => {
    console.log(groupSelector.value);
});

channelSelector.addEventListener('change', () => {
    console.log(channelSelector.value);
});

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageContainer.append(messageElement);
}
