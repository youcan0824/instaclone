import CTAButtons from "@/components/ui/CTAButtons";

export default function MessageCTA() {
  return (
    <section className="py-24 bg-gradient-section">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary leading-relaxed">
          全ての人が新しい価値を想像し、
          <br className="hidden sm:inline" />
          全く新しい世界を起動する。
        </h2>
        <p className="text-text-sub mt-6 leading-relaxed">
          その覚悟と情熱を持ち、私たちと共に挑戦してくださる方をお待ちしています。
        </p>
        <div className="mt-10 flex justify-center">
          <CTAButtons size="lg" />
        </div>
      </div>
    </section>
  );
}
