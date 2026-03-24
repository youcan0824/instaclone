import { philosophy } from "@/data/philosophy";
import SectionHeading from "@/components/ui/SectionHeading";

export default function VisionSection() {
  const businesses = [
    { label: "人材教育", position: "top" },
    { label: "業務支援", position: "bottom-left" },
    { label: "環境開発", position: "bottom-right" },
  ];

  return (
    <section className="py-24 bg-bg-secondary">
      <div className="max-w-5xl mx-auto px-4">
        <SectionHeading
          label="VISION"
          title="スタートアップファームの共創"
        />

        <p className="text-text-sub text-base md:text-lg leading-relaxed text-center max-w-3xl mx-auto mb-8">
          {philosophy.vision.description}
        </p>

        <p className="text-text-label text-lg tracking-wider text-center mb-16">
          {philosophy.vision.titleEn}
        </p>

        {/* Circular relationship diagram */}
        <div className="relative mx-auto" style={{ width: 320, height: 300 }}>
          <svg
            width="320"
            height="300"
            viewBox="0 0 320 300"
            fill="none"
            className="absolute inset-0"
          >
            <defs>
              <linearGradient id="grad-pr" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7a00df" />
                <stop offset="100%" stopColor="#e8380d" />
              </linearGradient>
              <marker
                id="arrow"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#e8380d" />
              </marker>
            </defs>

            {/* Arrow: 人材教育(top) → 業務支援(bottom-left) */}
            <line x1="120" y1="95" x2="75" y2="185" stroke="url(#grad-pr)" strokeWidth="2" markerEnd="url(#arrow)" />
            {/* Arrow: 業務支援(bottom-left) → 環境開発(bottom-right) */}
            <line x1="120" y1="240" x2="200" y2="240" stroke="url(#grad-pr)" strokeWidth="2" markerEnd="url(#arrow)" />
            {/* Arrow: 環境開発(bottom-right) → 人材教育(top) */}
            <line x1="245" y1="185" x2="200" y2="95" stroke="url(#grad-pr)" strokeWidth="2" markerEnd="url(#arrow)" />

            {/* Node circles */}
            {/* 人材教育 - top center */}
            <circle cx="160" cy="60" r="50" fill="#0a0a0a" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <text x="160" y="56" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">人材教育</text>
            <text x="160" y="74" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10">Education</text>

            {/* 業務支援 - bottom left */}
            <circle cx="65" cy="235" r="50" fill="#0a0a0a" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <text x="65" y="231" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">業務支援</text>
            <text x="65" y="249" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10">Consulting</text>

            {/* 環境開発 - bottom right */}
            <circle cx="255" cy="235" r="50" fill="#0a0a0a" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <text x="255" y="231" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">環境開発</text>
            <text x="255" y="249" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10">Space</text>
          </svg>
        </div>
      </div>
    </section>
  );
}
