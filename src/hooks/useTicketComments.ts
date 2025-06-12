
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface TicketComment {
  id: string;
  ticket_id: string;
  user_id: string;
  content: string;
  created_at: string;
  profiles?: {
    full_name: string;
    email: string;
  };
}

export const useTicketComments = (ticketId: string) => {
  const [comments, setComments] = useState<TicketComment[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchComments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ticket_comments')
        .select(`
          *,
          profiles (
            full_name,
            email
          )
        `)
        .eq('ticket_id', ticketId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast({
        title: "Error",
        description: "Failed to fetch comments",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (content: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('ticket_comments')
        .insert([{
          ticket_id: ticketId,
          user_id: user.id,
          content
        }]);

      if (error) throw error;

      await fetchComments(); // Refresh comments
      toast({
        title: "Success",
        description: "Comment added successfully",
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive"
      });
      throw error;
    }
  };

  useEffect(() => {
    if (ticketId) {
      fetchComments();
    }
  }, [ticketId]);

  return {
    comments,
    loading,
    addComment,
    refreshComments: fetchComments
  };
};
