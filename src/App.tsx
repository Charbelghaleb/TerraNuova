import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChipSystemPage from './pages/services/ChipSystemPage';
import QuartzSystemPage from './pages/services/QuartzSystemPage';
import MetallicSystemPage from './pages/services/MetallicSystemPage';
import SolidColorPolyureaPage from './pages/services/SolidColorPolyureaPage';
import SolidColorEpoxyPage from './pages/services/SolidColorEpoxyPage';
import PolyureaShopFloorSystemPage from './pages/services/PolyureaShopFloorSystemPage';
import FormcoveSystemPage from './pages/services/FormcoveSystemPage';
import ColorsFinishesPage from './pages/ColorsFinishesPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services/chip-system" element={<ChipSystemPage />} />
      <Route path="/services/quartz-system" element={<QuartzSystemPage />} />
      <Route path="/services/metallic-system" element={<MetallicSystemPage />} />
      <Route path="/services/solid-color-polyurea" element={<SolidColorPolyureaPage />} />
      <Route path="/services/solid-color-epoxy" element={<SolidColorEpoxyPage />} />
      <Route path="/services/polyurea-shop-floor-system" element={<PolyureaShopFloorSystemPage />} />
      <Route path="/services/formcove-system" element={<FormcoveSystemPage />} />
      <Route path="/colors-finishes" element={<ColorsFinishesPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
}

export default App;