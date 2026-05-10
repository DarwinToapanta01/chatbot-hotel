// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Management } from './pages/Management';
import { ChatWidget } from './components/chatbot/ChatWidget';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gestion" element={<Management />} />
      </Routes>

      {/* ChatWidget vive fuera de las rutas para persistir en todas las páginas */}
      <ChatWidget />
    </BrowserRouter>
  );
}

export default App;
