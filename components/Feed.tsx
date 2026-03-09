"use client";

import PostCard from "./PostCard";
import type { Post } from "@/lib/types";

export default function Feed({
  posts,
  currentUserId,
}: {
  posts: Post[];
  currentUserId: string;
}) {
  if (posts.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: 40, color: "#999" }}>
        <p style={{ fontSize: 18, marginBottom: 8 }}>まだ投稿がありません</p>
        <p style={{ fontSize: 14 }}>「投稿する」から最初の投稿を作成しましょう</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} currentUserId={currentUserId} />
      ))}
    </div>
  );
}
