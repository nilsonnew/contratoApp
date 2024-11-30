import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, DollarSign } from 'lucide-react';

function Layout() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-blue-700' : '';
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white">
        <div className="p-4">
          <h1 className="text-2xl font-bold">ContractPro</h1>
        </div>
        <nav className="mt-8">
          <Link
            to="/"
            className={`flex items-center px-6 py-3 text-lg hover:bg-blue-700 ${isActive('/')}`}
          >
            <LayoutDashboard className="mr-3" size={20} />
            Dashboard
          </Link>
          <Link
            to="/contracts"
            className={`flex items-center px-6 py-3 text-lg hover:bg-blue-700 ${isActive('/contracts')}`}
          >
            <FileText className="mr-3" size={20} />
            Contratos
          </Link>
          <Link
            to="/commissions"
            className={`flex items-center px-6 py-3 text-lg hover:bg-blue-700 ${isActive('/commissions')}`}
          >
            <DollarSign className="mr-3" size={20} />
            Comissões
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;