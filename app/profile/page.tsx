import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, image_url")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const postCount = posts?.length ?? 0;
  const displayName = profile?.display_name || "Anonymous";
  const avatarUrl = profile?.avatar_url;
  const bio = profile?.bio;

  return (
    <>
      <Navbar userEmail={user.email ?? ""} />
      <main style={styles.main}>
        {/* Profile Header */}
        <div style={styles.profileHeader}>
          <div style={styles.avatarWrap}>
            {avatarUrl ? (
              <img src={avatarUrl} alt={displayName} style={styles.avatar} />
            ) : (
              <div style={styles.avatarPlaceholder}>
                {displayName.charAt(0)}
              </div>
            )}
          </div>
          <div style={styles.info}>
            <div style={styles.usernameRow}>
              <span style={styles.username}>{displayName}</span>
              <Link href="/profile/edit" style={styles.editBtn}>
                プロフィールを編集
              </Link>
            </div>
            <div style={styles.stats}>
              <span><strong>{postCount}</strong> 投稿</span>
            </div>
            {bio && <p style={styles.bio}>{bio}</p>}
          </div>
        </div>

        {/* Mobile: bio below header */}
        <div style={styles.bioMobile}>
          <strong style={{ fontSize: 14 }}>{displayName}</strong>
          {bio && <p style={{ fontSize: 14, marginTop: 2 }}>{bio}</p>}
        </div>

        {/* Posts Grid */}
        <div style={styles.gridBorder}>
          <div style={styles.gridHeader}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <rect x="1" y="1" width="9" height="9" rx="1" />
              <rect x="14" y="1" width="9" height="9" rx="1" />
              <rect x="1" y="14" width="9" height="9" rx="1" />
              <rect x="14" y="14" width="9" height="9" rx="1" />
            </svg>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" as const }}>
              投稿
            </span>
          </div>
        </div>

        {postCount === 0 ? (
          <div style={styles.empty}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8e8e8e" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <p style={{ marginTop: 12, fontSize: 14, color: "#8e8e8e" }}>まだ投稿がありません</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {(posts ?? []).map((post) => (
              <Link key={post.id} href={`/post/${post.id}`} style={styles.gridItem}>
                {post.image_url ? (
                  <img src={post.image_url} alt={post.title} style={styles.gridImage} />
                ) : (
                  <div style={styles.gridPlaceholder}>
                    <span style={{ fontSize: 12, color: "#8e8e8e", textAlign: "center" as const, padding: 8 }}>
                      {post.title}
                    </span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </main>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: {
    maxWidth: 470,
    margin: "0 auto",
  },
  profileHeader: {
    display: "flex",
    padding: "24px 16px 16px",
    gap: 24,
    alignItems: "flex-start",
  },
  avatarWrap: {
    flexShrink: 0,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    objectFit: "cover" as const,
    display: "block",
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 32,
    fontWeight: 600,
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  usernameRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
    flexWrap: "wrap" as const,
  },
  username: {
    fontSize: 20,
    fontWeight: 400,
    color: "#262626",
  },
  editBtn: {
    padding: "6px 16px",
    backgroundColor: "#efefef",
    color: "#262626",
    border: "none",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    textDecoration: "none",
    whiteSpace: "nowrap" as const,
  },
  stats: {
    display: "flex",
    gap: 24,
    fontSize: 14,
    color: "#262626",
    marginBottom: 8,
  },
  bio: {
    fontSize: 14,
    color: "#262626",
    lineHeight: 1.5,
  },
  bioMobile: {
    padding: "0 16px 16px",
    display: "none",
  },
  gridBorder: {
    borderTop: "1px solid #dbdbdb",
  },
  gridHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    padding: "12px 0",
    color: "#262626",
    borderTop: "1px solid #262626",
    width: "fit-content",
    margin: "0 auto",
    marginTop: -1,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 3,
  },
  gridItem: {
    aspectRatio: "1",
    overflow: "hidden",
    display: "block",
  },
  gridImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    display: "block",
  },
  gridPlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#efefef",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  empty: {
    textAlign: "center" as const,
    padding: "60px 0",
  },
};
