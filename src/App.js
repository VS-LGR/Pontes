import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import InstitutionRegister from './pages/InstitutionRegister';
import VolunteerRegister from './pages/VolunteerRegister';
import CampaignFeed from './pages/CampaignFeed';
import CampaignDetails from './pages/CampaignDetails';
import Donate from './pages/Donate';
import Account from './pages/Account';
import CreateCampaign from './pages/CreateCampaign';
import InstitutionProfile from './pages/InstitutionProfile';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/instituicao" element={<InstitutionRegister />} />
        <Route path="/voluntario" element={<VolunteerRegister />} />
        <Route path="/feed" element={<CampaignFeed />} />
        <Route path="/campanha/:id" element={<CampaignDetails />} />
        <Route path="/campanha/:id/doar" element={<Donate />} />
        <Route path="/conta" element={<Account />} />
        <Route path="/campanha/nova" element={<CreateCampaign />} />
        <Route path="/instituicao/perfil" element={<InstitutionProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
