/**
 * Package import
 */
import React, { useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { InputField, Button } from '@oclock/crumble';

/**
 * Local import
 */
import { useAuth } from '../contexts/AuthProvider';
import logo from '../logo.png';

// style
import * as S from './style';

/**
 * Data
 */
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

/**
 * Component
 */
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

  const handleChange = (id: string) => (evt: any) => {
    if (login) {
      setSignInData({
        ...signInData,
        [id]: evt.target.value,
      })
    }
    else {
      setSignUpData({
        ...signUpData,
        [id]: evt.target.value,
      });
    }
  }

  if (auth.user) return <Navigate to="/" state={{ from: location }} replace />;

  if (login) {
    return (
        <S.Container>
          <S.Logo src={logo} />
          <S.Form onSubmit={handleSignIn}>
            <S.Title>Connexion</S.Title>
            <S.Inputs>
              <InputField placeholder={"Martine Hawley"} label={"Prénom Nom"} type={"text"} onChange={handleChange('username')} value={signInData.username} />
              <InputField placeholder={"**********"} label={"Mot de passe"} type={"password"} onChange={handleChange('password')} value={signInData.password} />
            </S.Inputs>
            <S.Buttons>
              <Button type={"submit"} onClick={handleSignIn}>Se connecter</Button>
              <Button onClick={() => setLogin(false)} variant={"text"}>S'inscrire</Button>
            </S.Buttons>
          </S.Form>
        </S.Container>
    )
  }
  else {
    return (
        <S.Container>
          <S.Logo src={logo} />
          <S.Form>
            <S.Title>Inscription</S.Title>
            <S.Inputs>
              <InputField placeholder={"Martine Hawley"} label={"Prénom Nom"} type={"text"} onChange={handleChange('username')} value={signUpData.username} />
              <InputField placeholder={"**********"} label={"Mot de passe"} type={"password"} onChange={handleChange('password')} value={signUpData.password} />
              <InputField placeholder={"**********"} label={"Confirmation du mot de passe"} type={"password"} onChange={handleChange('confirmPassword')} value={signUpData.confirmPassword} />
              <InputField placeholder={"XXX-XXXXXX-XX"} label={"Numéro de compte bancaire"} type={"text"} onChange={handleChange('bank')} value={signUpData.bank} />
              <InputField placeholder={"555-XXXXXX"} label={"Numéro de téléphone"} type={"text"} onChange={handleChange('phone')} value={signUpData.phone} />
            </S.Inputs>
            <S.Buttons>
              <Button onClick={handleSignUp}>S'inscrire</Button>
              <Button onClick={() => setLogin(true)} variant={"text"}>Se connecter</Button>
            </S.Buttons>
          </S.Form>
        </S.Container>
    )
  }
}

export default Login;
