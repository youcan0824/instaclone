import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";

export default function VisionSection() {
  return (
    <section className="py-24 bg-bg-secondary">
      <div className="max-w-5xl mx-auto px-4">
        <SectionHeading
          label="VISION"
          title="スタートアップファームの共創"
        />

        <div className="mt-8">
          <Image src="/images/pdf-p6.png" alt="スタートアップファームの共創 - ビジョン" width={960} height={540} className="rounded-xl w-full h-auto" />
        </div>
      </div>
    </section>
  );
}
