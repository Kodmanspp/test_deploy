import React, { useState } from 'react';
import {
  OutlinedInput,
  Button,
  InputAdornment,
  IconButton,
  InputLabel,
  FormControl,
  TextField,
} from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import * as yup from 'yup';
import { Formik } from 'formik';
import './style.css';
import { SignInProps, SignInTypes } from './types';

const SignInform: React.FC<SignInProps> = ({ handleSubmitChange, loading }) => {
  const validation = yup.object().shape({
    email: yup.string().required('Required').email('Invalid email format'),
    password: yup
      .string()
      .required('Required')
      .min(8, 'minimum 8 chars')
      .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  });
  const [passwordShow, setPasswordShow] = useState(false);
  function handleShowChange() {
    setPasswordShow(!passwordShow);
  }

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validateOnBlur
        onSubmit={(values: SignInTypes) => handleSubmitChange(values)}
        validationSchema={validation}
      >
        {({ handleSubmit, values, errors, handleChange }) => (
          <form className="sign-in-form" onSubmit={handleSubmit}>
            <div>
              <TextField
                autoComplete="off"
                className="sign-in-input"
                value={values.email}
                onChange={handleChange}
                name="email"
                label="email"
              />
              {errors.email && <p className="sign-in-error">{errors.email}</p>}
            </div>
            <div>
              <FormControl className="sign-in-input" variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  name="password"
                  autoComplete="off"
                  type={passwordShow ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleShowChange}
                        edge="end"
                      >
                        {passwordShow ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              {errors.password && (
                <p className="sign-in-error">{errors.password}</p>
              )}
            </div>
            <Button
              variant="contained"
              className="sign-in-btn"
              disabled={loading}
              type="submit"
              sx={{
                background: '#F50057',
                height: '42px',
              }}
            >
              Login
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default SignInform;
