import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';

import { IChat } from '@/domain/entities/chatbot/Chatbot';
import { SenderRole } from '@/domain/enums/SenderRole';
import { DownloadPortalOperations } from '@/operations/download-portal/DownloadPortalOperations';
import { useMediaQuery } from '@/utils/resolution';

interface ChatbotContextType {
  chats: IChat[];
  setChats: React.Dispatch<React.SetStateAction<IChat[]>>;
  currentChatIndex: number;
  setCurrentChatIndex: React.Dispatch<React.SetStateAction<number>>;
  openChat: (chatIndex: number) => void;
  startNewChat: (newChat?: IChat) => void;
  chatWithReport: (countryName: string, report: string) => Promise<void>;
  isOpen: boolean;
  isMobile: boolean;
  isSidebarOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export function ChatbotProvider({ children }: { children: ReactNode }) {
  const [currentChatIndex, setCurrentChatIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 640px)');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chats, setChats] = useState<IChat[]>([
    {
      id: 1,
      title: 'Chat 1',
      messages: [],
      isTyping: false,
    },
  ]);

  const openChat = (chatIndex: number) => {
    setCurrentChatIndex(chatIndex);
    setIsOpen(true);
  };

  const startNewChat = (newChat?: IChat, openNewChat?: boolean) => {
    let chatToAdd: IChat;

    if (!newChat) {
      chatToAdd = {
        id: chats.length + 1,
        title: `Chat ${chats.length + 1}`,
        messages: [],
        isTyping: false,
      };
    } else {
      chatToAdd = newChat;
    }

    setChats((prevChats) => [...prevChats, chatToAdd]);
    setCurrentChatIndex(chats.length);

    if (openNewChat) {
      setIsOpen(true);
    }

    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const chatWithReport = async (countryName: string, report: string) => {
    // Don't create new chat if chat with report was started before
    const reportChatIndex = chats.findIndex((chat) => chat.title === `Report ${countryName}`);
    const reportChatExists = reportChatIndex !== -1;
    if (reportChatExists) {
      openChat(reportChatIndex);
      return;
    }

    const reportText = await DownloadPortalOperations.extractTextFromPdf(await report);

    const assistantMessage = {
      id: crypto.randomUUID(),
      content: reportText
        ? `Hey, how can I help you with this report about ${countryName}?`
        : `Hey, unfortunately I'm currently unable to answer questions about this report. You can try it later or chat with me about other things!`,
      role: SenderRole.ASSISTANT,
    };

    const newChat: IChat = {
      id: chats.length + 1,
      title: `Report ${countryName}`,
      context: reportText,
      isReportStarter: true,
      messages: [assistantMessage],
      isTyping: false,
    };

    startNewChat(newChat, true);
  };

  const value = useMemo(
    () => ({
      chats,
      setChats,
      currentChatIndex,
      setCurrentChatIndex,
      startNewChat,
      openChat,
      chatWithReport,
      isOpen,
      isMobile,
      isSidebarOpen,
      setIsOpen,
      setIsSidebarOpen,
    }),
    [chats, currentChatIndex, isOpen, isMobile, isSidebarOpen]
  );

  return <ChatbotContext.Provider value={value}>{children}</ChatbotContext.Provider>;
}

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};
