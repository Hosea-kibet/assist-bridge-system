
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, User, MessageSquare, Mail, Phone, Globe, Eye } from "lucide-react";
import TicketDetail from "./TicketDetail";

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "critical";
  customer: string;
  customerEmail: string;
  source: "whatsapp" | "email" | "phone" | "web";
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

interface TicketListProps {
  searchTerm: string;
}

const TicketList = ({ searchTerm }: TicketListProps) => {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  // Sample data - in real app this would come from API
  const tickets: Ticket[] = [
    {
      id: "T-001",
      title: "Login issues with mobile app",
      description: "User unable to login using mobile application after recent update",
      status: "open",
      priority: "high",
      customer: "John Doe",
      customerEmail: "john.doe@email.com",
      source: "email",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-15T10:30:00Z"
    },
    {
      id: "T-002",
      title: "Payment processing error",
      description: "Customer experiencing payment failures during checkout",
      status: "in-progress",
      priority: "critical",
      customer: "Jane Smith",
      customerEmail: "jane.smith@email.com",
      source: "whatsapp",
      assignedTo: "Agent Mike",
      createdAt: "2024-01-15T09:15:00Z",
      updatedAt: "2024-01-15T11:20:00Z"
    },
    {
      id: "T-003",
      title: "Feature request: Dark mode",
      description: "Customer requesting dark mode option in the application",
      status: "open",
      priority: "low",
      customer: "Bob Wilson",
      customerEmail: "bob.wilson@email.com",
      source: "web",
      createdAt: "2024-01-14T16:45:00Z",
      updatedAt: "2024-01-14T16:45:00Z"
    },
    {
      id: "T-004",
      title: "Account verification issues",
      description: "New user unable to complete account verification process",
      status: "resolved",
      priority: "medium",
      customer: "Alice Johnson",
      customerEmail: "alice.johnson@email.com",
      source: "phone",
      assignedTo: "Agent Sarah",
      createdAt: "2024-01-14T14:20:00Z",
      updatedAt: "2024-01-15T09:30:00Z"
    }
  ];

  const filteredTickets = tickets.filter(ticket =>
    ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-orange-100 text-orange-800 border-orange-200";
      case "in-progress": return "bg-blue-100 text-blue-800 border-blue-200";
      case "resolved": return "bg-green-100 text-green-800 border-green-200";
      case "closed": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low": return "bg-green-100 text-green-800 border-green-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "high": return "bg-orange-100 text-orange-800 border-orange-200";
      case "critical": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "whatsapp": return <MessageSquare className="w-4 h-4" />;
      case "email": return <Mail className="w-4 h-4" />;
      case "phone": return <Phone className="w-4 h-4" />;
      case "web": return <Globe className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <>
      <div className="space-y-4">
        {filteredTickets.map((ticket) => (
          <Card key={ticket.id} className="bg-white/60 backdrop-blur-sm border-white/20 hover:bg-white/80 transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="font-mono text-sm font-medium text-gray-600">
                      {ticket.id}
                    </span>
                    <Badge className={getStatusColor(ticket.status)}>
                      {ticket.status.replace("-", " ")}
                    </Badge>
                    <Badge className={getPriorityColor(ticket.priority)}>
                      {ticket.priority}
                    </Badge>
                    <div className="flex items-center space-x-1 text-gray-500">
                      {getSourceIcon(ticket.source)}
                      <span className="text-xs capitalize">{ticket.source}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {ticket.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {ticket.description}
                  </p>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{ticket.customer}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{formatDate(ticket.createdAt)}</span>
                    </div>
                    {ticket.assignedTo && (
                      <div className="flex items-center space-x-1">
                        <span>Assigned to:</span>
                        <span className="font-medium">{ticket.assignedTo}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="ml-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedTicket(ticket)}
                    className="bg-white/80 border-white/30"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredTickets.length === 0 && (
          <Card className="bg-white/60 backdrop-blur-sm border-white/20">
            <CardContent className="p-12 text-center">
              <p className="text-gray-500">No tickets found matching your search.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {selectedTicket && (
        <TicketDetail
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}
    </>
  );
};

export default TicketList;
