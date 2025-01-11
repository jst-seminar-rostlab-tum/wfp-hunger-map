import { SenderRole } from '@/domain/enums/SenderRole';

export interface IMessage {
  id: string;
  content: string;
  role: SenderRole.USER | SenderRole.ASSISTANT;
  dataSources?: string[];
}

export interface IChat {
  id: string;
  title: string;
  reports_country_name?: string;
  isReportStarter?: boolean;
  messages: IMessage[];
  isTyping: boolean;
  timestamp: number;
}
