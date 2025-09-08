import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import HowWereDifferent from './pages/HowWereDifferent';
import OurSolutions from './pages/OurSolutions';
import MaterialsQuality from './pages/MaterialsQuality';
import SturijProcess from './pages/SturijProcess';
import KnowledgeCentre from './pages/KnowledgeCentre';
import About from './pages/About';
import BookAppointment from './pages/BookAppointment';
import Contact from './pages/Contact';
import './globals.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/how-were-different" element={<HowWereDifferent />} />
            <Route path="/our-solutions" element={<OurSolutions />} />
            <Route path="/materials-quality" element={<MaterialsQuality />} />
            <Route path="/sturij-process" element={<SturijProcess />} />
            <Route path="/knowledge-centre" element={<KnowledgeCentre />} />
            <Route path="/about" element={<About />} />
            <Route path="/book-appointment" element={<BookAppointment />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;