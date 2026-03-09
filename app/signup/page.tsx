"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 className="logo-font" style={styles.logo}>InstaClone</h1>
          <p style={{ textAlign: "center", color: "#8e8e8e", fontSize: 14, marginBottom: 20 }}>
            確認メールを送信しました。メール内のリンクをクリックして登録を完了してください。
          </p>
          <a href="/login" style={{ ...styles.button, display: "block", textAlign: "center", textDecoration: "none" }}>
            ログインページへ
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 className="logo-font" style={styles.logo}>InstaClone</h1>
        <p style={styles.subtitle}>
          友達の写真や動画を見るには登録してください。
        </p>

        <form onSubmit={handleSignup} style={styles.form}>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
            style={styles.input}
            placeholder="表示名"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
            placeholder="メールアドレス"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            style={styles.input}
            placeholder="パスワード（6文字以上）"
          />

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "登録中..." : "登録する"}
          </button>
        </form>
      </div>

      <div style={styles.loginCard}>
        <p style={styles.loginText}>
          アカウントをお持ちですか？{" "}
          <a href="/login" style={styles.loginLink}>ログイン</a>
        </p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 12,
  },
  card: {
    background: "#fff",
    border: "1px solid #dbdbdb",
    borderRadius: 1,
    padding: "40px 40px 20px",
    width: "100%",
    maxWidth: 350,
  },
  logo: {
    fontSize: 40,
    textAlign: "center" as const,
    marginBottom: 8,
    color: "#262626",
  },
  subtitle: {
    textAlign: "center" as const,
    color: "#8e8e8e",
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 20,
    lineHeight: 1.5,
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 8,
  },
  input: {
    padding: "10px 12px",
    border: "1px solid #dbdbdb",
    borderRadius: 3,
    fontSize: 12,
    outline: "none",
    background: "#fafafa",
    color: "#262626",
  },
  error: {
    color: "#ed4956",
    fontSize: 14,
    textAlign: "center" as const,
  },
  button: {
    padding: "8px 0",
    backgroundColor: "#0095f6",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    marginTop: 8,
  },
  loginCard: {
    background: "#fff",
    border: "1px solid #dbdbdb",
    borderRadius: 1,
    padding: "20px 40px",
    width: "100%",
    maxWidth: 350,
    textAlign: "center" as const,
  },
  loginText: {
    fontSize: 14,
    color: "#262626",
  },
  loginLink: {
    color: "#0095f6",
    fontWeight: 600,
    textDecoration: "none",
  },
};
