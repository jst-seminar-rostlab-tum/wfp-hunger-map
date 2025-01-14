import cookies from 'js-cookie';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { UserRole } from '../enums/UserRole';

interface UserRoleState {
  userRole: UserRole;
  setUserRole: (newRole: UserRole) => void;
}

/**
 * React context that manages the role of the current user. Defaults to restrictedUser or whatever is stored in the 'userRole' cookie
 * Should be updated to store the JWT once proper authentication is implemented
 */
const UserRoleContext = createContext<UserRoleState>({
  userRole: UserRole.RESTRICTED_USER,
  setUserRole: () => {},
});

export function UserRoleProvider({ children }: { children: React.ReactNode }) {
  const [userRole, setUserRole] = useState<UserRole>(UserRole.RESTRICTED_USER);

  const onUserRoleChange = (newRole: UserRole) => {
    // TODO: store JWT instead of role
    cookies.set('userRole', newRole);
    setUserRole(newRole);
  };

  useEffect(() => {
    const storedRole = cookies.get('userRole');
    if (storedRole) {
      setUserRole(storedRole as UserRole);
    }
  }, []);

  const value = useMemo(
    () => ({
      userRole,
      setUserRole: onUserRoleChange,
    }),
    [userRole]
  );

  return <UserRoleContext.Provider value={value}>{children}</UserRoleContext.Provider>;
}

export function useUserRole() {
  const context = useContext(UserRoleContext);
  if (!context) {
    throw new Error('useUserRole must be used within a UserRoleContextProvider');
  }
  return context;
}
