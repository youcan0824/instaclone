import type { Metadata } from "next";
import JobPositions from "@/components/recruit/JobPositions";
import SelectionFlow from "@/components/recruit/SelectionFlow";
import FAQ from "@/components/recruit/FAQ";
import CTAButtons from "@/components/ui/CTAButtons";

export const metadata: Metadata = {
  title: "募集要項 | 採用情報 | Zeronity株式会社",
  description:
    "Zeronityの募集職種、選考フロー、よくある質問をご紹介します。",
};

const jobPostingJsonLd = {
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: "新規事業開発コンサルタント",
  description: "経営戦略〜実行支援まで幅広く支援を行います。",
  hiringOrganization: {
    "@type": "Organization",
    name: "Zeronity株式会社",
    sameAs: "https://www.0-i.co.jp/",
    logo: "https://recruit.0-i.co.jp/images/logo.png",
  },
  jobLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: "新宿区",
      addressRegion: "東京都",
      addressCountry: "JP",
    },
  },
  employmentType: "FULL_TIME",
  datePosted: "2026-03-24",
};

export default function RecruitPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingJsonLd) }}
      />
      <JobPositions />
      <SelectionFlow />
      <FAQ />

      <section className="py-24 bg-gradient-section">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-6">
            一緒に新しい世界を起動しませんか？
          </h2>
          <p className="text-text-sub mb-10 max-w-2xl mx-auto">
            Zeronityは、挑戦する人を全力で応援します。あなたのエントリーをお待ちしています。
          </p>
          <CTAButtons size="lg" className="justify-center" />
        </div>
      </section>
    </>
  );
}
