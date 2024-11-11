import { QueryRequest, QueryResponse } from '@/domain/entities/chatbot/BackendCommunication.ts';

export default interface ChatbotRepository {
  /**
   * Tests the health of the chatbot service by sending a test message.
   * @returns A promise that resolves to a boolean indicating the health status.
   */
  testHealth(): Promise<boolean>;

  /**
   * Sends a message to the chatbot service with optional parameters.
   * @param message The message to be sent to the chatbot.
   * @param options Optional parameters for the message, excluding the query.
   * @returns A promise that resolves to the response from the chatbot.
   */
  sendMessage(message: string, options: Partial<Omit<QueryRequest, 'query'>>): Promise<QueryResponse>;
}
