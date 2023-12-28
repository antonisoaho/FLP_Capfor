import { atom } from 'recoil';

export const userRoleState = atom({
  key: 'userRole',
  default: { loggedIn: false, isAdmin: false },
});

export const snackbarState = atom({
  key: 'snackbarState',
  default: {
    open: false,
    message: '',
    severity: 'info',
  },
});
