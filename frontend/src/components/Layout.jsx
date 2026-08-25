import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTopButton from './ScrollToTopButton';

// Gabarit de la boutique
const Layout = () => (
  <>
    <TopBar />
    <Navbar />
    <main>
      <Outlet />
    </main>
    <Footer />
    <ScrollToTopButton />
  </>
);

export default Layout;
