import type { Metadata } from "next";
import SalaryTable from "@/components/compensation/SalaryTable";
import EvaluationSystem from "@/components/compensation/EvaluationSystem";
import CTAButtons from "@/components/ui/CTAButtons";

export const metadata: Metadata = {
  title: "評価・給与制度 | 採用情報 | Zeronity株式会社",
  description:
    "Zeronityの給与テーブル・評価制度をご紹介します。公正な評価と明確なキャリアパスで成長を支援します。",
};

export default function CompensationPage() {
  return (
    <>
      <SalaryTable />
      <EvaluationSystem />

      <section className="py-24 bg-bg-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <CTAButtons className="justify-center" />
        </div>
      </section>
    </>
  );
}
