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
        <div className="relative w-72 h-72 mx-auto">
          {/* Top node */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full border border-white/20 bg-bg-primary flex items-center justify-center text-sm font-bold text-text-primary">
            {businesses[0].label}
          </div>

          {/* Bottom-left node */}
          <div className="absolute bottom-0 left-0 w-28 h-28 rounded-full border border-white/20 bg-bg-primary flex items-center justify-center text-sm font-bold text-text-primary">
            {businesses[1].label}
          </div>

          {/* Bottom-right node */}
          <div className="absolute bottom-0 right-0 w-28 h-28 rounded-full border border-white/20 bg-bg-primary flex items-center justify-center text-sm font-bold text-text-primary">
            {businesses[2].label}
          </div>

          {/* SVG arrows connecting nodes */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 288 288"
            fill="none"
          >
            {/* Top to Bottom-right */}
            <line
              x1="175" y1="85"
              x2="235" y2="195"
              stroke="url(#grad1)" strokeWidth="1.5"
              markerEnd="url(#arrowhead)"
            />
            {/* Bottom-right to Bottom-left */}
            <line
              x1="185" y1="245"
              x2="105" y2="245"
              stroke="url(#grad1)" strokeWidth="1.5"
              markerEnd="url(#arrowhead)"
            />
            {/* Bottom-left to Top */}
            <line
              x1="55" y1="195"
              x2="115" y2="85"
              stroke="url(#grad1)" strokeWidth="1.5"
              markerEnd="url(#arrowhead)"
            />

            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7a00df" />
                <stop offset="100%" stopColor="#e8380d" />
              </linearGradient>
              <marker
                id="arrowhead"
                markerWidth="8"
                markerHeight="6"
                refX="8"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#e8380d" />
              </marker>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
}
