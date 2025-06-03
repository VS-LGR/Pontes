import React, { useState } from 'react';
import Logo from '../components/Logo';
import Input from '../components/Input';
import Button from '../components/Button';
import SideMenu from '../components/SideMenu';
import { registerUser } from '../utils/userStorage';
import { useNavigate } from 'react-router-dom';
import './InstitutionRegister.css';

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

export default function InstitutionRegister() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [cityState, setCityState] = useState('');
  const [address, setAddress] = useState('');
  const [about, setAbout] = useState('');
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPhone, setAdminPhone] = useState('');
  const [adminCpf, setAdminCpf] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
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
        cnpj,
        cityState,
        address,
        about,
        categories,
        adminName,
        adminEmail,
        adminPhone,
        adminCpf,
        password,
        type: 'institution',
      });
      navigate('/feed');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="inst-register-container">
      <div className="header-row">
        <Logo />
        <div className="menu-icon" onClick={() => setMenuOpen(true)}>
          <svg width="32" height="32" viewBox="0 0 32 32"><rect y="7" width="32" height="3" rx="1.5" fill="#222"/><rect y="14" width="32" height="3" rx="1.5" fill="#222"/><rect y="21" width="32" height="3" rx="1.5" fill="#222"/></svg>
        </div>
      </div>
      <form className="inst-register-form" onSubmit={handleSubmit}>
        <div className="photo-upload">
          <div className="photo-circle">
            <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="#7BA17B"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 17a5 5 0 100-10 5 5 0 000 10zm0 0v2m0-2a7 7 0 01-7-7m7 7a7 7 0 007-7" /></svg>
          </div>
        </div>
        <div className="section-title">Dados da Instituição</div>
        <Input placeholder="Digite o nome da Instituição" value={name} onChange={e => setName(e.target.value)} />
        <Input placeholder="CNPJ (se tiver)" value={cnpj} onChange={e => setCnpj(e.target.value)} />
        <Input placeholder="Cidade e Estado" value={cityState} onChange={e => setCityState(e.target.value)} />
        <Input placeholder="Endereço" value={address} onChange={e => setAddress(e.target.value)} />
        <textarea className="custom-textarea" placeholder="Conte um pouco sobre sua instituição" rows={3} value={about} onChange={e => setAbout(e.target.value)} />
        <div className="section-title">Categorias que atende</div>
        <CategorySelector selected={categories} onSelect={handleCategory} />
        <div className="section-title">Dados do administrador</div>
        <Input placeholder="Nome completo" value={adminName} onChange={e => setAdminName(e.target.value)} />
        <Input placeholder="Email" value={adminEmail} onChange={e => setAdminEmail(e.target.value)} />
        <Input placeholder="Telefone" value={adminPhone} onChange={e => setAdminPhone(e.target.value)} />
        <Input placeholder="CPF" value={adminCpf} onChange={e => setAdminCpf(e.target.value)} />
        <Input placeholder="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <div className="register-error">{error}</div>}
        <Button color="yellow" bold type="submit">Salvar</Button>
      </form>
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} user={{ name, role: 'INSTITUIÇÃO' }} currentPage="/instituicao" />
    </div>
  );
} 