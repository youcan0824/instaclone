import { careerLevels } from "@/data/environment";
import SectionHeading from "@/components/ui/SectionHeading";

const branches = [
  { title: "起業家", description: "自ら事業を立ち上げ、経営者として独立" },
  { title: "経営層", description: "Zeronity内で経営に参画し、事業を牽引" },
  { title: "経営コンサル", description: "専門性を極め、外部コンサルタントとして活躍" },
];

export default function CareerPath() {
  const reversed = [...careerLevels].reverse();

  return (
    <section className="py-24 bg-bg-secondary">
      <div className="max-w-4xl mx-auto px-4">
        <SectionHeading label="CAREER PATH" title="キャリアパス" />

        {/* Staircase visual */}
        <div className="flex flex-col gap-2 mb-16">
          {reversed.map((level, i) => {
            const opacity = 0.4 + (reversed.length - 1 - i) * 0.12;
            const indentPx = (reversed.length - 1 - i) * 40;

            return (
              <div
                key={level.level}
                className="flex items-center gap-4"
                style={{ marginLeft: `${indentPx}px` }}
              >
                <div
                  className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                  style={{
                    background:
                      i < 2
                        ? "linear-gradient(135deg, #7a00df, #e8380d)"
                        : `rgba(122, 0, 223, ${opacity})`,
                  }}
                >
                  {level.level}
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg px-5 py-3 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                    <span className="text-text-primary font-bold">
                      {level.title}
                    </span>
                    <span className="text-text-sub text-xs">{level.years}</span>
                  </div>
                  <p className="text-text-sub text-sm mt-1">
                    {level.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Multi-track career */}
        <div>
          <h3 className="text-center text-xl font-bold text-text-primary mb-6">
            複線型キャリア
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {branches.map((b) => (
              <div
                key={b.title}
                className="bg-white/5 border border-white/10 rounded-xl p-5 text-center"
              >
                <p className="gradient-text font-bold text-lg">{b.title}</p>
                <p className="text-text-sub text-sm mt-2">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
