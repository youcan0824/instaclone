export const salaryTable = [
  {
    grade: "Executive A",
    title: "ディレクター",
    annualSalary: "1,200万円〜",
    monthly: "100万円〜",
  },
  {
    grade: "Executive B",
    title: "シニアマネジャー",
    annualSalary: "900万円〜1,200万円",
    monthly: "75万円〜100万円",
  },
  {
    grade: "Standard A",
    title: "マネジャー",
    annualSalary: "700万円〜900万円",
    monthly: "58万円〜75万円",
  },
  {
    grade: "Standard B",
    title: "シニアコンサルタント",
    annualSalary: "550万円〜700万円",
    monthly: "46万円〜58万円",
  },
  {
    grade: "Standard C",
    title: "コンサルタント",
    annualSalary: "400万円〜550万円",
    monthly: "33万円〜46万円",
  },
  {
    grade: "Standard D",
    title: "アナリスト",
    annualSalary: "300万円〜400万円",
    monthly: "25万円〜33万円",
  },
];

export const evaluationProcess = [
  {
    step: 1,
    title: "目標設定",
    timing: "期初（4月・10月）",
    description:
      "上長との面談で半期の目標を設定。定量・定性の両面からKPIを設定します。",
  },
  {
    step: 2,
    title: "中間レビュー",
    timing: "期中（7月・1月）",
    description:
      "目標の進捗確認と軌道修正。必要に応じて目標の再設定を行います。",
  },
  {
    step: 3,
    title: "期末評価",
    timing: "期末（9月・3月）",
    description:
      "自己評価→上長評価→評価会議の3段階で公正な評価を実施します。",
  },
  {
    step: 4,
    title: "フィードバック面談",
    timing: "評価確定後",
    description:
      "評価結果と次期の期待役割を丁寧にフィードバック。キャリア相談も行います。",
  },
];

export const evaluationAxes = [
  {
    axis: "パフォーマンス",
    weight: "40%",
    description:
      "プロジェクトでの成果・貢献度。クライアント評価も加味します。",
  },
  {
    axis: "コンピテンシー",
    weight: "40%",
    description:
      "スキル・能力の成長度合い。等級ごとに求められるコンピテンシーを明確に定義。",
  },
  {
    axis: "バリュー体現",
    weight: "20%",
    description:
      "Zeronityの5つのバリューをどれだけ体現しているか。360度評価も参考にします。",
  },
];
