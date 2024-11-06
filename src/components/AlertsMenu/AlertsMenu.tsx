'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { useMemo } from 'react';

import { AlertButton } from '@/components/AlertsMenu/AlertButton';
import { useSidebar } from '@/domain/contexts/SidebarContext';
import { AlertType } from '@/domain/enums/AlertType';
import { AlertsMenuProps } from '@/domain/props/AlertsMenuProps';
import { SidebarOperations } from '@/operations/charts/SidebarOperations';

export function AlertsMenu({ variant }: AlertsMenuProps) {
  const { isAlertSelected, toggleAlert } = useSidebar();

  const isSubAlertClicked = useMemo(
    () => (mainAlert: AlertType) => {
      const alert = SidebarOperations.getSidebarAlertTypeByKey(mainAlert);
      return alert?.subalerts?.some((subalert) => isAlertSelected(subalert.key)) ?? false;
    },
    [isAlertSelected]
  );

  return (
    <div className="flex gap-1">
      {SidebarOperations.getSidebarAlertTypes().map((item) =>
        SidebarOperations.hasSubalerts(item) ? (
          <Popover placement={variant === 'inside' ? 'bottom' : 'top'} key={item.key}>
            <PopoverTrigger>
              <AlertButton icon={item.icon} label={item.label} isSelected={isSubAlertClicked(item.key)} />
            </PopoverTrigger>
            <PopoverContent>
              <div className="gap-1 flex">
                {item.subalerts.map((subalert) => (
                  <AlertButton
                    key={subalert.key}
                    icon={subalert.icon}
                    label={subalert.label}
                    isSelected={isAlertSelected(subalert.key)}
                    onClick={() => toggleAlert(subalert.key)}
                  />
                ))}
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <AlertButton
            key={item.key}
            icon={item.icon}
            label={item.label}
            isSelected={isAlertSelected(item.key)}
            onClick={() => toggleAlert(item.key)}
          />
        )
      )}
    </div>
  );
}
