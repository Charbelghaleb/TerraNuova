import React from 'react';
import { useNavigate } from 'react-router-dom';
import ContactForm from '../components/ContactForm';

const ContactPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ContactForm onBack={() => navigate('/')} />
  );
};

export default ContactPage;