type CTAButtonsProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClasses = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-8 py-3.5 text-base",
  lg: "px-10 py-4 text-lg",
};

export default function CTAButtons({ size = "md", className = "" }: CTAButtonsProps) {
  const sizeClass = sizeClasses[size];

  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
      <a
        href="https://jp.indeed.com/"
        target="_blank"
        rel="noopener noreferrer"
        className={`bg-gradient-accent text-white font-bold rounded-lg text-center transition-opacity hover:opacity-90 ${sizeClass}`}
      >
        Indeed で応募する
      </a>
      <a
        href="https://en-gage.net/"
        target="_blank"
        rel="noopener noreferrer"
        className={`border border-white/30 text-white font-bold rounded-lg text-center transition-colors hover:bg-white/10 ${sizeClass}`}
      >
        engage で応募する
      </a>
    </div>
  );
}
