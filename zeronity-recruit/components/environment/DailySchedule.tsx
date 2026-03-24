import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";

export default function DailySchedule() {
  return (
    <section className="py-24 bg-bg-primary">
      <div className="max-w-5xl mx-auto px-4">
        <SectionHeading label="WORK STYLE" title="1日のスケジュール" />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Image src="/images/pdf-p29.png" alt="若手メンバーの1日のスケジュール" width={960} height={540} className="rounded-xl w-full h-auto" />
          <Image src="/images/pdf-p30.png" alt="プロジェクトマネージャーの1日のスケジュール" width={960} height={540} className="rounded-xl w-full h-auto" />
        </div>
      </div>
    </section>
  );
}
