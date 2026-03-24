import { salaryTable } from "@/data/compensation";
import SectionHeading from "@/components/ui/SectionHeading";

export default function SalaryTable() {
  return (
    <section className="py-24 bg-bg-primary">
      <div className="max-w-5xl mx-auto px-4">
        <SectionHeading label="SALARY" title="給与テーブル" />


        <div className="overflow-x-auto">
          <table className="w-full bg-white/5 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-white/10 text-text-primary text-sm">
                <th className="px-6 py-4 text-left font-semibold">ステージ</th>
                <th className="px-6 py-4 text-left font-semibold">クラス</th>
                <th className="px-6 py-4 text-left font-semibold">役職</th>
                <th className="px-6 py-4 text-left font-semibold">
                  給与レンジ（年俸）
                </th>
              </tr>
            </thead>
            <tbody>
              {salaryTable.map((row) => {
                const [stage, cls] = row.grade.split(" ");
                const isExecutive = stage === "Executive";

                return (
                  <tr
                    key={row.grade}
                    className={
                      isExecutive
                        ? "bg-gradient-accent text-white"
                        : "border-t border-white/5 text-text-primary"
                    }
                  >
                    <td className="px-6 py-4 font-medium">{stage}</td>
                    <td className="px-6 py-4">{cls}</td>
                    <td className="px-6 py-4">{row.title}</td>
                    <td className="px-6 py-4 font-semibold">
                      {row.annualSalary}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
