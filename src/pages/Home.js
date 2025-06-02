import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Button from '../components/Button';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <Logo />
      <p className="subtitle">
        Crie campanhas ou dê sua ajuda.<br />
        <span className="bold">Crie pontes!</span>
      </p>
      <div className="buttons">
        <Button color="burgundy" onClick={() => navigate('/instituicao')}>Criar conta - instituição</Button>
        <Button color="rose" onClick={() => navigate('/voluntario')}>Criar conta - voluntário</Button>
        <Button color="yellow" bold onClick={() => navigate('/login')}>Login</Button>
      </div>
    </div>
  );
} 