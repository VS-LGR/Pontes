import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Logo from '../components/Logo';
import Input from '../components/Input';
import Button from '../components/Button';
import { campaigns } from '../data/campaigns';
import './Donate.css';

const paymentMethods = [
  { label: 'Pix', icon: <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect x="4" y="11" width="16" height="2" rx="1" fill="#682C3B"/><rect x="11" y="4" width="2" height="16" rx="1" fill="#682C3B"/></svg> },
  { label: 'Boleto', icon: <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect x="4" y="6" width="16" height="16" rx="3" fill="#682C3B" fillOpacity="0.1"/><rect x="7" y="10" width="2" height="6" rx="1" fill="#682C3B"/><rect x="11" y="10" width="2" height="6" rx="1" fill="#682C3B"/><rect x="15" y="10" width="2" height="6" rx="1" fill="#682C3B"/></svg> },
  { label: 'Cartão de Crédito', icon: <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="10" rx="2" fill="#682C3B" fillOpacity="0.1"/><rect x="3" y="10" width="18" height="2" fill="#682C3B"/><rect x="6" y="15" width="3" height="1" rx="0.5" fill="#682C3B"/></svg> },
];

export default function Donate() {
  const { id } = useParams();
  const campaign = campaigns.find(c => c.id === Number(id));
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState(paymentMethods[0].label);

  if (!campaign) {
    return <div className="donate-container"><p>Campanha não encontrada.</p></div>;
  }

  return (
    <div className="donate-container">
      <div className="header-row">
        <Logo />
        <div className="menu-icon">
          <svg width="32" height="32" viewBox="0 0 32 32"><rect y="7" width="32" height="3" rx="1.5" fill="#222"/><rect y="14" width="32" height="3" rx="1.5" fill="#222"/><rect y="21" width="32" height="3" rx="1.5" fill="#222"/></svg>
        </div>
      </div>
      <img src={campaign.image} alt={campaign.name} className="details-img" />
      <div className="details-title-row">
        <div className="details-title">{campaign.name}</div>
        <span className="details-category-icon">{campaign.category.icon}</span>
      </div>
      <div className="details-meta-row">
        <div className="details-meta-col">
          <div className="details-meta-label">Criado por</div>
          <div className="details-institution">
            <span className="details-institution-avatar" />
            <span>{campaign.institution.name}</span>
          </div>
        </div>
        <div className="details-meta-col">
          <div className="details-meta-label">Prazo até</div>
          <div className="details-deadline">
            <span className="details-deadline-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#6B7C6B"><circle cx="12" cy="12" r="10" fill="#E5E5E5"/><path d="M12 7v5l3 3" stroke="#6B7C6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            <span>{new Date(campaign.deadline).toLocaleDateString('pt-BR')}</span>
          </div>
        </div>
      </div>
      <div className="donate-section-title">Informações da doação</div>
      <Input
        placeholder="Valor que quer doar"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        type="number"
        min="1"
        step="0.01"
      />
      <div className="donate-section-title" style={{ marginTop: 18 }}>Método de pagamento:</div>
      <div className="donate-methods">
        {paymentMethods.map(pm => (
          <button
            key={pm.label}
            type="button"
            className={`donate-method-btn${method === pm.label ? ' selected' : ''}`}
            onClick={() => setMethod(pm.label)}
          >
            <span className="donate-method-icon">{pm.icon}</span>
            <span>{pm.label}</span>
          </button>
        ))}
      </div>
      <Button color="green" bold style={{ marginTop: 24 }}>Doar</Button>
    </div>
  );
} 