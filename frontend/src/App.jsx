import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import MyOrders from './pages/MyOrders';
import PaymentResult from './pages/PaymentResult';
import Categories from './pages/Categories';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

import Dashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/AdminProducts';
import ProductForm from './pages/admin/ProductForm';
import AdminCategories from './pages/admin/AdminCategories';
import AdminUsers from './pages/admin/AdminUsers';
import AdminOrders from './pages/admin/AdminOrders';
import AdminSettings from './pages/admin/AdminSettings';

// Routes de l'application
const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <ScrollToTop />

        <Routes>
          {/* Boutique */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/produits" element={<Products />} />
            <Route path="/produit/:id" element={<ProductDetail />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/panier" element={<Cart />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/connexion" element={<Login />} />
            <Route path="/inscription" element={<Register />} />

            {/* Routes connectees */}
            <Route element={<ProtectedRoute />}>
              <Route path="/commande" element={<Checkout />} />
              <Route path="/mes-commandes" element={<MyOrders />} />
              <Route path="/paiement/merci" element={<PaymentResult />} />
              <Route path="/paiement/annule" element={<PaymentResult annule />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Tableau de bord admin */}
          <Route element={<ProtectedRoute adminOnly />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="produits" element={<AdminProducts />} />
              <Route path="produits/nouveau" element={<ProductForm />} />
              <Route path="produits/:id" element={<ProductForm />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="utilisateurs" element={<AdminUsers />} />
              <Route path="commandes" element={<AdminOrders />} />
              <Route path="parametres" element={<AdminSettings />} />
            </Route>
          </Route>
        </Routes>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
