import { benefits, cultureEvents } from "@/data/environment";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Benefits() {
  return (
    <section className="py-24 bg-bg-secondary">
      <div className="max-w-5xl mx-auto px-4">
        <SectionHeading label="BENEFITS" title="福利厚生" />

        {/* Benefits by category */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {benefits.map((group) => (
            <div key={group.category}>
              <h3 className="gradient-text font-bold text-lg mb-4">
                {group.category}
              </h3>
              <ul className="flex flex-col gap-2">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <span className="text-accent-purple mt-0.5 shrink-0">
                      &#10003;
                    </span>
                    <span className="text-text-primary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Culture events */}
        <div>
          <h3 className="text-center text-xl font-bold text-text-primary mb-6">
            カルチャーイベント
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cultureEvents.map((event) => (
              <div
                key={event.name}
                className="bg-white/5 border border-white/10 rounded-xl p-5"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-text-primary font-bold">{event.name}</h4>
                  <span className="text-accent-purple text-xs font-medium">
                    {event.frequency}
                  </span>
                </div>
                <p className="text-text-sub text-sm leading-relaxed">
                  {event.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
