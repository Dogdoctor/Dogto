import { Outlet, Link } from 'react-router-dom';
import { ClipboardList } from 'lucide-react';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors">
              <ClipboardList size={24} />
              <h1 className="text-xl font-semibold">Survey App</h1>
            </Link>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link 
                    to="/" 
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Respond
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/surveyor" 
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Surveyor Portal
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </main>
      
      <footer className="bg-white shadow-sm py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Survey Application
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;