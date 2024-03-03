const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const chatContainer = document.querySelector('.chat-container');

// Define the API URL directly
const API_URL = 'http://127.0.0.1:5000'; // Replace with your Flask server URL

// Handle outgoing chat message
const handleOutgoingChat = () => {
    const userText = chatInput.value.trim();
    const outgoingChatDiv = createChatDiv(userText, "outgoing");
    chatContainer.appendChild(outgoingChatDiv);
    fetch(`${API_URL}/send-message`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userText })
    })
    .then(response => response.json())
    .then(data => {
        const botResponse = data.response;
        const incomingChatDiv = createChatDiv(botResponse, "incoming");
        chatContainer.appendChild(incomingChatDiv);
    })
    .catch(error => console.error('Error:', error));
    chatInput.value = ''; // Clear input field
}

// Create chat message div
const createChatDiv = (message, className) => {
    const chatDiv = document.createElement('div');
    chatDiv.classList.add('chat', className);
    chatDiv.innerHTML = `<div class="chat-content">
                            <div class="chat-details">
                                <img src="images/${className === 'outgoing' ? 'user' : 'chatbot'}.jpg" alt="" srcset="">
                                <p>${message}</p>
                            </div>
                            <span class="material-symbols-outlined">content_copy</span>
                        </div>`;
    return chatDiv;
}

// Event listener for send button
sendBtn.addEventListener('click', handleOutgoingChat);
