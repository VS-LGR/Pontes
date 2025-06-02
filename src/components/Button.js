import React from 'react';
import './Button.css';

export default function Button({ color, children, bold, ...props }) {
  return (
    <button className={`btn ${color} ${bold ? 'bold' : ''}`} {...props}>
      {children}
    </button>
  );
} 