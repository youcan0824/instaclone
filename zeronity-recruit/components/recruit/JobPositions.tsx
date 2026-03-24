import { positions } from "@/data/recruit";
import SectionHeading from "@/components/ui/SectionHeading";

export default function JobPositions() {
  const categories = Array.from(new Set(positions.map((p) => p.category)));

  return (
    <section className="py-24 bg-bg-primary">
      <div className="max-w-5xl mx-auto px-4">
        <SectionHeading label="POSITIONS" title="募集職種" />

        {categories.map((category) => (
          <div key={category} className="mb-12 last:mb-0">
            <h3 className="text-xl font-bold text-text-primary mb-6 border-l-4 border-accent-purple pl-4">
              {category === "コーポレート"
                ? "コーポレートスタッフ"
                : category}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {positions
                .filter((p) => p.category === category)
                .map((position) => (
                  <div
                    key={position.id}
                    className="bg-white/5 border border-white/10 rounded-xl p-6"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-lg font-bold text-text-primary">
                        {position.title}
                      </h4>
                      <span className="text-xs bg-accent-purple/20 text-accent-purple px-2 py-1 rounded-full shrink-0 ml-2">
                        {position.experience}
                      </span>
                    </div>
                    <p className="text-text-sub text-sm leading-relaxed">
                      {position.description}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
