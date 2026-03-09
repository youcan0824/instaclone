"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();

  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
        <Link href="/" style={styles.logo}>
          youcando-it.jp
        </Link>
        <div style={styles.links}>
          <Link
            href="/"
            style={pathname === "/" ? styles.activeLink : styles.link}
          >
            フィード
          </Link>
          <Link
            href="/post/new"
            style={pathname === "/post/new" ? styles.activeLink : styles.link}
          >
            投稿する
          </Link>
          <span style={styles.user}>{userEmail}</span>
          <form action="/auth/signout" method="post" style={{ margin: 0 }}>
            <button type="submit" style={styles.logoutBtn}>
              ログアウト
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

const styles: Record<string, React.CSSProperties> = {
  nav: {
    background: "#fff",
    borderBottom: "1px solid #e5e5e5",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  inner: {
    maxWidth: 800,
    margin: "0 auto",
    padding: "0 20px",
    height: 56,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    fontSize: 18,
    fontWeight: 700,
    color: "#333",
    textDecoration: "none",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    fontSize: 14,
  },
  link: {
    color: "#666",
    textDecoration: "none",
    padding: "6px 12px",
    borderRadius: 6,
  },
  activeLink: {
    color: "#0070f3",
    textDecoration: "none",
    padding: "6px 12px",
    borderRadius: 6,
    backgroundColor: "#f0f7ff",
    fontWeight: 600,
  },
  user: {
    color: "#999",
    fontSize: 13,
  },
  logoutBtn: {
    padding: "6px 12px",
    backgroundColor: "transparent",
    color: "#666",
    border: "1px solid #ddd",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 13,
  },
};
