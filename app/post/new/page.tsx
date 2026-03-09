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
        <div style={styles.cardHeader}>
          <button
            type="button"
            onClick={() => router.back()}
            style={styles.cancelLink}
          >
            キャンセル
          </button>
          <h1 style={styles.heading}>新規投稿</h1>
          <button
            type="submit"
            form="post-form"
            disabled={loading || !title.trim()}
            style={{
              ...styles.shareBtn,
              opacity: title.trim() ? 1 : 0.5,
            }}
          >
            {loading ? "投稿中..." : "シェア"}
          </button>
        </div>

        <form id="post-form" onSubmit={handleSubmit} style={styles.form}>
          {/* Image Upload Area */}
          <div style={styles.imageArea}>
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
                  &times;
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                style={styles.uploadBtn}
              >
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#8e8e8e" strokeWidth="1">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <span style={{ color: "#8e8e8e", fontSize: 14, marginTop: 8 }}>
                  写真を選択
                </span>
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>

          {/* Title */}
          <div style={styles.field}>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={styles.input}
              placeholder="タイトルを入力..."
            />
          </div>

          {/* Content */}
          <div style={styles.field}>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={styles.textarea}
              rows={6}
              placeholder="キャプションを入力..."
            />
          </div>

          {error && <p style={styles.error}>{error}</p>}
        </form>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: 470,
    margin: "0 auto",
    padding: "24px 0 0",
  },
  card: {
    background: "#fff",
    border: "1px solid #dbdbdb",
    borderRadius: 3,
    overflow: "hidden",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 16px",
    borderBottom: "1px solid #efefef",
  },
  heading: {
    fontSize: 16,
    fontWeight: 600,
    color: "#262626",
  },
  cancelLink: {
    background: "none",
    border: "none",
    color: "#262626",
    fontSize: 14,
    cursor: "pointer",
    padding: 0,
  },
  shareBtn: {
    background: "none",
    border: "none",
    color: "#0095f6",
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
    padding: 0,
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
  },
  imageArea: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 200,
    borderBottom: "1px solid #efefef",
  },
  uploadBtn: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 0",
    width: "100%",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  previewWrap: {
    position: "relative" as const,
    width: "100%",
  },
  preview: {
    width: "100%",
    display: "block",
  },
  removeBtn: {
    position: "absolute" as const,
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: "50%",
    backgroundColor: "rgba(0,0,0,0.6)",
    color: "#fff",
    border: "none",
    fontSize: 18,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
  },
  field: {
    borderBottom: "1px solid #efefef",
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    border: "none",
    fontSize: 16,
    outline: "none",
    color: "#262626",
  },
  textarea: {
    width: "100%",
    padding: "14px 16px",
    border: "none",
    fontSize: 14,
    outline: "none",
    resize: "none" as const,
    lineHeight: 1.6,
    fontFamily: "inherit",
    color: "#262626",
  },
  error: {
    color: "#ed4956",
    fontSize: 14,
    padding: "12px 16px",
    textAlign: "center" as const,
  },
};
