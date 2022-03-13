import React, { useState, useEffect } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useAuth } from '../contexts/AuthProvider';
import { useLocation, Navigate } from 'react-router-dom';

const defaultSignInData = {
  username: '',
  password: '',
}

const defaultSignUpData = {
  username: '',
  password: '',
  confirmPassword: '',
  bank: '',
  phone: '',
};

const Login = () => {
  const auth = useAuth();
  const location = useLocation();

  const [login, setLogin] = useState(true);

  const [signInData, setSignInData] = useState(defaultSignInData)

  const [signUpData, setSignUpData] = useState(defaultSignUpData);

  useEffect(() => {
    const tokenCookie = document.cookie.split(';').find((item) => item.trim().startsWith(`token=`))?.trim();
    if (tokenCookie?.length) {
      auth.signinToken(tokenCookie.replace('token=', ''));
    }
  }, []);

  const handleSignUp = (evt: any) => {
    evt.preventDefault();
    fetch(`${process.env.REACT_APP_SERVER_API}/api/v1/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: signUpData.username,
        password: signUpData.password,
        bank: signUpData.bank,
        phone: signUpData.phone,
      })
    }).then(res => {
      if (res.ok) {
        setLogin(true);
        setSignInData({
          username: signUpData.username,
          password: signUpData.password,
        });
        setSignUpData(defaultSignUpData);
      }
    });
  }

  const handleSignIn = (evt: any) => {
    evt.preventDefault();
    auth.signin(signInData);
  }

  const handleChange = (evt: any) => {
    if (login) {
      setSignInData({
        ...signInData,
        [evt.target.id]: evt.target.value,
      })
    }
    else {
      setSignUpData({
        ...signUpData,
        [evt.target.id]: evt.target.value,
      });
    }
  }

  if (auth.user) return <Navigate to="/" state={{ from: location }} replace />;

  return (
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} onChange={handleChange} onSubmit={login ? handleSignIn : handleSignUp}>
      {login ? (
        <>
          <TextField
            required
            label={"Pseudo"}
            id={"username"}
            sx={{ margin: '10px 0' }}
            value={signInData.username}
          />
          <TextField
            required
            type={"password"}
            id={"password"}
            label={"Mot de passe"}
            sx={{ margin: '10px 0' }}
            value={signInData.password}
          />
          <Button variant={"contained"} color={"success"} type={"submit"}>Se connecter</Button>
          <Button size={"small"} onClick={() => setLogin(false)}>Inscription</Button>
        </>
      ) : (
        <>
          <TextField
            required
            label={"Pseudo"}
            id={"username"}
            sx={{ margin: '10px 0' }}
            value={signUpData.username}
          />
          <TextField
            required
            type={"password"}
            id={"password"}
            label={"Mot de passe"}
            sx={{ margin: '10px 0' }}
            value={signUpData.password}
          />
          <TextField
            required
            type={"password"}
            id={"confirmPassword"}
            label={"Confirmation du mot de passe"}
            sx={{ margin: '10px 0' }}
            value={signUpData.confirmPassword}
          />
          <TextField
            required
            label={"Numéro de compte bancaire"}
            id={"bank"}
            sx={{ margin: '10px 0' }}
            value={signUpData.bank}
          />
          <TextField
            required
            label={"Numéro de téléphone"}
            id={"phone"}
            sx={{ margin: '10px 0' }}
            value={signUpData.phone}
          />
          <Button variant={"contained"} color={"success"} type={"submit"}>S'inscrire</Button>
          <Button size={"small"} onClick={() => setLogin(true)}>Connexion</Button>
        </>
      )}

    </Box>
  )
}

export default Login;
