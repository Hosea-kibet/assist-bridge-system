
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, BarChart3 } from "lucide-react";
import TicketStats from "@/components/TicketStats";
import TicketList from "@/components/TicketList";
import TicketForm from "@/components/TicketForm";
import NotificationCenter from "@/components/NotificationCenter";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";

const Index = () => {
  const { user, loading } = useAuth();
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  if (!loading && !user) {
    return <Navigate to="/auth" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Support Dashboard</h2>
          <p className="text-gray-600">Manage and track customer support tickets</p>
        </div>

        <TicketStats />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="flex flex-col lg:flex-row gap-6 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search tickets by ID, title, customer..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/60 backdrop-blur-sm border-white/20"
                  />
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Link to="/analytics">
                  <Button variant="outline" className="bg-white/60 backdrop-blur-sm border-white/20">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Analytics
                  </Button>
                </Link>
                <Button 
                  onClick={() => setShowTicketForm(true)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Ticket
                </Button>
              </div>
            </div>

            <TicketList searchTerm={searchTerm} />
          </div>

          <div>
            <NotificationCenter />
          </div>
        </div>

        {showTicketForm && (
          <TicketForm onClose={() => setShowTicketForm(false)} />
        )}
      </main>
    </div>
  );
};

export default Index;
