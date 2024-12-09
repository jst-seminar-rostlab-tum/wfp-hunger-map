import { IChat } from '@/domain/entities/chatbot/Chatbot';
import { SenderRole } from '@/domain/enums/SenderRole';

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
        const oneDayAgo = currentTime - 24 * 60 * 60 * 1000; // Filter set for 24 hours

        // Filter out chats older than 24 hours
        const recentChats = parsedData.filter(
          (chat: IChat & { timestamp?: number }) => !chat.timestamp || chat.timestamp > oneDayAgo
        );

        // Clean up localStorage by saving only the chats that are not older than 24 hours
        localStorage.setItem('chatbotChatsWithTimestamp', JSON.stringify(recentChats));

        // If no recent chats, return default chat
        if (recentChats.length === 0) {
          return [
            {
              id: 1,
              title: 'Chat 1',
              messages: [],
              isTyping: false,
              timestamp: currentTime,
            },
          ];
        }

        return recentChats;
      }

      // If no stored data, return default chat
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

  static saveChatsToStorage(chats: IChat[]): void {
    if (typeof window !== 'undefined') {
      const chatsWithTimestamp = chats.map((chat) => ({
        ...chat,
        timestamp: chat.timestamp || Date.now(),
      }));

      localStorage.setItem('chatbotChatsWithTimestamp', JSON.stringify(chatsWithTimestamp));
    }
  }
}
