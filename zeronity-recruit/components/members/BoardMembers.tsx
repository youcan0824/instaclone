import { boardMembers } from "@/data/members";
import SectionHeading from "@/components/ui/SectionHeading";

export default function BoardMembers() {
  return (
    <section className="py-24 bg-bg-primary">
      <div className="max-w-5xl mx-auto px-4">
        <SectionHeading label="BOARD MEMBERS" title="ボードメンバー" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {boardMembers.map((member) => {
            const initials = member.name.slice(0, 1);

            return (
              <div
                key={member.name}
                className="bg-white/5 rounded-xl p-8"
              >
                <div className="w-full h-48 bg-white/10 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-4xl font-bold text-white/30">
                    {initials}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-text-primary">
                  {member.name}
                </h3>
                <p className="text-accent-purple text-sm font-medium mt-1 mb-4">
                  {member.role}
                </p>
                <p className="text-text-sub text-sm leading-relaxed">
                  {member.message}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
