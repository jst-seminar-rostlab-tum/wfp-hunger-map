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
}
