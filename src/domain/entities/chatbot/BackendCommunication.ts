import { IMessage } from './Chatbot';

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

// TO-DO: not sure if it belongs here. consider moving to another place
export class APIError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}
