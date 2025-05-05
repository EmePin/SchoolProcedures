import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';

const Layout = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Outlet />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isAdmin={isAdmin} />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 p-6 md:p-8">
          <Outlet />
        </main>
        <footer className="py-4 px-8 text-center text-sm text-gray-500 border-t border-gray-200">
          © {new Date().getFullYear()} Campus ID System. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Layout;