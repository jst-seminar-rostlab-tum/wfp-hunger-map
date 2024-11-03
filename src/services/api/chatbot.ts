// @author: Ahmet Selman Güclü
// IMPORTANT: chatbot requests work only when back-end is running locally since the back-end is not deployed yet

import { IMessage } from '@/types/chatbot';

// Types according to the back-end are like this:
export interface QueryRequest {
  query: string;
  version?: number;
  chatbot_type?: string;
  limit?: number;
  previous_messages?: IMessage[];
}

export interface QueryResponse {
  response: string;
  prompt_tokens: number;
  total_tokens: number;
}

// Adjust this when back-end is deployed and in production, this API_BASE_URL should be move to other file later
const API_BASE_URL = 'http://127.0.0.1:5000';

// Error type for handling API errors
export class APIError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

// Main chat service
export const chatService = {
  // Test the connection to the backend
  testHealth: async (): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return response.ok;
    } catch {
      return false;
    }
  },

  // Send message to the backend
  sendMessage: async (message: string, options: Partial<Omit<QueryRequest, 'query'>> = {}): Promise<QueryResponse> => {
    try {
      // Construct the request payload
      const payload: QueryRequest = {
        query: message,
        version: options.version || 1,
        chatbot_type: options.chatbot_type || 'gpt-4',
        limit: options.limit || 5,
        previous_messages: options.previous_messages || [],
      };

      const response = await fetch(`${API_BASE_URL}/query`, {
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
  },
};

// Helper function to format the response for the chat interface
export const formatChatResponse = (response: QueryResponse) => ({
  text: response.response,
  sender: 'ai' as const,
  metadata: {
    promptTokens: response.prompt_tokens,
    totalTokens: response.total_tokens,
  },
});
