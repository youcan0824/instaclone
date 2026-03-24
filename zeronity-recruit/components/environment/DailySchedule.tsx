"use client";

import { useState } from "react";
import { dailySchedules } from "@/data/environment";
import SectionHeading from "@/components/ui/SectionHeading";

const tabs = [
  { key: "junior" as const, label: "若手メンバー" },
  { key: "manager" as const, label: "プロジェクトマネージャー" },
  { key: "corporate" as const, label: "コーポレートスタッフ" },
];

export default function DailySchedule() {
  const [activeTab, setActiveTab] = useState<keyof typeof dailySchedules>("junior");
  const schedule = dailySchedules[activeTab];

  return (
    <section className="py-24 bg-bg-primary">
      <div className="max-w-3xl mx-auto px-4">
        <SectionHeading label="WORK STYLE" title="1日のスケジュール" />

        {/* Tab buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-gradient-accent text-white"
                  : "text-text-sub hover:text-text-primary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative pl-8">
          {/* Vertical line */}
          <div
            className="absolute left-3 top-2 bottom-2 w-px"
            style={{
              background: "linear-gradient(180deg, #7a00df, #e8380d)",
            }}
          />

          <div className="flex flex-col gap-6">
            {schedule.entries.map((entry) => (
              <div key={entry.time} className="relative flex items-start gap-4">
                {/* Dot on the line */}
                <div className="absolute -left-[17px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent-purple border-2 border-bg-primary" />

                <span className="text-accent-purple font-mono text-sm font-semibold min-w-[48px]">
                  {entry.time}
                </span>
                <span className="text-text-primary text-sm">
                  {entry.activity}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
