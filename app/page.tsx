import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/Navbar";
import Feed from "@/components/Feed";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // 投稿一覧を取得（公開済み + 自分の投稿）
  const { data: posts } = await supabase
    .from("posts")
    .select("*, profiles(*), likes(count), comments(count)")
    .order("created_at", { ascending: false });

  // 現在のユーザーがいいねした投稿IDを取得
  const { data: userLikes } = await supabase
    .from("likes")
    .select("post_id")
    .eq("user_id", user.id);

  const likedPostIds = new Set(userLikes?.map((l) => l.post_id) ?? []);

  const postsWithLikeStatus = (posts ?? []).map((post) => ({
    ...post,
    user_has_liked: likedPostIds.has(post.id),
  }));

  return (
    <>
      <Navbar userEmail={user.email ?? ""} />
      <main style={{ maxWidth: 470, margin: "0 auto", padding: "24px 0 0" }}>
        <Feed posts={postsWithLikeStatus} currentUserId={user.id} />
      </main>
    </>
  );
}
