"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();

  return (
    <>
      {/* Top Header */}
      <nav style={styles.nav}>
        <div style={styles.inner}>
          <Link href="/" className="logo-font" style={styles.logo}>
            InstaClone
          </Link>
          <div style={styles.icons}>
            <Link href="/post/new" style={styles.iconBtn} title="新規投稿">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            </Link>
            <form action="/auth/signout" method="post" style={{ margin: 0 }}>
              <button type="submit" style={styles.iconBtn} title="ログアウト">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                  <polyline points="16,17 21,12 16,7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </nav>

      {/* Bottom Navigation */}
      <nav style={styles.bottomNav}>
        <Link
          href="/"
          style={pathname === "/" ? styles.bottomIconActive : styles.bottomIcon}
          title="ホーム"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill={pathname === "/" ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9,22 9,12 15,12 15,22" />
          </svg>
        </Link>
        <Link
          href="/post/new"
          style={pathname === "/post/new" ? styles.bottomIconActive : styles.bottomIcon}
          title="新規投稿"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
        </Link>
        <Link
          href="/profile"
          style={pathname === "/profile" || pathname.startsWith("/profile/") ? styles.bottomIconActive : styles.bottomIcon}
          title="プロフィール"
        >
          <div style={{
            ...styles.avatarSmall,
            ...(pathname === "/profile" || pathname.startsWith("/profile/")
              ? { border: "2px solid #262626" }
              : {}),
          }}>
            {userEmail.charAt(0).toUpperCase()}
          </div>
        </Link>
      </nav>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  nav: {
    background: "#fff",
    borderBottom: "1px solid #dbdbdb",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  inner: {
    maxWidth: 470,
    margin: "0 auto",
    padding: "0 16px",
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    fontSize: 28,
    color: "#262626",
    textDecoration: "none",
  },
  icons: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  iconBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#262626",
    padding: 4,
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  bottomNav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    background: "#fff",
    borderTop: "1px solid #dbdbdb",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    zIndex: 100,
  },
  bottomIcon: {
    color: "#262626",
    padding: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
  },
  bottomIconActive: {
    color: "#262626",
    padding: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
  },
  avatarSmall: {
    width: 24,
    height: 24,
    borderRadius: "50%",
    backgroundColor: "#dbdbdb",
    color: "#262626",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: 600,
  },
};
