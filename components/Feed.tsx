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
      <div style={{ textAlign: "center", padding: 60, color: "#8e8e8e" }}>
        <p style={{ fontSize: 16, marginBottom: 8 }}>まだ投稿がありません</p>
        <p style={{ fontSize: 14 }}>最初の写真をシェアしましょう</p>
      </div>
    );
  }

  return (
    <div style={styles.feed}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} currentUserId={currentUserId} />
      ))}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  feed: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid #dbdbdb",
    borderRadius: 3,
    overflow: "hidden",
    background: "#fff",
  },
};
