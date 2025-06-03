import React from 'react';
import './CategoryFilterBar.css';

const categoriesList = [
  { label: 'Educação', icon: '🎓' },
  { label: 'Saúde', icon: '💗' },
  { label: 'Natureza', icon: '🌱' },
  { label: 'Pessoas', icon: '🧑' },
  { label: 'Animais', icon: '🐾' },
  { label: 'Outros', icon: '🔲' },
];

export default function CategoryFilterBar({ selected, onSelect }) {
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