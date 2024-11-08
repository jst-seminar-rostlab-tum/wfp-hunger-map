import { IChat } from '../entities/chatbot/Chatbot';

/**
 * Props for the ChatbotSidebar component
 */
export interface ChatbotSidebarProps {
  isFullScreen: boolean;
  chats: IChat[];
  currentChatIndex: number;
  onSelectChat: (index: number) => void;
  onStartNewChat: () => void;
}
