import { SenderRole } from '@/domain/enums/SenderRole';

export interface IMessage {
  id: string;
  content: string;
  role: SenderRole.USER | SenderRole.ASSISTANT;
  dataSources?: string[];
}

export interface IReportContext {
  type: 'country' | 'year_in_review';
  value: string;
}

export interface IChat {
  id: string;
  title: string;
  reports_country_name?: string;
  isReportStarter?: boolean;
  messages: IMessage[];
  isTyping: boolean;
  timestamp: number;
  report_context?: IReportContext;
}
