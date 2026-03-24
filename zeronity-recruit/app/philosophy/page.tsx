import type { Metadata } from "next";
import PhilosophySection from "@/components/philosophy/PhilosophySection";
import VisionSection from "@/components/philosophy/VisionSection";
import ValuesSection from "@/components/philosophy/ValuesSection";
import CTAButtons from "@/components/ui/CTAButtons";

export const metadata: Metadata = {
  title: "理念・ビジョン | 採用情報 | Zeronity株式会社",
  description:
    "Zeronityが大切にしている理念・ビジョン・バリューをご紹介します。",
};

export default function PhilosophyPage() {
  return (
    <>
      <PhilosophySection />
      <VisionSection />
      <ValuesSection />

      <section className="py-24 bg-bg-secondary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <CTAButtons className="justify-center" />
        </div>
      </section>
    </>
  );
}
