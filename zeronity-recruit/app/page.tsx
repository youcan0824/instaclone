import HeroSection from "@/components/top/HeroSection";
import NumbersSection from "@/components/top/NumbersSection";
import NavCards from "@/components/top/NavCards";
import MessageCTA from "@/components/top/MessageCTA";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <NumbersSection />
      <NavCards />
      <MessageCTA />
    </main>
  );
}
