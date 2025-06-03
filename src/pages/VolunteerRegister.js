import React, { useState } from 'react';
import Logo from '../components/Logo';
import Input from '../components/Input';
import Button from '../components/Button';
import SideMenu from '../components/SideMenu';
import { registerUser } from '../utils/userStorage';
import { useNavigate } from 'react-router-dom';
import './VolunteerRegister.css';

const categoriesList = [
  { label: 'Educação', icon: '🎓' },
  { label: 'Saúde', icon: '💗' },
  { label: 'Natureza', icon: '🌱' },
  { label: 'Pessoas', icon: '🧑' },
  { label: 'Animais', icon: '🐾' },
  { label: 'Outros', icon: '🔲' },
];

function CategorySelector({ selected, onSelect }) {
  return (
    <div className="categories-grid">
      {categoriesList.map((cat) => (
        <button
          type="button"
          key={cat.label}
          className={`category-btn${selected.includes(cat.label) ? ' selected' : ''}`}
          onClick={() => onSelect(cat.label)}
        >
          <span className="category-icon">{cat.icon}</span>
          <span>{cat.label}</span>
        </button>
      ))}
    </div>
  );
}

export default function VolunteerRegister() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [about, setAbout] = useState('');
  const [error, setError] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleCategory = (cat) => {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    try {
      registerUser({
        name,
        cpf,
        email,
        password,
        about,
        categories,
        type: 'volunteer',
      });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="vol-register-container">
      <div className="header-row">
        <Logo />
        <div className="menu-icon" onClick={() => setMenuOpen(true)}>
          <svg width="32" height="32" viewBox="0 0 32 32"><rect y="7" width="32" height="3" rx="1.5" fill="#222"/><rect y="14" width="32" height="3" rx="1.5" fill="#222"/><rect y="21" width="32" height="3" rx="1.5" fill="#222"/></svg>
        </div>
      </div>
      <form className="vol-register-form" onSubmit={handleSubmit}>
        <div className="photo-upload">
          <div className="photo-circle">
            <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="#7A8578"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 17a5 5 0 100-10 5 5 0 000 10zm0 0v2m0-2a7 7 0 01-7-7m7 7a7 7 0 007-7" /></svg>
          </div>
        </div>
        <div className="section-title">Dados pessoais</div>
        <Input placeholder="Nome completo" value={name} onChange={e => setName(e.target.value)} />
        <Input placeholder="CPF" value={cpf} onChange={e => setCpf(e.target.value)} />
        <Input placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
        <Input placeholder="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <textarea className="custom-textarea" placeholder="Conte mais sobre você" rows={3} value={about} onChange={e => setAbout(e.target.value)} />
        <div className="section-title">Categorias que te interessam</div>
        <CategorySelector selected={categories} onSelect={handleCategory} />
        {error && <div className="register-error">{error}</div>}
        {success && <div className="register-success">Conta criada com sucesso! Redirecionando para login...</div>}
        <Button color="yellow" bold type="submit" disabled={success}>Salvar</Button>
      </form>
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} user={{ name, role: 'DOADOR' }} currentPage="/voluntario" />
    </div>
  );
} 