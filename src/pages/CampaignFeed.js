import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import SideMenu from '../components/SideMenu';
import { campaigns } from '../data/campaigns';
import './CampaignFeed.css';

const categoriesList = [
  { label: 'Educação', icon: '🎓' },
  { label: 'Saúde', icon: '💗' },
  { label: 'Natureza', icon: '🌱' },
  { label: 'Pessoas', icon: '🧑' },
  { label: 'Animais', icon: '🐾' },
  { label: 'Outros', icon: '🔲' },
];

function CategoryFilterBar({ selected, onSelect }) {
  return (
    <div className="category-filter-bar">
      {categoriesList.map((cat) => (
        <button
          key={cat.label}
          className={`category-filter-btn${selected === cat.label ? ' selected' : ''}`}
          onClick={() => onSelect(cat.label)}
        >
          <span className="category-icon">{cat.icon}</span>
          <span>{cat.label}</span>
        </button>
      ))}
    </div>
  );
}

function ProgressBar({ value, max }) {
  const percent = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="progress-bar-bg">
      <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
    </div>
  );
}

function CampaignCard({ campaign }) {
  return (
    <Link to={`/campanha/${campaign.id}`} className="campaign-card-link">
      <div className="campaign-card">
        <img src={campaign.image} alt={campaign.name} className="campaign-img" />
        <div className="campaign-info">
          <div className="campaign-title">{campaign.name}</div>
          <ProgressBar value={campaign.raised} max={campaign.goal} />
          <div className="campaign-amounts">
            <span className="raised">R${campaign.raised.toLocaleString()}</span>
            <span className="goal">meta: R${campaign.goal.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function CampaignFeed() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  // Filter campaigns by category if needed in the future
  return (
    <div className="feed-container">
      <div className="header-row">
        <Logo />
        <div className="menu-icon" onClick={() => setMenuOpen(true)}>
          <svg width="32" height="32" viewBox="0 0 32 32"><rect y="7" width="32" height="3" rx="1.5" fill="#222"/><rect y="14" width="32" height="3" rx="1.5" fill="#222"/><rect y="21" width="32" height="3" rx="1.5" fill="#222"/></svg>
        </div>
      </div>
      <CategoryFilterBar selected={selectedCategory} onSelect={setSelectedCategory} />
      <div className="campaigns-list">
        {campaigns.map((c) => (
          <CampaignCard key={c.id} campaign={c} />
        ))}
      </div>
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} user={{ name: 'Nome completo', role: 'DOADOR' }} currentPage="/feed" />
    </div>
  );
} 