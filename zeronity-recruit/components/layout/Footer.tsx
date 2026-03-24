import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <h3 className="text-lg font-bold font-heading mb-2">Zeronity株式会社</h3>
            <p className="text-sm text-text-sub leading-relaxed">
              〒160-0004<br />
              東京都新宿区四谷3-11 岡崎ビル4F
            </p>
            <p className="text-sm text-text-sub mt-2">
              TEL: 03-6383-3866<br />
              FAX: 03-6383-4778
            </p>
            <a
              href="https://maps.app.goo.gl/oYPjyMEbaALemgst8"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent-purple hover:underline mt-2 inline-block"
            >
              Google Map
            </a>
          </div>

          {/* Site links */}
          <div>
            <h4 className="text-sm font-semibold text-text-label uppercase tracking-wider mb-3">
              採用情報
            </h4>
            <ul className="space-y-2">
              <li><Link href="/philosophy" className="text-sm text-text-sub hover:text-text-primary transition-colors">理念・ビジョン</Link></li>
              <li><Link href="/business" className="text-sm text-text-sub hover:text-text-primary transition-colors">事業内容</Link></li>
              <li><Link href="/environment" className="text-sm text-text-sub hover:text-text-primary transition-colors">働く環境</Link></li>
              <li><Link href="/members" className="text-sm text-text-sub hover:text-text-primary transition-colors">メンバー</Link></li>
              <li><Link href="/recruit" className="text-sm text-text-sub hover:text-text-primary transition-colors">募集要項</Link></li>
            </ul>
          </div>

          {/* Corporate links */}
          <div>
            <h4 className="text-sm font-semibold text-text-label uppercase tracking-wider mb-3">
              Links
            </h4>
            <ul className="space-y-2">
              <li><a href="https://www.0-i.co.jp/" target="_blank" rel="noopener noreferrer" className="text-sm text-text-sub hover:text-text-primary transition-colors">コーポレートサイト</a></li>
              <li><a href="https://www.0-i.co.jp/contact" target="_blank" rel="noopener noreferrer" className="text-sm text-text-sub hover:text-text-primary transition-colors">お問い合わせ</a></li>
              <li><a href="https://0-i.farm/" target="_blank" rel="noopener noreferrer" className="text-sm text-text-sub hover:text-text-primary transition-colors">起業家ファーム</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-text-label uppercase tracking-wider mb-3">
              Social
            </h4>
            <ul className="space-y-2">
              <li><a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-sm text-text-sub hover:text-text-primary transition-colors">Facebook</a></li>
              <li><a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-sm text-text-sub hover:text-text-primary transition-colors">Instagram</a></li>
            </ul>
            <p className="text-sm text-text-sub mt-4">
              <a href="mailto:info@0-i.co.jp" className="hover:text-text-primary transition-colors">info@0-i.co.jp</a>
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 text-center text-xs text-text-label">
          &copy; {new Date().getFullYear()} Zeronity Co.,Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
