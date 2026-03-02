import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { HowToDonatePage } from './pages/HowToDonatePage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#fafbfc]">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/how-to-donate" element={<HowToDonatePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
