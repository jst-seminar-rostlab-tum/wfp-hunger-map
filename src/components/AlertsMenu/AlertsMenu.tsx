'use client';

import { Button } from '@nextui-org/button';
import { Image } from '@nextui-org/image';
import clsx from 'clsx';

import { useSidebar } from '../Sidebar/SidebarContext';

type AlertsMenuProps = {
  variant: 'outside' | 'inside';
  className?: string;
};

export default function AlertsMenu({ variant, className }: AlertsMenuProps) {
  const { isSidebarOpen } = useSidebar();

  const alertTypes = [
    {
      key: 'conflicts',
      label: 'Conflicts',
      icon: '/menu_conflicts.png',
    },
    {
      key: 'hazards',
      label: 'Hazards',
      icon: '/menu_hazards.png',
    },
  ];

  if (variant === 'outside' && isSidebarOpen) {
    return null;
  }
  return (
    <div className={clsx('flex gap-1', className)}>
      {alertTypes.map((item) => (
        <Button isIconOnly radius="full" className="bg-background" key={item.key}>
          <div className="w-6 h-6 flex items-center justify-center">
            <Image src={item.icon} alt={item.label} className="object-contain w-auto h-auto max-w-full max-h-full" />
          </div>
        </Button>
      ))}
    </div>
  );
}
