import React, { createContext, useState } from 'react';
import MuiAlert, { AlertColor } from '@mui/lab/Alert';
import { Snackbar } from '@mui/material';

export const UIContext = createContext<UIContextProps>({} as UIContextProps);

interface UIContextProps {
  setAlert: React.Dispatch<React.SetStateAction<AlertProps>>;
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
}

interface AlertProps {
  show: boolean;
  severity?: AlertColor;
  message?: string;
}

interface IUser {
  displayName?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  photoURL?: string | null;
  providerId?: string | null;
  uid?: string | null;
}

export const UIContextProvider: React.FC = ({ children }) => {
  const [alert, setAlert] = useState<AlertProps>({
    show: false,
    severity: 'info',
    message: '',
  });
  const [user, setUser] = useState<IUser>({
    displayName: null,
    email: '',
    phoneNumber: '',
    photoURL: '',
    providerId: '',
    uid: '',
  });
  const handleClose = () =>
    setAlert({
      show: false,
    });

  return (
    <UIContext.Provider value={{ setAlert, user, setUser }}>
      {children}
      <Snackbar open={alert.show} autoHideDuration={4000} onClose={handleClose}>
        <MuiAlert elevation={6} variant="filled" severity={alert.severity}>
          {alert.message}
        </MuiAlert>
      </Snackbar>
    </UIContext.Provider>
  );
};
