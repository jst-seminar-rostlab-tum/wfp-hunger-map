export interface IOption {
  report_id: string;
  report_name: string;
}

export interface ITopic {
  is_country_selectable: boolean;
  topic_id: string;
  topic_name: string;
  topic_description: string;
  options?: IOption[] | undefined;
}

export interface ISubscribe {
  name: string;
  email: string;
  organisation: string;
  country_ids?: string[];
  topic_id?: string;
}

export interface ISubscribeResponse {
  ok: boolean;
  message: string;
}
