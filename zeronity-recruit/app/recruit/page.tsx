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

export default function RecruitPage() {
  return (
    <>
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
