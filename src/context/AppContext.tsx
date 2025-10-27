import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ChatMessage, Alert, ScheduleItem, User } from '../types';
import { currentUser, alerts, todaySchedule } from '../data/mockData';

interface AppContextType {
  user: User;
  activeNav: string;
  setActiveNav: (nav: string) => void;
  chatMessages: ChatMessage[];
  addChatMessage: (message: ChatMessage) => void;
  alerts: Alert[];
  schedule: ScheduleItem[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      type: 'bot',
      content: "Hello Sarah! I can see you're interested in schedule information. What would you like to know about your shift schedule or nursing procedures?",
      timestamp: new Date(),
    },
  ]);

  const addChatMessage = (message: ChatMessage) => {
    setChatMessages((prev) => [...prev, message]);
  };

  return (
    <AppContext.Provider
      value={{
        user: currentUser,
        activeNav,
        setActiveNav,
        chatMessages,
        addChatMessage,
        alerts,
        schedule: todaySchedule,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
