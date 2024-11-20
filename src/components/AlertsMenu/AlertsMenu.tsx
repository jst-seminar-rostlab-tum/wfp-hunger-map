'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { useMemo } from 'react';

import { AlertButton } from '@/components/AlertsMenu/AlertButton';
import { Tooltip } from '@/components/Tooltip/Tooltip';
import { useSelectedAlert } from '@/domain/contexts/SelectedAlertContext';
import { AlertType } from '@/domain/enums/AlertType';
import { useConflictQuery, useHazardQuery } from '@/domain/hooks/alertHooks';
import { AlertsMenuProps } from '@/domain/props/AlertsMenuProps';
import { SidebarOperations } from '@/operations/sidebar/SidebarOperations';

export function AlertsMenu({ variant }: AlertsMenuProps) {
  const { isAlertSelected, toggleAlert } = useSelectedAlert();
  const { isFetching: conflictsFetching } = useConflictQuery(false);
  const { isFetching: hazardsFetching } = useHazardQuery(false);

  const isSubAlertClicked = useMemo(
    () => (mainAlert: AlertType) => {
      const alert = SidebarOperations.getSidebarAlertTypeByKey(mainAlert);
      return alert?.subalerts?.some((subalert) => isAlertSelected(subalert.key)) ?? false;
    },
    [isAlertSelected]
  );

  const alertFetching: Record<AlertType, boolean> = {
    [AlertType.CONFLICTS]: conflictsFetching,
    [AlertType.HAZARDS]: hazardsFetching,
    [AlertType.COUNTRY_ALERTS]: false, // this will be fetched on the server, so this can stay false for now
  };

  return (
    <div className="flex gap-1">
      {SidebarOperations.getSidebarAlertTypes().map((item) =>
        SidebarOperations.hasSubalerts(item) ? (
          <Popover placement={variant === 'inside' ? 'bottom' : 'top'} key={item.key}>
            <Tooltip text={item.label}>
              {/* extra element to make tooltip working with the popover */}
              <div className="max-w-fit">
                <PopoverTrigger>
                  <AlertButton
                    icon={item.icon}
                    label={item.label}
                    isSelected={isSubAlertClicked(item.key)}
                    isLoading={alertFetching[item.key]}
                  />
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
                      isLoading={alertFetching[item.key]}
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
              isLoading={alertFetching[item.key]}
              onClick={() => {
                toggleAlert(item.key);
              }}
            />
          </Tooltip>
        )
      )}
    </div>
  );
}
