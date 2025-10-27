import React, { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import BotMessage from '../chat/BotMessage';
import UserMessage from '../chat/UserMessage';

const InteractiveDisplay: React.FC = () => {
  const { chatMessages } = useApp();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  return (
    <div className="space-y-4">
      {chatMessages.map((message) => (
        message.type === 'bot' ? (
          <BotMessage key={message.id} message={message} />
        ) : (
          <UserMessage key={message.id} message={message} />
        )
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default InteractiveDisplay;
