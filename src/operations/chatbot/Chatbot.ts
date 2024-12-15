import { IChat } from '@/domain/entities/chatbot/Chatbot';
import { SNACKBAR_SHORT_DURATION } from '@/domain/entities/snackbar/Snackbar';
import { SenderRole } from '@/domain/enums/SenderRole';
import { SnackbarPosition, SnackbarStatus } from '@/domain/enums/Snackbar';
import { SnackbarProps } from '@/domain/props/SnackbarProps';

export default class ChatbotOperations {
  static processInput(submitEvent: React.FormEvent, chats: IChat[], currentChatIndex: number, text: string): IChat[] {
    submitEvent.preventDefault();
    if (chats[currentChatIndex].isTyping) return chats; // prevent multiple submission
    if (text.trim()) {
      const updatedChats = structuredClone(chats);
      updatedChats[currentChatIndex].messages.push({ id: crypto.randomUUID(), content: text, role: SenderRole.USER });
      if (updatedChats[currentChatIndex].title === `Chat ${updatedChats[currentChatIndex].id}`) {
        updatedChats[currentChatIndex].title = text.slice(0, 30) + (text.length > 30 ? '...' : '');
      }
      return updatedChats;
    }
    return chats;
  }

  static loadChatsFromStorage(): IChat[] {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('chatbotChatsWithTimestamp');

      if (storedData) {
        const parsedData = JSON.parse(storedData);
        const currentTime = Date.now();
        const oneWeekAgo = currentTime - 7 * 24 * 60 * 60 * 1000; // Filter set for 1 week

        // Filter out chats older than 1 Week
        const recentChats = parsedData.filter(
          (chat: IChat & { timestamp?: number }) => !chat.timestamp || chat.timestamp > oneWeekAgo
        );

        // Clean up localStorage by saving only the chats that are not older than 1 Week
        localStorage.setItem('chatbotChatsWithTimestamp', JSON.stringify(recentChats));

        if (recentChats.length !== 0) {
          return recentChats;
        }
      }
    }

    // Return default chat if no recent chats are found
    return [
      {
        id: 1,
        title: 'Chat 1',
        messages: [],
        isTyping: false,
        timestamp: Date.now(),
      },
    ];
  }

  static saveChatsToStorage(chats: IChat[], showSnackBar: (snackbarProps: SnackbarProps) => void): void {
    if (typeof window !== 'undefined') {
      const chatsWithTimestamp = chats.map((chat) => ({
        ...chat,
        timestamp: chat.timestamp || Date.now(),
      }));

      localStorage.setItem('chatbotChatsWithTimestamp', JSON.stringify(chatsWithTimestamp));
    } else {
      showSnackBar({
        message: 'Unable to save chats.',
        status: SnackbarStatus.Error,
        position: SnackbarPosition.BottomRight,
        duration: SNACKBAR_SHORT_DURATION,
      });
    }
  }
}
