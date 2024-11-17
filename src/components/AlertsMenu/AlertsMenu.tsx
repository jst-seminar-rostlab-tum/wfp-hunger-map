'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { useMemo } from 'react';

import { AlertButton } from '@/components/AlertsMenu/AlertButton';
import { Tooltip } from '@/components/Tooltip/Tooltip';
import { useSelectedAlert } from '@/domain/contexts/SelectedAlertContext';
import { AlertType } from '@/domain/enums/AlertType';
import { AlertsMenuProps } from '@/domain/props/AlertsMenuProps';
import { SidebarOperations } from '@/operations/sidebar/SidebarOperations';

export function AlertsMenu({ variant }: AlertsMenuProps) {
  const { isAlertSelected, toggleAlert } = useSelectedAlert();

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
            <Tooltip text={item.label}>
              {/* extra element to make tooltip working with the popover */}
              <div className="max-w-fit">
                <PopoverTrigger>
                  <AlertButton icon={item.icon} label={item.label} isSelected={isSubAlertClicked(item.key)} />
                </PopoverTrigger>
              </div>
            </Tooltip>
            <PopoverContent>
              <div className="gap-1 flex">
                {item.subalerts.map((subalert) => (
                  <Tooltip key={subalert.key} text={subalert.label}>
                    <AlertButton
                      icon={subalert.icon}
                      label={subalert.label}
                      isSelected={isAlertSelected(subalert.key)}
                      onClick={() => toggleAlert(subalert.key)}
                    />
                  </Tooltip>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <Tooltip key={item.key} text={item.label}>
            <AlertButton
              icon={item.icon}
              label={item.label}
              isSelected={isAlertSelected(item.key)}
              onClick={() => toggleAlert(item.key)}
            />
          </Tooltip>
        )
      )}
    </div>
  );
}
