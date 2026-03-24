type GradientTextProps = {
  children: React.ReactNode;
};

export default function GradientText({ children }: GradientTextProps) {
  return <span className="gradient-text">{children}</span>;
}
