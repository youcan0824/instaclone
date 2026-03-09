"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function EditProfilePage() {
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const loadProfile = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profile) {
        setDisplayName(profile.display_name || "");
        setBio(profile.bio || "");
        setAvatarUrl(profile.avatar_url);
      }
      setInitialLoading(false);
    };
    loadProfile();
  }, [router]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setError("画像は2MB以下にしてください");
      return;
    }
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
    setError("");
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

    let newAvatarUrl = avatarUrl;

    if (avatarFile) {
      const ext = avatarFile.name.split(".").pop();
      const fileName = `${user.id}/avatar.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, avatarFile, { upsert: true });

      if (uploadError) {
        setError("アイコンのアップロードに失敗: " + uploadError.message);
        setLoading(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);

      newAvatarUrl = urlData.publicUrl + "?t=" + Date.now();
    }

    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        display_name: displayName.trim() || null,
        bio: bio.trim() || null,
        avatar_url: newAvatarUrl,
      })
      .eq("id", user.id);

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }

    router.push("/profile");
    router.refresh();
  };

  const currentAvatar = avatarPreview || avatarUrl;

  if (initialLoading) {
    return (
      <div style={{ textAlign: "center", padding: 60, color: "#8e8e8e" }}>
        読み込み中...
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <button type="button" onClick={() => router.back()} style={styles.cancelBtn}>
            キャンセル
          </button>
          <h1 style={styles.heading}>プロフィールを編集</h1>
          <button type="submit" form="edit-form" disabled={loading} style={styles.saveBtn}>
            {loading ? "保存中..." : "完了"}
          </button>
        </div>

        <form id="edit-form" onSubmit={handleSubmit} style={styles.form}>
          {/* Avatar */}
          <div style={styles.avatarSection}>
            <button type="button" onClick={() => fileInputRef.current?.click()} style={styles.avatarButton}>
              {currentAvatar ? (
                <img src={currentAvatar} alt="avatar" style={styles.avatar} />
              ) : (
                <div style={styles.avatarPlaceholder}>
                  {displayName.charAt(0) || "?"}
                </div>
              )}
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              style={styles.changePhotoBtn}
            >
              写真を変更
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleAvatarChange}
              style={{ display: "none" }}
            />
          </div>

          {/* Display Name */}
          <div style={styles.field}>
            <label style={styles.label}>名前</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              style={styles.input}
              placeholder="表示名"
            />
          </div>

          {/* Bio */}
          <div style={styles.field}>
            <label style={styles.label}>自己紹介</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              style={styles.textarea}
              rows={4}
              placeholder="自己紹介を入力..."
              maxLength={150}
            />
            <span style={styles.charCount}>{bio.length} / 150</span>
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
    padding: "0",
  },
  card: {
    background: "#fff",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 16px",
    borderBottom: "1px solid #dbdbdb",
    position: "sticky" as const,
    top: 0,
    background: "#fff",
    zIndex: 10,
  },
  heading: {
    fontSize: 16,
    fontWeight: 600,
    color: "#262626",
  },
  cancelBtn: {
    background: "none",
    border: "none",
    color: "#262626",
    fontSize: 16,
    cursor: "pointer",
    padding: 0,
  },
  saveBtn: {
    background: "none",
    border: "none",
    color: "#0095f6",
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    padding: 0,
  },
  form: {
    padding: "20px 16px",
  },
  avatarSection: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    marginBottom: 24,
    gap: 8,
  },
  avatarButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    objectFit: "cover" as const,
    display: "block",
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 32,
    fontWeight: 600,
  },
  changePhotoBtn: {
    background: "none",
    border: "none",
    color: "#0095f6",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    padding: 0,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    display: "block",
    fontSize: 14,
    color: "#8e8e8e",
    marginBottom: 6,
  },
  input: {
    width: "100%",
    padding: "10px 0",
    border: "none",
    borderBottom: "1px solid #dbdbdb",
    fontSize: 16,
    outline: "none",
    color: "#262626",
    background: "transparent",
  },
  textarea: {
    width: "100%",
    padding: "10px 0",
    border: "none",
    borderBottom: "1px solid #dbdbdb",
    fontSize: 16,
    outline: "none",
    resize: "none" as const,
    lineHeight: 1.5,
    fontFamily: "inherit",
    color: "#262626",
    background: "transparent",
  },
  charCount: {
    display: "block",
    textAlign: "right" as const,
    fontSize: 12,
    color: "#8e8e8e",
    marginTop: 4,
  },
  error: {
    color: "#ed4956",
    fontSize: 14,
    textAlign: "center" as const,
  },
};
