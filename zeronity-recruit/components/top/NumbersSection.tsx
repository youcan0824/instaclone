import { companyNumbers } from "@/data/company";
import CountUpNumber from "@/components/ui/CountUpNumber";
import SectionHeading from "@/components/ui/SectionHeading";

export default function NumbersSection() {
  return (
    <section className="py-24 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          label="ZERONITY IN NUMBERS"
          title="数字で見る Zeronity"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {companyNumbers.map((item) => (
            <CountUpNumber
              key={item.label}
              end={item.end}
              suffix={item.suffix}
              label={item.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
