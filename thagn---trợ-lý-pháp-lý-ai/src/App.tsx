import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Chat } from './pages/Chat';
import { Library } from './pages/Library';
import { Drafter } from './pages/Drafter';
import { Experts } from './pages/Experts';
import { Pricing } from './pages/Pricing';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/library" element={<Library />} />
            <Route path="/drafter" element={<Drafter />} />
            <Route path="/experts" element={<Experts />} />
            <Route path="/pricing" element={<Pricing />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
