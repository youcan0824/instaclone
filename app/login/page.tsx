"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>youcando-it.jp</h1>
        <p style={styles.subtitle}>ログイン</p>

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.field}>
            <label htmlFor="email" style={styles.label}>メールアドレス</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
              placeholder="you@example.com"
            />
          </div>

          <div style={styles.field}>
            <label htmlFor="password" style={styles.label}>パスワード</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              style={styles.input}
              placeholder="6文字以上"
            />
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "ログイン中..." : "ログイン"}
          </button>
        </form>

        <p style={styles.footer}>
          アカウントをお持ちでない方は{" "}
          <a href="/signup">新規登録</a>
        </p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    background: "#fff",
    borderRadius: 12,
    padding: 40,
    width: "100%",
    maxWidth: 400,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    textAlign: "center" as const,
    marginBottom: 4,
  },
  subtitle: {
    textAlign: "center" as const,
    color: "#666",
    marginBottom: 32,
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
    color: "#333",
  },
  input: {
    padding: "10px 12px",
    border: "1px solid #ddd",
    borderRadius: 6,
    fontSize: 16,
    outline: "none",
  },
  error: {
    color: "#e53e3e",
    fontSize: 14,
    textAlign: "center" as const,
  },
  button: {
    padding: "12px 0",
    backgroundColor: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    marginTop: 8,
  },
  footer: {
    textAlign: "center" as const,
    marginTop: 24,
    fontSize: 14,
    color: "#666",
  },
};
