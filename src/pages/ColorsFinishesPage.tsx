import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ColorsFinishes from '../components/ColorsFinishes';

const ColorsFinishesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Colors & Finishes Gallery | Terra Nuova</title>
        <meta name="description" content="Browse our epoxy and polyurea color options and flake blends. Get inspiration for your perfect NYC floor." />
      </Helmet>
      
      <ColorsFinishes 
        onBack={() => navigate('/')} 
        onContactRedirect={() => navigate('/contact')} 
      />
    </>
  );
};

export default ColorsFinishesPage;