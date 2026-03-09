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

    router.push("/");
    router.refresh();
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 className="logo-font" style={styles.logo}>InstaClone</h1>

        <form onSubmit={handleLogin} style={styles.form}>
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
            placeholder="パスワード"
          />

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "ログイン中..." : "ログイン"}
          </button>
        </form>
      </div>

      <div style={styles.signupCard}>
        <p style={styles.signupText}>
          アカウントがない場合は{" "}
          <a href="/signup" style={styles.signupLink}>登録する</a>
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
    marginBottom: 24,
    color: "#262626",
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
  signupCard: {
    background: "#fff",
    border: "1px solid #dbdbdb",
    borderRadius: 1,
    padding: "20px 40px",
    width: "100%",
    maxWidth: 350,
    textAlign: "center" as const,
  },
  signupText: {
    fontSize: 14,
    color: "#262626",
  },
  signupLink: {
    color: "#0095f6",
    fontWeight: 600,
    textDecoration: "none",
  },
};
