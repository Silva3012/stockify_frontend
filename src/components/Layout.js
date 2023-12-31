import React from 'react';
import { useRouter } from 'next/router';
import Header from "./Header";
import Footer from "./Footer";

// Defining the layout for every page
export default function Layout({ children }) {
  const router = useRouter();

  // Check if the current route and see if header should be hidden
  const isLoginPage = router.pathname === '/login';
  const isRegisterPage = router.pathname === '/register';
  const isDashboardPage = router.pathname === '/dashboard';
  const isWatclistPage = router.pathname === '/watchlist';
  const isPortfolioPage = router.pathname === '/portfolio';
  const isAdminLogin = router.pathname === '/adminLogin';
  const isAdminDashboard = router.pathname === '/adminDashboard';

  // Hide the Header
  const showHeader = !isLoginPage && !isRegisterPage && !isDashboardPage && !isWatclistPage && !isPortfolioPage && !isAdminLogin && !isAdminDashboard;

  return (
    <>
      {showHeader && <Header />}
      <main>{children}</main>
      <Footer />
    </>
  );
}
