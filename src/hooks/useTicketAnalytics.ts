
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface TicketStats {
  total: number;
  open: number;
  inProgress: number;
  resolved: number;
  closed: number;
  high: number;
  critical: number;
  bySource: Record<string, number>;
  avgResolutionTime: number;
}

export const useTicketAnalytics = () => {
  const [stats, setStats] = useState<TicketStats>({
    total: 0,
    open: 0,
    inProgress: 0,
    resolved: 0,
    closed: 0,
    high: 0,
    critical: 0,
    bySource: {},
    avgResolutionTime: 0
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tickets')
        .select('*');

      if (error) throw error;

      const tickets = data || [];
      const total = tickets.length;
      
      const statusCounts = tickets.reduce((acc, ticket) => {
        acc[ticket.status] = (acc[ticket.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const priorityCounts = tickets.reduce((acc, ticket) => {
        acc[ticket.priority] = (acc[ticket.priority] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const sourceCounts = tickets.reduce((acc, ticket) => {
        acc[ticket.source] = (acc[ticket.source] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      // Calculate average resolution time for resolved tickets
      const resolvedTickets = tickets.filter(t => t.status === 'resolved');
      const avgResolutionTime = resolvedTickets.length > 0 
        ? resolvedTickets.reduce((acc, ticket) => {
            const created = new Date(ticket.created_at);
            const updated = new Date(ticket.updated_at);
            return acc + (updated.getTime() - created.getTime());
          }, 0) / resolvedTickets.length / (1000 * 60 * 60 * 24) // Convert to days
        : 0;

      setStats({
        total,
        open: statusCounts.open || 0,
        inProgress: statusCounts['in-progress'] || 0,
        resolved: statusCounts.resolved || 0,
        closed: statusCounts.closed || 0,
        high: priorityCounts.high || 0,
        critical: priorityCounts.critical || 0,
        bySource: sourceCounts,
        avgResolutionTime: Math.round(avgResolutionTime * 10) / 10
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast({
        title: "Error",
        description: "Failed to fetch analytics data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return {
    stats,
    loading,
    refreshAnalytics: fetchAnalytics
  };
};
