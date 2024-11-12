import { createContext, FC, useContext } from "react";
import jwtDecode from "jwt-decode";
import { getToken } from "@/pages/api/httpClient";
import { Permission } from "@/utils/permissions";

interface Token {
  permissions: Permission[];
}

export interface PermissionContextValue {
  hasPermission(...permissions: Permission[]): boolean;
}

const PermissionContext = createContext<PermissionContextValue | any>(null);

export const PermissionProvider: FC = ({ children }: any) => {
  function getPermission() {
    if (!!getToken()) {
      const token: Token = jwtDecode(getToken()!);
      return (token && token.permissions) || [];
    }
    return [];
  }

  const values: PermissionContextValue = {
    hasPermission(...permissions: Permission[]) {
      const userPermissions = getPermission();
      return permissions.some((permission) =>
        [...userPermissions].filter((e) => e).includes(permission)
      );
    },
  };

  return (
    <PermissionContext.Provider value={values}>
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermission = (): PermissionContextValue => {
  return useContext(PermissionContext);
};
