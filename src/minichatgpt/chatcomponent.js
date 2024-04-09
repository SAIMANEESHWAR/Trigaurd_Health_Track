import React, { useState } from 'react';
import { model } from './mainmodule.js';


function ChatApp() {
  const [inputText, setInputText] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const getChatResponse = async () => {
    const userText = inputText.trim();
    if (!userText) return;

    appendUserMessage(userText);

    try {
      const result = await model.generateContent(userText);
      const response = await result.response.text();
      appendBotMessage(response.trim());
    } catch (error) {
      appendErrorMessage("Oops! Something went wrong while retrieving the response. Please try again.");
    }
    setInputText(''); // Clear input after sending
  }

  const appendUserMessage = (message) => {
    setChatMessages(prevMessages => [
      ...prevMessages,
      { type: 'user', text: message }
    ]);
  }

  const appendBotMessage = (message) => {
    setChatMessages(prevMessages => [
      ...prevMessages,
      { type: 'bot', text: message }
    ]);
  }

  const appendErrorMessage = (errorMessage) => {
    setChatMessages(prevMessages => [
      ...prevMessages,
      { type: 'error', text: errorMessage }
    ]);
  }

  return (
    <div>
      <div className="chat-container">
        {chatMessages.map((message, index) => (
          <div key={index} className={`${message.type}-message-container`}>
            <p className={`${message.type}-message`}>
              {message.type.charAt(0).toUpperCase() + message.type.slice(1)}: {message.text}
            </p>
          </div>
        ))}
      </div>
      <div className="typing-container">
        <div className="typing-content">
          <div className="typing-textarea">
            <textarea 
            className='form-control'
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey && window.innerWidth > 800) {
                  e.preventDefault();
                  getChatResponse();
                }
              }}
              spellCheck="false"
              placeholder="Enter a prompt here"
              required
            ></textarea>
            <button 
              id="send-btn" 
              className=" mt-5" 
              onClick={getChatResponse}
            >send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatApp;
