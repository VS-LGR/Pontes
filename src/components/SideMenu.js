import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../utils/userStorage';
import './SideMenu.css';

const menuItems = [
  { label: 'Página inicial', icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M3 10.5L12 4l9 6.5V20a1 1 0 0 1-1 1h-5v-5h-6v5H4a1 1 0 0 1-1-1V10.5z" stroke="#222" strokeWidth="2" strokeLinejoin="round"/></svg>, route: '/feed' },
  { label: 'Criar campanha', icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#222" strokeWidth="2"/><path d="M12 8v8M8 12h8" stroke="#222" strokeWidth="2" strokeLinecap="round"/></svg>, route: '/campanha/nova' },
  { label: 'Minhas campanhas', icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="4" y="7" width="16" height="13" rx="2" stroke="#222" strokeWidth="2"/><path d="M8 3h8v4H8V3z" stroke="#222" strokeWidth="2"/></svg>, route: '/campanhas' },
  { label: 'Minha conta', icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke="#222" strokeWidth="2"/><path d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4" stroke="#222" strokeWidth="2"/></svg>, route: '/conta' },
];

export default function SideMenu({ open, onClose, user, currentPage }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    logoutUser();
    onClose();
    navigate('/login');
  };
  return (
    <>
      <div className={`side-menu-overlay${open ? ' open' : ''}`} onClick={onClose} />
      <aside className={`side-menu${open ? ' open' : ''}`}>
        <div className="side-menu-user">
          <span className="side-menu-avatar" />
          <div>
            <div className="side-menu-user-name">{user?.name || 'Nome completo'}</div>
            <div className="side-menu-user-role">{user?.role || 'DOADOR'}</div>
          </div>
        </div>
        <nav className="side-menu-nav">
          {menuItems.map(item => (
            <button
              key={item.label}
              className={`side-menu-link${currentPage === item.route ? ' active' : ''}`}
              onClick={() => { navigate(item.route); onClose(); }}
            >
              <span className="side-menu-link-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <button className="side-menu-logout" onClick={handleLogout}>
          <span className="side-menu-logout-icon">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M16 17l5-5-5-5M21 12H9" stroke="#B07A8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="3" y="4" width="6" height="16" rx="2" stroke="#B07A8C" strokeWidth="2"/></svg>
          </span>
          <span>Sair</span>
        </button>
      </aside>
    </>
  );
} 