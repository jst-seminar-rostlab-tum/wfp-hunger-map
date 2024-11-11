import { AlertType } from '@/domain/enums/AlertType';

export interface SidebarAlertType {
  key: AlertType;
  label: string;
  icon: string;
  subalerts?: SidebarAlertType[];
}
