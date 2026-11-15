import { useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";

export type BlogComment = {
  id: string | number;
  blog_id: number;
  author_name: string;
  author_email: string | null;
  content: string;
  created_at: string;
  is_approved: boolean;
};

/** `captchaToken` is passed by the form but is not verified server-side (comments insert straight into Supabase). */
export type NewComment = { blogId: number; name: string; email: string; content: string; captchaToken?: string | null };

const messageOf = (err: unknown) => (err instanceof Error ? err.message : String(err));

/**
 * Comments stay in Supabase (user-generated). Keyed by the legacy numeric blog id,
 * which Sanity posts carry as `legacyId`. Posts created natively in Sanity have no id yet.
 */
export const useBlogComments = () => {
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState<string | null>(null);

  const fetchComments = useCallback(async (blogId?: number | null) => {
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
      setCommentsError(messageOf(err));
    } finally {
      setCommentsLoading(false);
    }
  }, []);

  const addComment = useCallback(
    async ({ blogId, name, email, content }: NewComment) => {
      try {
        const { data, error } = await supabase
          .from("blog_comments")
          .insert([{ blog_id: blogId, author_name: name, author_email: email, content, is_approved: true }])
          .select()
          .single();
        if (error) throw error;
        await fetchComments(blogId);
        return { success: true as const, data: data as BlogComment };
      } catch (err) {
        console.error("Error adding comment:", err);
        return { success: false as const, error: messageOf(err) };
      }
    },
    [fetchComments]
  );

  return { comments, commentsLoading, commentsError, fetchComments, addComment };
};
