
import { Button } from "@/components/ui/button";
import { LogOut, BarChart3, FileText } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-40">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                TicketWhiz
              </h1>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link 
                to="/" 
                className={`text-sm font-medium transition-colors ${
                  isActive('/') 
                    ? 'text-blue-600' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Dashboard
              </Link>
              <Link 
                to="/analytics" 
                className={`text-sm font-medium transition-colors flex items-center space-x-1 ${
                  isActive('/analytics') 
                    ? 'text-blue-600' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Analytics</span>
              </Link>
              <Link 
                to="/audit" 
                className={`text-sm font-medium transition-colors flex items-center space-x-1 ${
                  isActive('/audit') 
                    ? 'text-blue-600' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Audit Trail</span>
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {user && (
              <div className="hidden md:flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {user.user_metadata?.full_name || user.email}
                  </p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {(user.user_metadata?.full_name || user.email || 'U')[0].toUpperCase()}
                  </span>
                </div>
              </div>
            )}
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={signOut}
              className="bg-white/60 backdrop-blur-sm border-white/30"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
