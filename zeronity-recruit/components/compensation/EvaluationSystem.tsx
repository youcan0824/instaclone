import { evaluationProcess, evaluationAxes } from "@/data/compensation";
import SectionHeading from "@/components/ui/SectionHeading";

export default function EvaluationSystem() {
  return (
    <section className="py-24 bg-bg-secondary">
      <div className="max-w-5xl mx-auto px-4">
        <SectionHeading label="EVALUATION" title="評価制度" />

        {/* Evaluation Axes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {evaluationAxes.map((item) => (
            <div
              key={item.axis}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-text-primary">
                  {item.axis}
                </h3>
                <span className="text-accent-purple font-bold text-lg">
                  {item.weight}
                </span>
              </div>
              <p className="text-text-sub text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Evaluation Cycle */}
        <h3 className="text-xl font-bold text-text-primary text-center mb-10">
          評価サイクル
        </h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          {evaluationProcess.map((step, index) => (
            <div key={step.step} className="flex items-center gap-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-center min-w-[140px]">
                <div className="w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center text-white font-bold mx-auto mb-3">
                  {step.step}
                </div>
                <h4 className="text-text-primary font-semibold text-sm">
                  {step.title}
                </h4>
                <p className="text-text-sub text-xs mt-1">{step.timing}</p>
              </div>
              {index < evaluationProcess.length - 1 && (
                <svg
                  className="w-6 h-6 text-white/30 shrink-0 hidden md:block"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
