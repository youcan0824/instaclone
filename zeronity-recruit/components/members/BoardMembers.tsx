import Image from "next/image";
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
                <div className="w-full h-64 relative rounded-lg overflow-hidden mb-6 bg-white/10">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
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
