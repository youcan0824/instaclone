export const positions = [
  {
    id: "consultant",
    category: "コンサルタント",
    title: "ITコンサルタント",
    type: "正社員",
    experience: "未経験〜経験者",
    description:
      "クライアントの課題解決を支援するITコンサルタント。戦略立案から実行支援まで一貫して携わります。未経験者も充実した研修制度で育成します。",
    requirements: [
      "大卒以上",
      "論理的思考力・コミュニケーション能力",
      "成長意欲が高い方",
      "IT業界への興味・関心",
    ],
    preferred: [
      "コンサルティング経験",
      "IT業界での業務経験",
      "英語力（TOEIC 700以上）",
      "プロジェクトマネジメント経験",
    ],
  },
  {
    id: "corporate-hr",
    category: "コーポレート",
    title: "人事・採用担当",
    type: "正社員",
    experience: "経験者優遇",
    description:
      "急成長する組織の人事戦略を担う。採用・育成・制度設計など、組織づくりの中核を担います。",
    requirements: [
      "人事・採用業務の実務経験1年以上",
      "コミュニケーション能力",
      "マルチタスク対応力",
    ],
    preferred: [
      "IT業界での人事経験",
      "採用媒体の運用経験",
      "人事制度設計の経験",
    ],
  },
  {
    id: "corporate-accounting",
    category: "コーポレート",
    title: "経理・財務担当",
    type: "正社員",
    experience: "経験者優遇",
    description:
      "会社の財務基盤を支える経理・財務業務全般を担当。IPOを視野に入れた管理体制の構築にも携わります。",
    requirements: [
      "経理実務経験2年以上",
      "日商簿記2級以上",
      "基本的なPCスキル（Excel等）",
    ],
    preferred: [
      "上場準備経験",
      "管理会計の経験",
      "税務申告の実務経験",
    ],
  },
  {
    id: "corporate-legal",
    category: "コーポレート",
    title: "法務担当",
    type: "正社員",
    experience: "経験者優遇",
    description:
      "契約書レビュー・コンプライアンス体制の構築など、会社の法務基盤を整備します。",
    requirements: [
      "法務実務経験2年以上",
      "契約書作成・レビュー経験",
      "法学部卒または同等の法的知識",
    ],
    preferred: [
      "IT業界での法務経験",
      "IPO準備における法務経験",
      "英文契約書の対応経験",
    ],
  },
  {
    id: "corporate-marketing",
    category: "コーポレート",
    title: "マーケティング担当",
    type: "正社員",
    experience: "経験者優遇",
    description:
      "コーポレートブランディングおよび採用マーケティングを担当。SNS運用・イベント企画・広報活動を推進します。",
    requirements: [
      "マーケティング実務経験1年以上",
      "SNS運用・コンテンツ制作経験",
      "企画力・実行力",
    ],
    preferred: [
      "BtoB企業でのマーケティング経験",
      "採用ブランディングの経験",
      "動画制作・デザインスキル",
    ],
  },
  {
    id: "corporate-sales",
    category: "コーポレート",
    title: "営業・事業開発担当",
    type: "正社員",
    experience: "経験者優遇",
    description:
      "新規クライアント開拓と既存クライアントとの関係深化を担う。コンサルティング案件の提案営業を行います。",
    requirements: [
      "法人営業経験2年以上",
      "提案書作成・プレゼンテーション能力",
      "目標達成意欲の高い方",
    ],
    preferred: [
      "IT・コンサルティング業界での営業経験",
      "SES・人材業界での営業経験",
      "大手企業への営業経験",
    ],
  },
  {
    id: "corporate-admin",
    category: "コーポレート",
    title: "総務・庶務担当",
    type: "正社員",
    experience: "未経験可",
    description:
      "オフィス管理・社内イベント運営・備品管理など、社員が働きやすい環境づくりを支えます。",
    requirements: [
      "基本的なPCスキル（Word・Excel・PowerPoint）",
      "コミュニケーション能力",
      "細やかな気配りができる方",
    ],
    preferred: [
      "総務・庶務の実務経験",
      "イベント企画・運営経験",
      "社内制度設計の経験",
    ],
  },
];

export const selectionFlows = {
  newgrad: {
    label: "新卒採用",
    steps: [
      { step: 1, title: "エントリー", description: "Webフォームからご応募" },
      { step: 2, title: "書類選考", description: "履歴書・ESの確認" },
      { step: 3, title: "適性検査", description: "オンライン適性検査" },
      { step: 4, title: "一次面接", description: "人事面接（オンライン）" },
      { step: 5, title: "最終面接", description: "役員面接（対面）" },
      { step: 6, title: "内定", description: "オファー面談" },
    ],
  },
  career: {
    label: "中途採用",
    steps: [
      { step: 1, title: "エントリー", description: "Webフォームまたはエージェント経由" },
      { step: 2, title: "書類選考", description: "職務経歴書の確認" },
      { step: 3, title: "一次面接", description: "マネジャー面接（オンライン）" },
      { step: 4, title: "最終面接", description: "役員面接（対面）" },
      { step: 5, title: "内定", description: "オファー面談・条件提示" },
    ],
  },
  freelance: {
    label: "フリーランス",
    steps: [
      { step: 1, title: "お問い合わせ", description: "Webフォームからご連絡" },
      { step: 2, title: "スキルシート確認", description: "経歴・スキルの確認" },
      { step: 3, title: "面談", description: "案件マッチング面談（オンライン）" },
      { step: 4, title: "クライアント面談", description: "案件先との面談" },
      { step: 5, title: "参画決定", description: "条件合意・契約締結" },
    ],
  },
};

export const faqs = [
  {
    question: "未経験でもコンサルタントとして応募できますか？",
    answer:
      "はい、未経験者も積極的に採用しています。充実した研修制度と先輩社員によるOJTで、最短3ヶ月でプロジェクト参画できるスキルを身につけられます。",
  },
  {
    question: "リモートワークは可能ですか？",
    answer:
      "プロジェクトやクライアントの方針により異なりますが、多くのプロジェクトでリモートワークを導入しています。フルリモート・ハイブリッドなど柔軟に対応しています。",
  },
  {
    question: "配属先やプロジェクトはどのように決まりますか？",
    answer:
      "本人の希望・スキル・キャリアプランを考慮した上で、最適なプロジェクトにアサインします。定期的な1on1で希望をヒアリングし、キャリアパスに沿ったアサインを心がけています。",
  },
  {
    question: "評価制度について教えてください。",
    answer:
      "半期ごとの目標管理制度を採用しています。パフォーマンス・コンピテンシー・バリュー体現の3軸で公正に評価し、昇給・昇格に反映します。",
  },
  {
    question: "副業は可能ですか？",
    answer:
      "事前申請制で副業を認めています。本業に支障がない範囲で、スキルアップや自己実現のための活動を応援しています。",
  },
  {
    question: "フリーランスとして参画する場合の契約形態は？",
    answer:
      "準委任契約が中心です。月額単価制で、スキル・経験に応じた報酬をお支払いします。契約期間は案件により異なりますが、3ヶ月〜が一般的です。",
  },
  {
    question: "入社後の研修制度について教えてください。",
    answer:
      "入社後2〜4週間の集中研修で、ビジネススキル・ITスキル・コンサルティングスキルの基礎を習得。その後はOJTで実践力を磨きます。資格取得支援制度もあります。",
  },
  {
    question: "選考にかかる期間はどのくらいですか？",
    answer:
      "書類選考から内定まで、最短2週間程度です。候補者の方のご都合に合わせて柔軟にスケジュール調整いたします。",
  },
];
