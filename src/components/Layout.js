import { useRouter } from 'next/router';
import Header from "./Header";
import Footer from "./Footer";

// Defining the layout for every page
export default function Layout({ children }) {
  const router = useRouter();

  // Check if the current route is loginPage.js or registerPage.js
  const isLoginPage = router.pathname === '/loginPage';
  const isRegisterPage = router.pathname === '/registerPage';

  // Hide the Header if on loginPage.js or registerPage.js
  const showHeader = !isLoginPage && !isRegisterPage;

  return (
    <>
      {showHeader && <Header />}
      <main>{children}</main>
      <Footer />
    </>
  );
}
