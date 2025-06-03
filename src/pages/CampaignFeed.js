import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import SideMenu from '../components/SideMenu';
import { getCurrentUser } from '../utils/userStorage';
import CategoryFilterBar from '../components/CategoryFilterBar';
import CampaignCard from '../components/CampaignCard';
import { campaigns } from '../data/campaigns';
import './CampaignFeed.css';

function ProgressBar({ value, max }) {
  const percent = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="progress-bar-bg">
      <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
    </div>
  );
}

export default function CampaignFeed() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
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
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} user={user} currentPage="/feed" />
    </div>
  );
} 