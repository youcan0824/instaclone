type SectionHeadingProps = {
  label: string;
  title: string;
  subtitle?: string;
};

export default function SectionHeading({ label, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="text-center mb-12">
      <span className="section-label">{label}</span>
      <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-text-primary">
        {title}
      </h2>
      {subtitle && (
        <p className="text-text-sub mt-3">{subtitle}</p>
      )}
    </div>
  );
}
