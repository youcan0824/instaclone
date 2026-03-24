import { freelanceAttractions } from "@/data/environment";
import SectionHeading from "@/components/ui/SectionHeading";

export default function FreelanceSection() {
  return (
    <section className="py-24 bg-bg-secondary">
      <div className="max-w-5xl mx-auto px-4">
        <SectionHeading label="FOR FREELANCE" title="フリーコンサルの方へ" />


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {freelanceAttractions.map((item) => (
            <div
              key={item.title}
              className="bg-white/5 rounded-xl p-6 border-l-4"
              style={{
                borderImage: "linear-gradient(180deg, #7a00df, #e8380d) 1",
              }}
            >
              <h3 className="text-text-primary font-bold text-lg">
                {item.title}
              </h3>
              <p className="text-text-sub mt-3 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
