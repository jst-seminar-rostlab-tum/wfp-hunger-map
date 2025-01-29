import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { useSnackbar } from '@/domain/contexts/SnackbarContext';
import { IChat, IReportContext } from '@/domain/entities/chatbot/Chatbot';
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
  initiateChatAboutReport: (reportContext: IReportContext) => Promise<void>;
  isOpen: boolean;
  isMobile: boolean;
  isSidebarOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  updateChatWithSelection: (selectionText: string) => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export function ChatbotProvider({ children }: { children: ReactNode }) {
  const [currentChatIndex, setCurrentChatIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 640px)');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chats, setChats] = useState<IChat[]>(ChatbotOperations.loadChatsFromStorage());
  const { showSnackBar } = useSnackbar();

  /**
   * Saves chats to localStorage whenever they change
   */
  useEffect(() => {
    ChatbotOperations.saveChatsToStorage(chats, showSnackBar);
  }, [chats, showSnackBar]);

  const openChat = (chatIndex: number) => {
    setCurrentChatIndex(chatIndex);
    setIsOpen(true);
  };

  /**
   * Starts a new chat, either with a provided chat object or a default one.
   * @param newChat - Optional chat object to start with.
   * @param openNewChat - Optional flag to determine if the new chat should be opened immediately.
   */
  const startNewChat = (newChat?: IChat, openNewChat?: boolean) => {
    let chatToAdd: IChat;

    if (!newChat) {
      chatToAdd = {
        id: uuid(),
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

  /**
   * Updates the current chat with the selected text of the user and adds an assistant message
   * @param selectionText - The text selected from the report by the user
   */
  const updateChatWithSelection = (selectionText: string) => {
    const chatToUpdate = chats[currentChatIndex];
    if (chatToUpdate.reportContext) {
      const assistantMessage = {
        id: crypto.randomUUID(),
        content: `I see you've selected some text from the report. How can I help you understand this part better?`,
        role: SenderRole.ASSISTANT,
      };

      chatToUpdate.messages.push(assistantMessage);
      chatToUpdate.reportContext.selectionText = selectionText;
      setChats([...chats]);
    }
  };

  /**
   * Initiates a chat with a report based on the provided context type and value.
   * If a chat for that specific context already exists, it opens that chat; otherwise, it creates a new one.
   * @param reportContext - The report context containing type ('country' or 'year_of_review'),
   *                        value (country name or year) and the optional selected text from the report by the user
   */
  const initiateChatAboutReport: (reportContext: IReportContext) => Promise<void> = async (
    reportContext: IReportContext
  ) => {
    const { type } = reportContext;
    const { value } = reportContext;
    const { selectionText } = reportContext;
    const chatTitle = type === 'country' ? `Report ${value}` : `${value} Year in Review`;
    const reportChatIndex = chats.findIndex((chat) => chat.title === chatTitle);
    const reportChatExists = reportChatIndex !== -1;

    if (reportChatExists) {
      openChat(reportChatIndex);
      if (selectionText) {
        updateChatWithSelection(selectionText);
      }
      return;
    }

    const content = selectionText
      ? `I see you've selected some text from this ${
          type === 'country' ? 'Country Report about' : 'Year in Review for'
        } ${value}. How can I help you understand this part better?`
      : `Hey, how can I help you with this ${
          type === 'country' ? 'Country Report about' : 'Year in Review for'
        } ${value}?`;

    const assistantMessage = {
      id: crypto.randomUUID(),
      content,
      role: SenderRole.ASSISTANT,
    };

    const newChat: IChat = {
      id: uuid(),
      title: chatTitle,
      reportContext: {
        type,
        value,
        ...(selectionText ? { selectionText } : {}),
      },
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
      initiateChatAboutReport,
      isOpen,
      isMobile,
      isSidebarOpen,
      setIsOpen,
      setIsSidebarOpen,
      updateChatWithSelection,
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
