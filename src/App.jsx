import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';
import Solutions from './pages/Solutions';
import ForgotPassword from './pages/customer/ForgotPassword';
import ResetPassword from './pages/customer/ResetPassword';
import CustomerDashboardLayout from './pages/customer/CustomerDashboardLayout';
import Profile from './pages/customer/Profile';
import QuotesHistory from './pages/customer/QuotesHistory';
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
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
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password/:token" element={<ResetPassword />} />

                    {/* Panel de Cliente */}
                    <Route path="/mi-cuenta" element={<CustomerDashboardLayout />}>
                      <Route index element={<Navigate to="perfil" replace />} />
                      <Route path="perfil" element={<Profile />} />
                      <Route path="pedidos" element={<QuotesHistory />} />
                    </Route>

                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </Layout>
              } />
            </Routes>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
