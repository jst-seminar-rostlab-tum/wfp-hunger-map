import { Switch } from '@nextui-org/switch';

import { useUserRole } from '@/domain/contexts/UserRoleContext';
import { UserRole } from '@/domain/enums/UserRole';

/**
 * Switch to control the role of the user. Should eventually be replaced with proper authentication
 * Only visible if the 'NEXT_PUBLIC_FORECASTS_ENABLED' env var is set to true.
 */
export function UserRoleSwitch() {
  const { userRole, setUserRole } = useUserRole();
  const onSwitchChange = (isAdmin: boolean) => {
    setUserRole(isAdmin ? UserRole.ADMIN : UserRole.RESTRICTED_USER);
  };

  return process.env.NEXT_PUBLIC_FORECASTS_ENABLED === 'true' ? (
    <Switch
      aria-label={`Switch to ${userRole === UserRole.ADMIN ? 'restricted' : 'admin'} mode`}
      classNames={{
        base: 'flex items-center gap-4 w-full max-w-full justify-between',
        wrapper: 'order-2 bg-gray-200 dark:bg-gray-400',
        label: 'order-1 text-tiny ms-0',
      }}
      isSelected={userRole === UserRole.ADMIN}
      onValueChange={onSwitchChange}
    >
      Admin mode
    </Switch>
  ) : null;
}
