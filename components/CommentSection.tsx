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
      {comments.map((c) => (
        <div key={c.id} style={styles.comment}>
          <span style={styles.commentName}>
            {c.profiles?.display_name || "Anonymous"}
          </span>
          {" "}
          <span style={styles.commentText}>{c.content}</span>
          <div style={styles.commentDate}>
            {new Date(c.created_at).toLocaleDateString("ja-JP", {
              month: "short",
              day: "numeric",
            })}
          </div>
        </div>
      ))}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="コメントを追加..."
          style={styles.input}
        />
        <button
          type="submit"
          disabled={sending || !text.trim()}
          style={{
            ...styles.submitBtn,
            opacity: text.trim() ? 1 : 0.5,
          }}
        >
          投稿する
        </button>
      </form>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    borderTop: "1px solid #efefef",
  },
  comment: {
    padding: "8px 16px",
    fontSize: 14,
    lineHeight: 1.5,
  },
  commentName: {
    fontWeight: 600,
    color: "#262626",
  },
  commentText: {
    color: "#262626",
  },
  commentDate: {
    fontSize: 10,
    color: "#8e8e8e",
    marginTop: 4,
    textTransform: "uppercase" as const,
  },
  form: {
    display: "flex",
    alignItems: "center",
    padding: "12px 16px",
    borderTop: "1px solid #efefef",
  },
  input: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: 14,
    color: "#262626",
    background: "transparent",
  },
  submitBtn: {
    background: "none",
    border: "none",
    color: "#0095f6",
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
    padding: 0,
  },
};
