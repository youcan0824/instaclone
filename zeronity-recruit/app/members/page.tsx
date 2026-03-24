import type { Metadata } from "next";
import BoardMembers from "@/components/members/BoardMembers";
import EmployeeCards from "@/components/members/EmployeeCards";
import CompanyStats from "@/components/members/CompanyStats";
import CTAButtons from "@/components/ui/CTAButtons";

export const metadata: Metadata = {
  title: "メンバー紹介 | 採用情報 | Zeronity株式会社",
  description:
    "Zeronityのボードメンバー、社員紹介、会社の数字をご紹介します。",
};

export default function MembersPage() {
  return (
    <>
      <BoardMembers />
      <EmployeeCards />
      <CompanyStats />

      <section className="py-24 bg-bg-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <CTAButtons className="justify-center" />
        </div>
      </section>
    </>
  );
}
