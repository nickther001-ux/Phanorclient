import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PhanorAI from './components/PhanorAI';

import Home from './pages/Home';
import Shop from './pages/Shop';
import BookHonors from './pages/BookHonors';
import Logistics from './pages/Logistics';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-onyx font-body flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/book-honors" element={<BookHonors />} />
            <Route path="/logistics" element={<Logistics />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
        <PhanorAI />
      </div>
    </BrowserRouter>
  );
}

export default App;
