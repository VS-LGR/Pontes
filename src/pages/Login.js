import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Input from '../components/Input';
import Button from '../components/Button';
import { loginUser } from '../utils/userStorage';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    try {
      loginUser(email, password);
      navigate('/feed');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <Logo />
      <p className="subtitle">
        Crie campanhas ou dê sua ajuda.<br />
        <span className="bold">Crie pontes!</span>
      </p>
      <form className="login-form" onSubmit={handleSubmit}>
        <Input type="email" placeholder="E-mail" autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} />
        <Input type="password" placeholder="Senha" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <div className="register-error">{error}</div>}
        <Button color="yellow" bold type="submit">Acessar</Button>
      </form>
    </div>
  );
} 