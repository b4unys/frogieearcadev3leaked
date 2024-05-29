const webSocket = new WebSocket('wss://api.announcements.yourmom.eu.org');

webSocket.onmessage = function(event) {
    const message = event.data;
    displayMessage(message);
};

function displayMessage(message) {
    const messageBox = document.getElementById('messageBox');
    messageBox.textContent = message;
    messageBox.style.display = 'block';

    setTimeout(function() {
        messageBox.style.display = 'none';
    }, 10000);
}