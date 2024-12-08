import { SenderRole } from '@/domain/enums/SenderRole';

export interface IMessage {
  id: string;
  content: string;
  role: SenderRole.USER | SenderRole.ASSISTANT;
  dataSources?: string[];
}

export interface IChat {
  id: number;
  title: string;
  context?: string;
  isReportStarter?: boolean;
  messages: IMessage[];
  isTyping: boolean;
}
