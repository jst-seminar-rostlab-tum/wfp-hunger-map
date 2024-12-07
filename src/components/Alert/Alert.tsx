import { CustomAlertProps } from '@/domain/props/CustomAlertProps';

import CustomInfoCircle from '../CustomInfoCircle/CustomInfoCircle';

export default function CustomAlert({ title, description, className }: CustomAlertProps) {
  return (
    <div className={`flex items-start ${className}`} role="alert">
      <div className="mr-3">
        <CustomInfoCircle size={50} />
      </div>
      <div>
        <div className="font-bold text-lg mb-1">{title}</div>
        <div className="text-sm">{description}</div>
      </div>
    </div>
  );
}
