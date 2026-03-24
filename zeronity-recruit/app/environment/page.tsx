import type { Metadata } from "next";
import FiveAttractions from "@/components/environment/FiveAttractions";
import FreelanceSection from "@/components/environment/FreelanceSection";
import DailySchedule from "@/components/environment/DailySchedule";
import CareerPath from "@/components/environment/CareerPath";
import Benefits from "@/components/environment/Benefits";
import CTAButtons from "@/components/ui/CTAButtons";

export const metadata: Metadata = {
  title: "働く環境 | 採用情報 | Zeronity株式会社",
  description:
    "Zeronityで働く魅力、キャリアパス、福利厚生、1日のスケジュールなどをご紹介します。",
};

export default function EnvironmentPage() {
  return (
    <>
      <FiveAttractions />
      <CareerPath />
      <DailySchedule />
      <Benefits />
      <FreelanceSection />

      <section className="py-24 bg-bg-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <CTAButtons className="justify-center" />
        </div>
      </section>
    </>
  );
}
