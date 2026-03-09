"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Comment } from "@/lib/types";

export default function CommentSection({
  postId,
  currentUserId,
  initialComments,
}: {
  postId: string;
  currentUserId: string;
  initialComments: Comment[];
}) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setSending(true);

    const supabase = createClient();
    const { data, error } = await supabase
      .from("comments")
      .insert({ user_id: currentUserId, post_id: postId, content: text.trim() })
      .select("*, profiles(*)")
      .single();

    if (!error && data) {
      setComments((prev) => [...prev, data as Comment]);
      setText("");
    }
    setSending(false);
  };

  return (
    <div style={styles.section}>
      <h3 style={styles.heading}>コメント ({comments.length})</h3>

      {comments.map((c) => (
        <div key={c.id} style={styles.comment}>
          <div style={styles.commentHeader}>
            <span style={styles.commentName}>
              {c.profiles?.display_name || "匿名"}
            </span>
            <span style={styles.commentDate}>
              {new Date(c.created_at).toLocaleDateString("ja-JP", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <p style={styles.commentText}>{c.content}</p>
        </div>
      ))}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="コメントを入力..."
          style={styles.input}
        />
        <button type="submit" disabled={sending || !text.trim()} style={styles.submitBtn}>
          {sending ? "送信中" : "送信"}
        </button>
      </form>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    marginTop: 24,
  },
  heading: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 16,
  },
  comment: {
    padding: "12px 0",
    borderBottom: "1px solid #f0f0f0",
  },
  commentHeader: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  commentName: {
    fontWeight: 600,
    fontSize: 13,
  },
  commentDate: {
    fontSize: 12,
    color: "#999",
  },
  commentText: {
    fontSize: 14,
    color: "#444",
  },
  form: {
    display: "flex",
    gap: 8,
    marginTop: 16,
  },
  input: {
    flex: 1,
    padding: "10px 12px",
    border: "1px solid #ddd",
    borderRadius: 6,
    fontSize: 14,
    outline: "none",
  },
  submitBtn: {
    padding: "10px 20px",
    backgroundColor: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },
};
