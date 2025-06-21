import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ContactForm from '../components/ContactForm';

const ContactPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Contact Terra Nuova | NYC Floor Coatings</title>
        <meta name="description" content="Get in touch for a free estimate or consultation. Serving all of New York City with epoxy and polyurea flooring." />
      </Helmet>
      
      <ContactForm onBack={() => navigate('/')} />
    </>
  );
};

export default ContactPage;