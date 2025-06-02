import React, { useState } from 'react';
import Logo from '../components/Logo';
import Input from '../components/Input';
import Button from '../components/Button';
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
  const handleCategory = (cat) => {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="vol-register-container">
      <div className="header-row">
        <Logo />
        <div className="menu-icon">
          <svg width="32" height="32" viewBox="0 0 32 32"><rect y="7" width="32" height="3" rx="1.5" fill="#222"/><rect y="14" width="32" height="3" rx="1.5" fill="#222"/><rect y="21" width="32" height="3" rx="1.5" fill="#222"/></svg>
        </div>
      </div>
      <form className="vol-register-form">
        <div className="photo-upload">
          <div className="photo-circle">
            <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="#7A8578"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 17a5 5 0 100-10 5 5 0 000 10zm0 0v2m0-2a7 7 0 01-7-7m7 7a7 7 0 007-7" /></svg>
          </div>
        </div>
        <div className="section-title">Dados pessoais</div>
        <Input placeholder="Nome completo" />
        <Input placeholder="CPF" />
        <Input placeholder="E-mail" />
        <Input placeholder="Senha" type="password" />
        <textarea className="custom-textarea" placeholder="Conte mais sobre você" rows={3} />
        <div className="section-title">Categorias que te interessam</div>
        <CategorySelector selected={categories} onSelect={handleCategory} />
        <Button color="yellow" bold type="submit">Salvar</Button>
      </form>
    </div>
  );
} 