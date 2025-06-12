
import { useState } from "react";
import { Plus, Search, Filter, Ticket, Phone, Mail, MessageSquare, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TicketForm from "@/components/TicketForm";
import TicketList from "@/components/TicketList";
import TicketStats from "@/components/TicketStats";

const Index = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Ticket className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">TicketFlow</h1>
                <p className="text-sm text-gray-500">Multi-Channel Support System</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                <Badge variant="outline" className="flex items-center space-x-1">
                  <MessageSquare className="w-3 h-3" />
                  <span>WhatsApp</span>
                </Badge>
                <Badge variant="outline" className="flex items-center space-x-1">
                  <Mail className="w-3 h-3" />
                  <span>Email</span>
                </Badge>
                <Badge variant="outline" className="flex items-center space-x-1">
                  <Phone className="w-3 h-3" />
                  <span>Calls</span>
                </Badge>
                <Badge variant="outline" className="flex items-center space-x-1">
                  <Globe className="w-3 h-3" />
                  <span>Web</span>
                </Badge>
              </div>
              
              <Button 
                onClick={() => setShowCreateForm(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Ticket
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Section */}
        <TicketStats />

        {/* Search and Filter Section */}
        <div className="mb-8">
          <Card className="bg-white/60 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search tickets by ID, customer, or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/80 border-white/30"
                  />
                </div>
                <Button variant="outline" className="bg-white/80 border-white/30">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tickets List */}
        <TicketList searchTerm={searchTerm} />
      </main>

      {/* Create Ticket Modal */}
      {showCreateForm && (
        <TicketForm onClose={() => setShowCreateForm(false)} />
      )}
    </div>
  );
};

export default Index;
