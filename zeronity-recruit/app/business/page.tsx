import type { Metadata } from "next";
import EcosystemDiagram from "@/components/business/EcosystemDiagram";
import BusinessCreation from "@/components/business/BusinessCreation";
import IndustryScope from "@/components/business/IndustryScope";
import DifferentiationTable from "@/components/business/DifferentiationTable";
import CTAButtons from "@/components/ui/CTAButtons";

export const metadata: Metadata = {
  title: "事業内容 | 採用情報 | Zeronity株式会社",
  description:
    "Zeronityの3つの事業と、Business Creatorとしての支援内容をご紹介します。",
};

export default function BusinessPage() {
  return (
    <>
      <EcosystemDiagram />
      <BusinessCreation />
      <IndustryScope />
      <DifferentiationTable />

      <section className="py-24 bg-bg-secondary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <CTAButtons className="justify-center" />
        </div>
      </section>
    </>
  );
}
