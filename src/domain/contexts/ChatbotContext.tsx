import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

import { IChat } from '@/domain/entities/chatbot/Chatbot';
import { SenderRole } from '@/domain/enums/SenderRole';
import ChatbotOperations from '@/operations/chatbot/Chatbot';
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
  const [chats, setChats] = useState<IChat[]>(ChatbotOperations.loadChatsFromStorage());

  // Save chats to localStorage whenever they change
  useEffect(() => {
    ChatbotOperations.saveChatsToStorage(chats);
  }, [chats]);

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
        timestamp: Date.now(),
      };
    } else {
      chatToAdd = {
        ...newChat,
        timestamp: Date.now(),
      };
    }

    const updatedChats = [...chats, chatToAdd];
    setChats(updatedChats);
    setCurrentChatIndex(updatedChats.length - 1);

    if (openNewChat) {
      setIsOpen(true);
    }

    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const chatWithReport = async (countryName: string, report: string) => {
    const reportChatIndex = chats.findIndex((chat) => chat.title === `Report ${countryName}`);
    const reportChatExists = reportChatIndex !== -1;
    if (reportChatExists) {
      openChat(reportChatIndex);
      return;
    }

    // Use dynamic import for client-side PDF text extraction
    const { extractClientSidePdfText } = await import('@/operations/pdf/DownloadPortalOperations');
    const reportText = await extractClientSidePdfText(report);
    //  const reportText = await DownloadPortalOperations.extractTextFromPdf(await report);

    const assistantMessage = {
      id: crypto.randomUUID(),
      content: reportText
        ? `Hey, how can I help you with this report about ${reportText}?`
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
      timestamp: Date.now(),
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
