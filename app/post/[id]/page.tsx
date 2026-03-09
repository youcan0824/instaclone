import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import CommentSection from "@/components/CommentSection";
import type { Comment } from "@/lib/types";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: post } = await supabase
    .from("posts")
    .select("*, profiles(*), likes(count)")
    .eq("id", id)
    .single();

  if (!post) {
    notFound();
  }

  // いいね状態
  const { data: userLike } = await supabase
    .from("likes")
    .select("id")
    .eq("user_id", user.id)
    .eq("post_id", id)
    .maybeSingle();

  // コメント一覧
  const { data: comments } = await supabase
    .from("comments")
    .select("*, profiles(*)")
    .eq("post_id", id)
    .order("created_at", { ascending: true });

  const displayName = post.profiles?.display_name || "匿名";
  const date = new Date(post.created_at).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
      <main style={{ maxWidth: 800, margin: "24px auto", padding: "0 20px" }}>
        <article style={styles.card}>
          <div style={styles.header}>
            <div style={styles.avatar}>{displayName.charAt(0)}</div>
            <div>
              <div style={styles.name}>{displayName}</div>
              <div style={styles.date}>{date}</div>
            </div>
          </div>

          <h1 style={styles.title}>{post.title}</h1>
          {post.content && (
            <div style={styles.content}>
              {post.content.split("\n").map((line: string, i: number) => (
                <p key={i} style={{ marginBottom: 8 }}>{line}</p>
              ))}
            </div>
          )}

          <div style={styles.meta}>
            <span>{userLike ? "♥" : "♡"} {post.likes?.[0]?.count ?? 0} いいね</span>
          </div>

          <CommentSection
            postId={id}
            currentUserId={user.id}
            initialComments={(comments ?? []) as Comment[]}
          />
        </article>

        <div style={{ marginTop: 16 }}>
          <a href="/" style={{ color: "#0070f3", fontSize: 14 }}>
            ← フィードに戻る
          </a>
        </div>
      </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    background: "#fff",
    borderRadius: 8,
    padding: 32,
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: "50%",
    backgroundColor: "#0070f3",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: 18,
  },
  name: {
    fontWeight: 600,
    fontSize: 15,
  },
  date: {
    fontSize: 13,
    color: "#999",
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 16,
  },
  content: {
    fontSize: 15,
    color: "#444",
    lineHeight: 1.8,
    marginBottom: 20,
  },
  meta: {
    fontSize: 14,
    color: "#666",
    paddingTop: 16,
    borderTop: "1px solid #f0f0f0",
  },
};
