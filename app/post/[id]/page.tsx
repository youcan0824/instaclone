import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import CommentSection from "@/components/CommentSection";
import type { Comment } from "@/lib/types";
import Link from "next/link";

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

  const { data: userLike } = await supabase
    .from("likes")
    .select("id")
    .eq("user_id", user.id)
    .eq("post_id", id)
    .maybeSingle();

  const { data: comments } = await supabase
    .from("comments")
    .select("*, profiles(*)")
    .eq("post_id", id)
    .order("created_at", { ascending: true });

  const displayName = post.profiles?.display_name || "Anonymous";
  const date = new Date(post.created_at).toLocaleDateString("ja-JP", {
    month: "short",
    day: "numeric",
  });
  const likeCount = post.likes?.[0]?.count ?? 0;

  return (
    <main style={styles.main}>
      <article style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={styles.avatar}>{displayName.charAt(0)}</div>
            <span style={styles.username}>{displayName}</span>
          </div>
        </div>

        {/* Image */}
        {post.image_url && (
          <img
            src={post.image_url}
            alt={post.title}
            style={styles.image}
          />
        )}

        {/* Like info */}
        <div style={styles.likeSection}>
          <span>{userLike ? "\u2764\uFE0F" : "\u2661"}</span>
          {" "}
          {likeCount > 0 && (
            <span style={styles.likeCount}>{likeCount}件のいいね</span>
          )}
        </div>

        {/* Caption */}
        <div style={styles.caption}>
          <span style={styles.captionName}>{displayName}</span>
          {" "}
          <span style={styles.title}>{post.title}</span>
        </div>

        {post.content && (
          <div style={styles.content}>
            {post.content.split("\n").map((line: string, i: number) => (
              <p key={i} style={{ marginBottom: 4 }}>{line}</p>
            ))}
          </div>
        )}

        {/* Date */}
        <div style={styles.date}>{date}</div>

        {/* Comments */}
        <CommentSection
          postId={id}
          currentUserId={user.id}
          initialComments={(comments ?? []) as Comment[]}
        />
      </article>

      <div style={styles.backLink}>
        <Link href="/" style={{ color: "#00376b", fontSize: 14 }}>
          &larr; フィードに戻る
        </Link>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: {
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
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 16px",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 600,
    fontSize: 14,
  },
  username: {
    fontWeight: 600,
    fontSize: 14,
    color: "#262626",
  },
  image: {
    width: "100%",
    display: "block",
  },
  likeSection: {
    padding: "8px 16px 0",
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  likeCount: {
    fontWeight: 600,
    fontSize: 14,
  },
  caption: {
    padding: "4px 16px",
    fontSize: 14,
    lineHeight: 1.5,
  },
  captionName: {
    fontWeight: 600,
    color: "#262626",
  },
  title: {
    color: "#262626",
  },
  content: {
    padding: "4px 16px 8px",
    fontSize: 14,
    color: "#262626",
    lineHeight: 1.6,
  },
  date: {
    padding: "4px 16px 8px",
    fontSize: 10,
    color: "#8e8e8e",
    textTransform: "uppercase" as const,
    letterSpacing: 0.2,
  },
  backLink: {
    padding: "16px 0",
    textAlign: "center" as const,
  },
};
