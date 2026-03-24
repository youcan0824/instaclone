import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company info */}
          <div>
            <h3 className="text-lg font-bold font-heading mb-2">Zeronity Inc.</h3>
            <p className="text-sm text-text-sub leading-relaxed">
              〒150-0043<br />
              東京都渋谷区道玄坂1-2-3<br />
              渋谷フクラス
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-text-label uppercase tracking-wider mb-3">
              Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.0-i.co.jp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-sub hover:text-text-primary transition-colors"
                >
                  コーポレートサイト
                </a>
              </li>
              <li>
                <Link
                  href="/recruit"
                  className="text-sm text-text-sub hover:text-text-primary transition-colors"
                >
                  募集要項
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-text-sub hover:text-text-primary transition-colors"
                >
                  プライバシーポリシー
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-text-label uppercase tracking-wider mb-3">
              Social
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.facebook.com/zeronity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-sub hover:text-text-primary transition-colors"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/zeronity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-sub hover:text-text-primary transition-colors"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 text-center text-xs text-text-label">
          &copy; {new Date().getFullYear()} Zeronity Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
