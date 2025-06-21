import React from 'react';
import { useNavigate } from 'react-router-dom';
import ColorsFinishes from '../components/ColorsFinishes';

const ColorsFinishesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ColorsFinishes 
      onBack={() => navigate('/')} 
      onContactRedirect={() => navigate('/contact')} 
    />
  );
};

export default ColorsFinishesPage;