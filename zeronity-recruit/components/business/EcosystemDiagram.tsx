import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";

export default function EcosystemDiagram() {
  return (
    <section className="py-24 bg-bg-primary">
      <div className="max-w-5xl mx-auto px-4">
        <SectionHeading label="ECOSYSTEM" title="事業開発のエコシステム" />

        <div className="mt-8 space-y-8">
          <Image src="/images/pdf-p11.png" alt="エコシステム概要図" width={960} height={540} className="rounded-xl w-full h-auto" />
        </div>
      </div>
    </section>
  );
}
