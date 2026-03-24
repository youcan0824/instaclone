"use client";

import { useState } from "react";
import { selectionFlows } from "@/data/recruit";
import SectionHeading from "@/components/ui/SectionHeading";

type FlowKey = keyof typeof selectionFlows;

const tabKeys: FlowKey[] = ["newgrad", "career", "freelance"];

export default function SelectionFlow() {
  const [activeTab, setActiveTab] = useState<FlowKey>("newgrad");
  const activeFlow = selectionFlows[activeTab];

  return (
    <section className="py-24 bg-bg-secondary">
      <div className="max-w-5xl mx-auto px-4">
        <SectionHeading label="SELECTION" title="選考フロー" />


        {/* Tab buttons */}
        <div className="flex justify-center gap-2 mb-12">
          {tabKeys.map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === key
                  ? "bg-gradient-accent text-white"
                  : "bg-white/5 text-text-sub hover:bg-white/10"
              }`}
            >
              {selectionFlows[key].label}
            </button>
          ))}
        </div>

        {/* Steps */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-3">
          {activeFlow.steps.map((step, index) => (
            <div key={step.step} className="flex items-center gap-3">
              <div className="flex flex-col items-center text-center min-w-[100px]">
                <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center text-white font-bold text-lg mb-2">
                  {step.step}
                </div>
                <h4 className="text-text-primary font-semibold text-sm">
                  {step.title}
                </h4>
                <p className="text-text-sub text-xs mt-1 max-w-[120px]">
                  {step.description}
                </p>
              </div>
              {index < activeFlow.steps.length - 1 && (
                <div className="hidden md:block w-8 h-0.5 bg-white/20" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
