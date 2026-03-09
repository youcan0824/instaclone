"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("画像は5MB以下にしてください");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setError("");
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

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

    let imageUrl: string | null = null;

    // Upload image if selected
    if (imageFile) {
      const ext = imageFile.name.split(".").pop();
      const fileName = `${user.id}/${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("post-images")
        .upload(fileName, imageFile);

      if (uploadError) {
        setError("画像のアップロードに失敗しました: " + uploadError.message);
        setLoading(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("post-images")
        .getPublicUrl(fileName);

      imageUrl = urlData.publicUrl;
    }

    const { error: insertError } = await supabase.from("posts").insert({
      user_id: user.id,
      title,
      content,
      image_url: imageUrl,
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

          <div style={styles.field}>
            <label style={styles.label}>画像（任意）</label>
            {imagePreview ? (
              <div style={styles.previewWrap}>
                <img
                  src={imagePreview}
                  alt="プレビュー"
                  style={styles.preview}
                />
                <button
                  type="button"
                  onClick={removeImage}
                  style={styles.removeBtn}
                >
                  削除
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                style={styles.uploadBtn}
              >
                画像を選択
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <span style={styles.hint}>JPEG, PNG, WebP, GIF（5MB以下）</span>
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
  uploadBtn: {
    padding: "12px 0",
    border: "2px dashed #ddd",
    borderRadius: 6,
    background: "#fafafa",
    color: "#666",
    fontSize: 14,
    cursor: "pointer",
  },
  previewWrap: {
    position: "relative" as const,
  },
  preview: {
    width: "100%",
    maxHeight: 300,
    objectFit: "cover" as const,
    borderRadius: 6,
    display: "block",
  },
  removeBtn: {
    position: "absolute" as const,
    top: 8,
    right: 8,
    padding: "4px 12px",
    backgroundColor: "rgba(0,0,0,0.6)",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    fontSize: 12,
    cursor: "pointer",
  },
  hint: {
    fontSize: 12,
    color: "#999",
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
