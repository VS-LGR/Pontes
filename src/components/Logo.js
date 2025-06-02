import React from 'react';
import './Logo.css';

export default function Logo() {
  return (
    <div className="logo-container">
      <svg width="100" height="50" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="logo-squiggle">
        <path d="M10 40 Q 30 10, 50 30 T 90 40" stroke="#7BA17B" strokeWidth="3" fill="none" />
      </svg>
      <span className="logo-text">pontes</span>
    </div>
  );
} 