import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";

export default function BusinessCreation() {
  return (
    <section className="py-24 bg-bg-secondary">
      <div className="max-w-5xl mx-auto px-4">
        <SectionHeading
          label="BUSINESS CREATION"
          title="戦略策定から実行支援まで"
        />

        <div className="mt-8">
          <Image src="/images/pdf-p14.png" alt="戦略策定から実行支援まで" width={960} height={540} className="rounded-xl w-full h-auto" />
        </div>
      </div>
    </section>
  );
}
