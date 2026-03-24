import { fiveAttractions } from "@/data/environment";
import SectionHeading from "@/components/ui/SectionHeading";

export default function FiveAttractions() {
  const firstThree = fiveAttractions.slice(0, 3);
  const lastTwo = fiveAttractions.slice(3);

  return (
    <section className="py-24 bg-bg-primary">
      <div className="max-w-5xl mx-auto px-4">
        <SectionHeading label="ENVIRONMENT" title="Zeronityで働く5つの魅力" />


        {/* First 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {firstThree.map((item, i) => (
            <Card key={item.key} item={item} index={i} />
          ))}
        </div>

        {/* Last 2 cards — centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 max-w-[680px] mx-auto">
          {lastTwo.map((item, i) => (
            <Card key={item.key} item={item} index={i + 3} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ item, index }: { item: (typeof fiveAttractions)[number]; index: number }) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <span className="gradient-text text-3xl font-bold">{num}</span>
      <p className="text-text-primary font-bold text-lg mt-3">{item.key}</p>
      <p className="text-text-primary mt-1">{item.title}</p>
      <p className="text-text-sub mt-2 text-sm leading-relaxed">
        {item.description}
      </p>
    </div>
  );
}
