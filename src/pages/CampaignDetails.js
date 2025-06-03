import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Button from '../components/Button';
import SideMenu from '../components/SideMenu';
import { getCurrentUser } from '../utils/userStorage';
import { campaigns } from '../data/campaigns';
import './CampaignDetails.css';

function ProgressBar({ value, max }) {
  const percent = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="progress-bar-bg details">
      <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
    </div>
  );
}

export default function CampaignDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const campaign = campaigns.find(c => c.id === Number(id));

  useEffect(() => {
    const u = getCurrentUser();
    if (!u) {
      navigate('/login');
    } else {
      setUser(u);
    }
  }, [navigate]);

  if (!user) return null;
  if (!campaign) {
    return <div className="campaign-details-container"><p>Campanha não encontrada.</p></div>;
  }

  return (
    <div className="campaign-details-container">
      <div className="header-row">
        <Logo />
        <div className="menu-icon" onClick={() => setMenuOpen(true)}>
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
      <div className="details-progress-box">
        <div className="details-amounts">
          <span className="raised">R${campaign.raised.toLocaleString()}</span>
          <span className="goal">meta: R${campaign.goal.toLocaleString()}</span>
        </div>
        <ProgressBar value={campaign.raised} max={campaign.goal} />
      </div>
      <div className="details-description">
        <div className="desc-title">Descrição</div>
        <div className="desc-text">{campaign.description}</div>
      </div>
      <Button color="green" bold style={{ marginTop: 24 }} onClick={() => navigate(`/campanha/${campaign.id}/doar`)}>Doar</Button>
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} user={user} currentPage={`/campanha/${id}`} />
    </div>
  );
} 