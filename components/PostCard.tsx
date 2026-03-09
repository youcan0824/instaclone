"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Post } from "@/lib/types";
import Link from "next/link";

export default function PostCard({
  post,
  currentUserId,
}: {
  post: Post;
  currentUserId: string;
}) {
  const [liked, setLiked] = useState(post.user_has_liked ?? false);
  const [likeCount, setLikeCount] = useState(post.likes?.[0]?.count ?? 0);
  const commentCount = post.comments?.[0]?.count ?? 0;

  const toggleLike = async () => {
    const supabase = createClient();
    if (liked) {
      await supabase
        .from("likes")
        .delete()
        .eq("user_id", currentUserId)
        .eq("post_id", post.id);
      setLiked(false);
      setLikeCount((c) => c - 1);
    } else {
      await supabase
        .from("likes")
        .insert({ user_id: currentUserId, post_id: post.id });
      setLiked(true);
      setLikeCount((c) => c + 1);
    }
  };

  const displayName = post.profiles?.display_name || "匿名";
  const date = new Date(post.created_at).toLocaleDateString("ja-JP", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <article style={styles.card}>
      <div style={styles.header}>
        <div style={styles.avatar}>
          {displayName.charAt(0)}
        </div>
        <div>
          <div style={styles.name}>{displayName}</div>
          <div style={styles.date}>{date}</div>
        </div>
      </div>

      <Link href={`/post/${post.id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <h2 style={styles.title}>{post.title}</h2>
        {post.content && (
          <p style={styles.content}>
            {post.content.length > 200
              ? post.content.slice(0, 200) + "..."
              : post.content}
          </p>
        )}
      </Link>

      <div style={styles.actions}>
        <button onClick={toggleLike} style={styles.actionBtn}>
          <span style={{ color: liked ? "#e53e3e" : "#999" }}>
            {liked ? "♥" : "♡"}
          </span>{" "}
          {likeCount}
        </button>
        <Link href={`/post/${post.id}`} style={styles.actionBtn}>
          💬 {commentCount}
        </Link>
      </div>
    </article>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    background: "#fff",
    borderRadius: 8,
    padding: 20,
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    backgroundColor: "#0070f3",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: 16,
  },
  name: {
    fontWeight: 600,
    fontSize: 14,
  },
  date: {
    fontSize: 12,
    color: "#999",
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    color: "#555",
    lineHeight: 1.7,
    marginBottom: 12,
  },
  actions: {
    display: "flex",
    gap: 16,
    paddingTop: 12,
    borderTop: "1px solid #f0f0f0",
  },
  actionBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 14,
    color: "#666",
    padding: "4px 8px",
    borderRadius: 4,
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
};
