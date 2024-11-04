'use client';

import { Button } from '@nextui-org/button';
import { Image } from '@nextui-org/image';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { useMemo } from 'react';

import { useSidebar } from '../Sidebar/SidebarContext';

export type AlertKey = 'hunger' | 'conflicts1' | 'conflicts2' | 'hazards';

export type AlertTypeKey = 'conflicts';

type Alert = {
  key: AlertKey;
  label: string;
  icon: string;
};

type AlertType = {
  key: AlertTypeKey;
  label: string;
  icon: string;
  subalerts: Alert[];
};

const alertTypes: (Alert | AlertType)[] = [
  {
    key: 'hunger',
    label: 'Hunger Alert',
    icon: '/menu_fcs.png',
  },
  {
    key: 'conflicts',
    label: 'Conflicts',
    icon: '/menu_conflicts.png',
    subalerts: [
      {
        key: 'conflicts1',
        label: 'Conflicts 1',
        icon: '/menu_conflicts.png',
      },
      {
        key: 'conflicts2',
        label: 'Conflicts 2',
        icon: '/menu_conflicts.png',
      },
    ],
  },
  {
    key: 'hazards',
    label: 'Hazards',
    icon: '/menu_hazards.png',
  },
];

type AlertsMenuProps = {
  variant: 'outside' | 'inside';
};

export default function AlertsMenu({ variant }: AlertsMenuProps) {
  const { isAlertSelected, toggleAlert } = useSidebar();

  const isSubAlertClicked = useMemo(
    () => (mainAlert: AlertTypeKey) => {
      const alert = alertTypes.find((a) => a.key === mainAlert) as AlertType;
      return alert.subalerts.some((subalert) => isAlertSelected(subalert.key)) ?? false;
    },
    [isAlertSelected]
  );

  return (
    <div className="flex gap-1">
      {alertTypes.map((item) =>
        'subalerts' in item ? (
          <Popover placement={variant === 'inside' ? 'bottom' : 'top'} key={item.key}>
            <PopoverTrigger>
              <Button isIconOnly radius="full" className={isSubAlertClicked(item.key) ? 'bg-primary' : 'bg-background'}>
                <div className="w-6 h-6 flex items-center justify-center">
                  <Image
                    src={item.icon}
                    alt={item.label}
                    className="object-contain w-auto h-auto max-w-full max-h-full"
                  />
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="gap-1 flex">
                {item.subalerts.map((subalert) => (
                  <Button
                    key={subalert.key}
                    isIconOnly
                    radius="full"
                    className={isAlertSelected(subalert.key) ? 'bg-primary' : 'bg-background'}
                    onClick={() => toggleAlert(subalert.key)}
                  >
                    <div className="w-6 h-6 flex items-center justify-center">
                      <Image
                        src={subalert.icon}
                        alt={subalert.label}
                        className="object-contain w-auto h-auto max-w-full max-h-full"
                      />
                    </div>
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <Button
            isIconOnly
            radius="full"
            className={isAlertSelected(item.key) ? 'bg-primary' : 'bg-background'}
            onClick={() => toggleAlert(item.key)}
            key={item.key}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <Image src={item.icon} alt={item.label} className="object-contain w-auto h-auto max-w-full max-h-full" />
            </div>
          </Button>
        )
      )}
    </div>
  );
}
