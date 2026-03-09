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

  const displayName = post.profiles?.display_name || "Anonymous";
  const date = new Date(post.created_at).toLocaleDateString("ja-JP", {
    month: "short",
    day: "numeric",
  });

  return (
    <article style={styles.card}>
      {/* Header */}
      <div style={styles.header}>
        <Link href={`/post/${post.id}`} style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={styles.avatar}>{displayName.charAt(0)}</div>
          <span style={styles.username}>{displayName}</span>
        </Link>
      </div>

      {/* Image */}
      {post.image_url && (
        <Link href={`/post/${post.id}`}>
          <img
            src={post.image_url}
            alt={post.title}
            style={styles.image}
          />
        </Link>
      )}

      {/* Action Bar */}
      <div style={styles.actions}>
        <div style={styles.actionsLeft}>
          <button onClick={toggleLike} style={styles.actionBtn}>
            <svg width="24" height="24" viewBox="0 0 24 24"
              fill={liked ? "#ed4956" : "none"}
              stroke={liked ? "#ed4956" : "currentColor"}
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </button>
          <Link href={`/post/${post.id}`} style={styles.actionBtn}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Like Count */}
      {likeCount > 0 && (
        <div style={styles.likeCount}>{likeCount}件のいいね</div>
      )}

      {/* Caption */}
      <div style={styles.caption}>
        <Link href={`/post/${post.id}`} style={styles.captionName}>{displayName}</Link>
        {" "}
        <span>{post.title}</span>
        {post.content && (
          <span style={styles.contentPreview}>
            {" "}{post.content.length > 80 ? post.content.slice(0, 80) + "..." : post.content}
          </span>
        )}
      </div>

      {/* Comment Count */}
      {commentCount > 0 && (
        <Link href={`/post/${post.id}`} style={styles.commentLink}>
          コメント{commentCount}件をすべて見る
        </Link>
      )}

      {/* Date */}
      <div style={styles.date}>{date}</div>
    </article>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    background: "#fff",
    borderBottom: "1px solid #dbdbdb",
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
  actions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 16px 0",
  },
  actionsLeft: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  actionBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    color: "#262626",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  likeCount: {
    padding: "4px 16px 0",
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
    textDecoration: "none",
  },
  contentPreview: {
    color: "#262626",
  },
  commentLink: {
    display: "block",
    padding: "2px 16px",
    fontSize: 14,
    color: "#8e8e8e",
    textDecoration: "none",
  },
  date: {
    padding: "4px 16px 12px",
    fontSize: 10,
    color: "#8e8e8e",
    textTransform: "uppercase" as const,
    letterSpacing: 0.2,
  },
};
