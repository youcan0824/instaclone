import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", padding: "0 20px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <h1>youcando-it.jp</h1>
        <form action="/auth/signout" method="post">
          <button
            type="submit"
            style={{
              padding: "8px 16px",
              backgroundColor: "#666",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            ログアウト
          </button>
        </form>
      </header>
      <div style={{ background: "#fff", borderRadius: 8, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
        <p>ようこそ、{user.email} さん</p>
        <p style={{ marginTop: 12, color: "#666" }}>
          ダッシュボードは今後ここに構築されます。
        </p>
      </div>
    </div>
  );
}
