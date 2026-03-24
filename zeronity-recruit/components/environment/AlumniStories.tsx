import { alumniStories } from "@/data/environment";
import SectionHeading from "@/components/ui/SectionHeading";

export default function AlumniStories() {
  return (
    <section className="py-24 bg-bg-primary">
      <div className="max-w-5xl mx-auto px-4">
        <SectionHeading label="CAREER" title="キャリア事例" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {alumniStories.map((story) => (
            <div
              key={story.name}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <p className="text-text-primary font-bold text-lg">
                {story.name}
              </p>
              <p className="text-text-sub text-xs mt-1">
                {story.zeronityYears}
              </p>

              <div className="mt-4 flex items-center gap-3 text-sm">
                <div>
                  <span className="text-text-sub text-xs">Before</span>
                  <p className="text-text-primary">Zeronity在籍</p>
                </div>
                <span className="text-accent-purple text-lg">&rarr;</span>
                <div>
                  <span className="text-text-sub text-xs">After</span>
                  <p className="text-text-primary">{story.currentRole}</p>
                </div>
              </div>

              <p className="text-text-sub text-sm mt-4 leading-relaxed">
                {story.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
