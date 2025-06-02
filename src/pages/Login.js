import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Input from '../components/Input';
import Button from '../components/Button';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate successful login as volunteer
    navigate('/feed');
  };
  return (
    <div className="login-container">
      <Logo />
      <p className="subtitle">
        Crie campanhas ou dê sua ajuda.<br />
        <span className="bold">Crie pontes!</span>
      </p>
      <form className="login-form" onSubmit={handleSubmit}>
        <Input type="email" placeholder="E-mail" autoComplete="username" />
        <Input type="password" placeholder="Senha" autoComplete="current-password" />
        <Button color="yellow" bold type="submit">Acessar</Button>
      </form>
    </div>
  );
} 