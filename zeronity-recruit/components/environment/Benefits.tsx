import Image from "next/image";
import { benefits } from "@/data/environment";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Benefits() {
  return (
    <section className="py-24 bg-bg-secondary">
      <div className="max-w-5xl mx-auto px-4">
        <SectionHeading label="BENEFITS" title="福利厚生" />

        <div className="mt-8 mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Image src="/images/pdf-p26.png" alt="待遇・福利厚生について" width={960} height={540} className="rounded-xl w-full h-auto" />
          <Image src="/images/pdf-p27.png" alt="カルチャーを共有する取り組み" width={960} height={540} className="rounded-xl w-full h-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((group) => (
            <div key={group.category}>
              <h3 className="gradient-text font-bold text-lg mb-4">
                {group.category}
              </h3>
              <ul className="flex flex-col gap-2">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <span className="text-accent-purple mt-0.5 shrink-0">&#10003;</span>
                    <span className="text-text-primary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
