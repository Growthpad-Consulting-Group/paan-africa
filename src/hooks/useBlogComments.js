import { useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";

/**
 * Comments stay in Supabase (user-generated). Keyed by the legacy numeric blog id,
 * which Sanity posts carry as `legacyId`. Posts created natively in Sanity have no id yet.
 */
export const useBlogComments = () => {
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState(null);

  const fetchComments = useCallback(async (blogId) => {
    if (!blogId) return;
    try {
      setCommentsLoading(true);
      setCommentsError(null);
      const { data, error } = await supabase
        .from("blog_comments")
        .select("*")
        .eq("blog_id", blogId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      setComments(data || []);
    } catch (err) {
      console.error("Error fetching comments:", err);
      setCommentsError(err.message);
    } finally {
      setCommentsLoading(false);
    }
  }, []);

  const addComment = useCallback(
    async ({ blogId, name, email, content }) => {
      try {
        const { data, error } = await supabase
          .from("blog_comments")
          .insert([{ blog_id: blogId, author_name: name, author_email: email, content, is_approved: true }])
          .select()
          .single();
        if (error) throw error;
        await fetchComments(blogId);
        return { success: true, data };
      } catch (err) {
        console.error("Error adding comment:", err);
        return { success: false, error: err.message };
      }
    },
    [fetchComments]
  );

  return { comments, commentsLoading, commentsError, fetchComments, addComment };
};
