
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Clock, User, MessageSquare, Mail, Phone, Globe, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

interface TicketDetailProps {
  ticket: Ticket;
  onClose: () => void;
}

const TicketDetail = ({ ticket, onClose }: TicketDetailProps) => {
  const { toast } = useToast();
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"open" | "in-progress" | "resolved" | "closed">(ticket.status);

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
    return new Date(dateString).toLocaleString();
  };

  const handleStatusUpdate = () => {
    console.log("Updating ticket status:", { ticketId: ticket.id, newStatus: status });
    toast({
      title: "Status Updated",
      description: `Ticket ${ticket.id} status changed to ${status.replace("-", " ")}.`,
    });
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      console.log("Adding comment:", { ticketId: ticket.id, comment });
      toast({
        title: "Comment Added",
        description: "Your comment has been added to the ticket.",
      });
      setComment("");
    }
  };

  const handleStatusChange = (value: string) => {
    if (value === "open" || value === "in-progress" || value === "resolved" || value === "closed") {
      setStatus(value);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-md">
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <CardTitle className="text-xl font-semibold">{ticket.id}</CardTitle>
              <Badge className={getStatusColor(status)}>
                {status.replace("-", " ")}
              </Badge>
              <Badge className={getPriorityColor(ticket.priority)}>
                {ticket.priority}
              </Badge>
              <div className="flex items-center space-x-1 text-gray-500">
                {getSourceIcon(ticket.source)}
                <span className="text-xs capitalize">{ticket.source}</span>
              </div>
            </div>
            <h2 className="text-lg font-medium text-gray-900">{ticket.title}</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Customer Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Customer Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span>{ticket.customer}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>{ticket.customerEmail}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Ticket Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>Created: {formatDate(ticket.createdAt)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>Updated: {formatDate(ticket.updatedAt)}</span>
                </div>
                {ticket.assignedTo && (
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span>Assigned to: {ticket.assignedTo}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Description</h3>
            <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{ticket.description}</p>
          </div>

          {/* Status Update */}
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Update Status</h3>
            <div className="flex items-center space-x-3">
              <Select value={status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleStatusUpdate} variant="outline">
                Update Status
              </Button>
            </div>
          </div>

          {/* Add Comment */}
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Add Comment</h3>
            <div className="space-y-3">
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add internal note or customer response..."
                rows={3}
              />
              <Button onClick={handleAddComment} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Send className="w-4 h-4 mr-2" />
                Add Comment
              </Button>
            </div>
          </div>

          {/* Sample Comments/History */}
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Ticket History</h3>
            <div className="space-y-3">
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-blue-900">System</span>
                  <span className="text-sm text-blue-700">{formatDate(ticket.createdAt)}</span>
                </div>
                <p className="text-blue-800">Ticket created automatically from {ticket.source}</p>
              </div>
              
              {ticket.assignedTo && (
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-green-900">System</span>
                    <span className="text-sm text-green-700">{formatDate(ticket.updatedAt)}</span>
                  </div>
                  <p className="text-green-800">Ticket assigned to {ticket.assignedTo}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TicketDetail;
