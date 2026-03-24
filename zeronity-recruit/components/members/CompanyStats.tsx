import { companyStats } from "@/data/members";
import SectionHeading from "@/components/ui/SectionHeading";

export default function CompanyStats() {
  const { employees, ageDistribution } = companyStats;

  // Build conic-gradient segments
  let cumulativePercent = 0;
  const gradientSegments = ageDistribution.map((item, i) => {
    const start = cumulativePercent;
    cumulativePercent += item.percentage;
    const end = cumulativePercent;
    const colors = ["#7a00df", "#e8380d", "rgba(255,255,255,0.3)"];
    return `${colors[i]} ${start}% ${end}%`;
  });

  const donutStyle = {
    background: `conic-gradient(${gradientSegments.join(", ")})`,
  };

  const legendColors = ["bg-accent-purple", "bg-accent-red", "bg-white/30"];

  return (
    <section className="py-24 bg-bg-primary">
      <div className="max-w-5xl mx-auto px-4">
        <SectionHeading label="ABOUT US" title="数字で見るZeronity" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Age distribution donut chart */}
          <div className="flex items-center justify-center gap-8">
            <div className="relative w-48 h-48">
              <div
                className="w-full h-full rounded-full"
                style={donutStyle}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-28 h-28 rounded-full bg-bg-primary" />
              </div>
            </div>

            <div className="space-y-3">
              {ageDistribution.map((item, i) => (
                <div key={item.range} className="flex items-center gap-3">
                  <span
                    className={`w-3 h-3 rounded-full ${legendColors[i]}`}
                  />
                  <span className="text-text-primary text-sm">
                    {item.range}
                  </span>
                  <span className="text-text-sub text-sm font-semibold">
                    {item.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Employee count */}
          <div className="text-center md:text-left">
            <p className="text-text-sub text-sm mb-2">社員数</p>
            <div className="flex items-end gap-2 justify-center md:justify-start">
              <span className="text-7xl font-bold text-text-primary font-heading">
                {employees}
              </span>
              <span className="text-2xl text-text-sub mb-2">名</span>
            </div>
            <p className="text-text-sub text-sm mt-2">
              (2026年3月時点)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
