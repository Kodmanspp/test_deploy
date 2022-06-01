import React, { useContext, useState } from 'react';
import { Grid } from '@mui/material';
import firebase from 'firebase/app';
import { UIContext } from '../../Unknown/UIContext';
import logo from '../../../assets/auth/logo.svg';
import SignInForm from '../SignInForm';
import { SignInTypes } from '../SignInForm/types';
import 'firebase/auth';
import './style.css';

const SignInScreen: React.FC = () => {
  const { setAlert, setUser } = useContext(UIContext);
  const [loading, setLoading] = useState(false);
  // I didn’t quite understand how there can be a login without registration, so this form creates new users
  async function handleSubmitChange(values: SignInTypes) {
    setLoading(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then((userCredential) => {
        setUser({ ...userCredential.user?.providerData[0] });
      })
      .catch((error) => {
        setAlert({
          show: true,
          severity: 'error',
          message: error.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <>
      <Grid container>
        <Grid className="sign-in-bg" item xs={6} />
        <Grid className="sign-in-container" item xs={6}>
          <img src={logo} alt="logo" />
          <h2>Login</h2>
          <SignInForm
            handleSubmitChange={handleSubmitChange}
            loading={loading}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default SignInScreen;
