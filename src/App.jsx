import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';
import Solutions from './pages/Solutions';
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* Rutas Públicas - Con Navbar y Footer */}
            <Route path="/*" element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/catalogo" element={<Catalog />} />
                  <Route path="/producto/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/nosotros" element={<About />} />
                  <Route path="/contacto" element={<Contact />} />
                  <Route path="/soluciones" element={<Solutions />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </Layout>
            } />
          </Routes>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
