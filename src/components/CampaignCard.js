import React from 'react';
import { Link } from 'react-router-dom';
import './CampaignCard.css';

function ProgressBar({ value, max }) {
  const percent = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="progress-bar-bg">
      <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
    </div>
  );
}

export default function CampaignCard({ campaign }) {
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