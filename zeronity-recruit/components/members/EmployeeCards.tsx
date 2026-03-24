import SectionHeading from "@/components/ui/SectionHeading";

const employees = [
  {
    name: "T.S.",
    role: "ITコンサルタント / 入社2年目",
    comment: "未経験から入社し、半年でプロジェクトリーダーを任されました。",
  },
  {
    name: "M.K.",
    role: "シニアコンサルタント / 入社3年目",
    comment: "裁量が大きく、自分のアイデアをすぐに実践できる環境です。",
  },
  {
    name: "A.Y.",
    role: "マネジャー / 入社4年目",
    comment: "成長スピードが速く、若手でもどんどんチャンスをもらえます。",
  },
  {
    name: "R.N.",
    role: "コンサルタント / 入社1年目",
    comment: "研修が手厚く、安心してキャリアをスタートできました。",
  },
];

export default function EmployeeCards() {
  return (
    <section className="py-24 bg-bg-secondary">
      <div className="max-w-5xl mx-auto px-4">
        <SectionHeading label="TEAM" title="社員紹介" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {employees.map((emp) => (
            <div
              key={emp.name}
              className="bg-white/5 border border-white/10 rounded-xl p-6 text-center"
            >
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-bold text-white/30">
                  {emp.name}
                </span>
              </div>
              <h4 className="text-text-primary font-semibold text-sm">
                {emp.name}
              </h4>
              <p className="text-accent-purple text-xs mt-1 mb-3">
                {emp.role}
              </p>
              <p className="text-text-sub text-xs leading-relaxed">
                {emp.comment}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-text-sub text-sm">
          Coming soon - 社員インタビュー準備中
        </p>
      </div>
    </section>
  );
}
