import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Input from '../components/Input';
import Button from '../components/Button';
import SideMenu from '../components/SideMenu';
import { getCurrentUser } from '../utils/userStorage';
import './CreateCampaign.css';

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

export default function CreateCampaign() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const u = getCurrentUser();
    if (!u) {
      navigate('/login');
    } else {
      setUser(u);
    }
  }, [navigate]);

  if (!user) return null;

  const handleCategory = (cat) => {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="create-campaign-container">
      <div className="header-row">
        <Logo />
        <div className="menu-icon" onClick={() => setMenuOpen(true)}>
          <svg width="32" height="32" viewBox="0 0 32 32"><rect y="7" width="32" height="3" rx="1.5" fill="#222"/><rect y="14" width="32" height="3" rx="1.5" fill="#222"/><rect y="21" width="32" height="3" rx="1.5" fill="#222"/></svg>
        </div>
      </div>
      <form className="create-campaign-form">
        <div className="create-campaign-photo-upload">
          <div className="create-campaign-photo-box">
            <svg width="56" height="56" fill="none" viewBox="0 0 24 24" stroke="#7A8578"><rect x="3" y="7" width="18" height="14" rx="2" stroke="#7A8578" strokeWidth="2"/><circle cx="12" cy="14" r="3" stroke="#7A8578" strokeWidth="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="#7A8578" strokeWidth="2"/></svg>
          </div>
        </div>
        <div className="section-title">Dados da Campanha</div>
        <Input placeholder="Nome da Campanha" />
        <textarea className="custom-textarea" placeholder="Conte mais sobre sua campanha" rows={3} />
        <Input placeholder="Até quando quer arrecadar?" type="date" />
        <div className="section-title">Se você quer arrecadar dinheiro:</div>
        <Input placeholder="Quanto você precisa arrecadar?" type="number" min="1" />
        <div className="section-title">Categorias que atende</div>
        <CategorySelector selected={categories} onSelect={handleCategory} />
        <div className="section-title">Dados para recebimento</div>
        <Input placeholder="Banco" />
        <Input placeholder="Agência" />
        <Input placeholder="Conta" />
        <Input placeholder="CPF/CNPJ" />
        <Button color="green" bold type="submit">Publicar</Button>
      </form>
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} user={user} currentPage="/campanha/nova" />
    </div>
  );
} 