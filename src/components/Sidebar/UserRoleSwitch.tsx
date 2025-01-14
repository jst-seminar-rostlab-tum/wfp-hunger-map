import { Switch } from '@nextui-org/switch';
import cookies from 'js-cookie';

import { useUserRole } from '@/domain/contexts/UserRoleContext';
import { UserRole } from '@/domain/enums/UserRole';

/**
 * Switch to control the role of the user. Should eventually be replaced with proper authentication
 * Only visible if the 'adminSwitchVisible' cookie is set.
 */
export function UserRoleSwitch() {
  const { userRole, setUserRole } = useUserRole();
  const onSwitchChange = (isAdmin: boolean) => {
    setUserRole(isAdmin ? UserRole.ADMIN : UserRole.RESTRICTED_USER);
  };

  const visible = cookies.get('adminSwitchVisible');

  return (
    visible && (
      <div className="flex items-center justify-between gap-4 w-full ml-1">
        <small>Admin mode</small>
        <Switch
          classNames={{
            wrapper: ['bg-gray-200 dark:bg-gray-400'],
          }}
          isSelected={userRole === UserRole.ADMIN}
          onValueChange={onSwitchChange}
        />
      </div>
    )
  );
}
