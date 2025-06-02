import React from 'react';
import Logo from '../components/Logo';
import SideMenu from '../components/SideMenu';
import './Account.css';

const user = {
  name: 'Nome completo',
  email: 'Email',
  categories: [
    { label: 'Animais', icon: '🐾' },
    { label: 'Saúde', icon: '💗' },
  ],
  cpf: 'CPF',
  password: 'Senha',
  paymentMethods: ['Pix', 'Cartão de Crédito'],
  donations: [
    {
      id: 1,
      name: 'Nome da campanha',
      date: '2025-06-15',
      amount: 1540,
      image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80',
    },
  ],
};

export default function Account() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  return (
    <div className="account-container">
      <div className="header-row">
        <Logo />
        <div className="menu-icon" onClick={() => setMenuOpen(true)}>
          <svg width="32" height="32" viewBox="0 0 32 32"><rect y="7" width="32" height="3" rx="1.5" fill="#222"/><rect y="14" width="32" height="3" rx="1.5" fill="#222"/><rect y="21" width="32" height="3" rx="1.5" fill="#222"/></svg>
        </div>
      </div>
      <div className="account-profile-row">
        <div className="account-avatar-block">
          <span className="account-avatar" />
          <div className="account-profile-info">
            <div className="account-name">{user.name}</div>
            <div className="account-email">{user.email}</div>
          </div>
        </div>
        <button className="account-edit-btn">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M16.862 5.487a2.07 2.07 0 0 1 2.93 2.93l-9.5 9.5-3.5.5.5-3.5 9.5-9.5Z" stroke="#7BA17B" strokeWidth="2" strokeLinejoin="round"/></svg>
        </button>
      </div>
      <div className="account-section-title">Categorias que se interessa</div>
      <div className="account-categories">
        {user.categories.map(cat => (
          <div className="account-category" key={cat.label}>
            <span className="category-icon">{cat.icon}</span>
            <span>{cat.label}</span>
          </div>
        ))}
      </div>
      <div className="account-section-box">
        <div className="account-section-title">Dados cadastrais</div>
        <div className="account-data-list">
          <div>Nome</div>
          <div>Email</div>
          <div>CPF</div>
          <div>Senha</div>
        </div>
        <div className="account-payment-methods">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="10" rx="2" stroke="#222" strokeWidth="2"/><rect x="3" y="10" width="18" height="2" fill="#222"/><rect x="6" y="15" width="3" height="1" rx="0.5" fill="#222"/></svg>
          <span className="account-payment-methods-label"><i>Métodos de pagamento</i></span>
        </div>
      </div>
      <div className="account-section-box">
        <div className="account-section-title">Campanhas que doou</div>
        {user.donations.map(d => (
          <div className="account-donation-card" key={d.id}>
            <img src={d.image} alt={d.name} className="account-donation-img" />
            <div className="account-donation-info">
              <div className="account-donation-name">{d.name}</div>
              <div className="account-donation-meta">{new Date(d.date).toLocaleDateString('pt-BR')} &nbsp; R${d.amount.toLocaleString()} até agora</div>
            </div>
          </div>
        ))}
      </div>
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} user={user} currentPage="/conta" />
    </div>
  );
} 