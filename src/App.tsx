import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Management } from './pages/Management';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gestion" element={<Management />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
