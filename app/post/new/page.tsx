"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setError("ログインが必要です");
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase.from("posts").insert({
      user_id: user.id,
      title,
      content,
      published: true,
    });

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>新規投稿</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label htmlFor="title" style={styles.label}>タイトル</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={styles.input}
              placeholder="投稿のタイトル"
            />
          </div>

          <div style={styles.field}>
            <label htmlFor="content" style={styles.label}>本文</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={styles.textarea}
              rows={10}
              placeholder="投稿の内容を入力..."
            />
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <div style={styles.buttons}>
            <button
              type="button"
              onClick={() => router.back()}
              style={styles.cancelBtn}
            >
              キャンセル
            </button>
            <button type="submit" disabled={loading} style={styles.submitBtn}>
              {loading ? "投稿中..." : "投稿する"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: 800,
    margin: "24px auto",
    padding: "0 20px",
  },
  card: {
    background: "#fff",
    borderRadius: 8,
    padding: 32,
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  },
  heading: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 24,
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 20,
  },
  field: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: 500,
  },
  input: {
    padding: "10px 12px",
    border: "1px solid #ddd",
    borderRadius: 6,
    fontSize: 16,
    outline: "none",
  },
  textarea: {
    padding: "10px 12px",
    border: "1px solid #ddd",
    borderRadius: 6,
    fontSize: 15,
    outline: "none",
    resize: "vertical" as const,
    lineHeight: 1.7,
    fontFamily: "inherit",
  },
  error: {
    color: "#e53e3e",
    fontSize: 14,
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 8,
  },
  cancelBtn: {
    padding: "10px 20px",
    backgroundColor: "transparent",
    color: "#666",
    border: "1px solid #ddd",
    borderRadius: 6,
    fontSize: 14,
    cursor: "pointer",
  },
  submitBtn: {
    padding: "10px 24px",
    backgroundColor: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },
};
