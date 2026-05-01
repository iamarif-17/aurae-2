import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar    from './components/Navbar';
import Landing   from './pages/Landing';
import Upload    from './pages/Upload';
import Results   from './pages/Results';
import Pricing   from './pages/Pricing';
import Auth      from './pages/Auth';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/"        element={<Landing  />} />
          <Route path="/upload"  element={<Upload   />} />
          <Route path="/results" element={<Results  />} />
          <Route path="/pricing" element={<Pricing  />} />
          <Route path="/auth"    element={<Auth     />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
