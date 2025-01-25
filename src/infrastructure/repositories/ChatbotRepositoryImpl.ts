import { v4 as uuid } from 'uuid';

import { APIError, QueryRequest, QueryResponse } from '@/domain/entities/chatbot/BackendCommunication.ts';
import ChatbotRepository from '@/domain/repositories/ChatbotRepository';

export default class ChatbotRepositoryImpl implements ChatbotRepository {
  async testHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_CHATBOT_API_URL}/health`);
      return response.ok;
    } catch {
      return false;
    }
  }

  async sendMessage(message: string, options: Partial<Omit<QueryRequest, 'query'>>): Promise<QueryResponse> {
    try {
      const payload: QueryRequest = {
        chatId: options.chatId || uuid(),
        report_context: options.report_context || undefined,
        query: message,
        version: options.version || 1,
        chatbot_type: options.chatbot_type || 'gpt-4',
        limit: options.limit || 5,
        previous_messages: options.previous_messages || [],
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_CHATBOT_API_URL}/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new APIError(response.status, errorData.error || `Server responded with status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError(500, 'Failed to connect to server');
    }
  }
}
