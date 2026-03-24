export const fiveAttractions = [
  {
    key: "Purpose",
    title: "理念共感型の組織",
    description:
      "「好きなことで可能性を輝かせる」という理念に共感するメンバーが集まり、個人の成長と組織の成長が連動する環境です。",
  },
  {
    key: "Job",
    title: "成長を加速させるプロジェクト",
    description:
      "大手コンサルファーム出身のマネジャー陣のもと、戦略から実行まで一気通貫で経験できるプロジェクトアサインが特徴です。",
  },
  {
    key: "People",
    title: "切磋琢磨できる仲間",
    description:
      "20-30代が95%。同世代の仲間と高め合いながら、若くしてリーダーシップを発揮できる環境があります。",
  },
  {
    key: "Support",
    title: "手厚い育成・研修制度",
    description:
      "未経験からでも活躍できる独自の研修カリキュラム。資格取得支援や外部研修費用補助など、学びへの投資を惜しみません。",
  },
  {
    key: "Privilege",
    title: "働きやすさと福利厚生",
    description:
      "リモートワーク対応・フレックス制度に加え、社内イベントや部活動など、オンオフ問わず充実した環境を整えています。",
  },
];

export const freelanceAttractions = [
  {
    title: "高単価案件",
    description:
      "大手クライアント直案件が中心。スキルと経験に見合った適正な報酬をお支払いします。",
  },
  {
    title: "柔軟な働き方",
    description:
      "リモート可・週3日〜など、ライフスタイルに合わせた柔軟なアサインが可能です。",
  },
  {
    title: "キャリア支援",
    description:
      "案件紹介だけでなく、スキルアップ研修への参加や正社員登用パスも用意しています。",
  },
];

export const dailySchedules = {
  junior: {
    label: "ジュニアコンサルタント",
    entries: [
      { time: "9:00", activity: "始業・メールチェック・タスク整理" },
      { time: "9:30", activity: "チーム朝会（進捗共有・課題確認）" },
      { time: "10:00", activity: "クライアント定例ミーティング" },
      { time: "11:00", activity: "議事録作成・タスク整理" },
      { time: "12:00", activity: "ランチ" },
      { time: "13:00", activity: "リサーチ・データ分析" },
      { time: "15:00", activity: "資料作成（提案書・報告書）" },
      { time: "17:00", activity: "マネジャーレビュー・フィードバック" },
      { time: "18:00", activity: "翌日準備・退勤" },
    ],
  },
  manager: {
    label: "マネジャー",
    entries: [
      { time: "9:00", activity: "始業・プロジェクト状況確認" },
      { time: "9:30", activity: "チーム朝会（方針指示・課題解決）" },
      { time: "10:00", activity: "クライアント役員ミーティング" },
      { time: "11:30", activity: "提案書レビュー・メンバー指導" },
      { time: "12:00", activity: "ランチ（クライアントと会食も）" },
      { time: "13:30", activity: "新規案件の提案準備" },
      { time: "15:00", activity: "社内戦略ミーティング" },
      { time: "16:30", activity: "メンバー1on1・育成面談" },
      { time: "18:00", activity: "経営会議・退勤" },
    ],
  },
  corporate: {
    label: "コーポレートスタッフ",
    entries: [
      { time: "9:00", activity: "始業・メール対応" },
      { time: "9:30", activity: "採用面談・候補者対応" },
      { time: "11:00", activity: "社内制度企画・運用改善" },
      { time: "12:00", activity: "ランチ" },
      { time: "13:00", activity: "経理処理・労務管理" },
      { time: "15:00", activity: "社内イベント企画・準備" },
      { time: "16:30", activity: "マネジメント報告・相談" },
      { time: "18:00", activity: "退勤" },
    ],
  },
};

export const careerLevels = [
  {
    level: 1,
    title: "アナリスト",
    description: "基礎スキル習得期間。リサーチ・データ収集・資料作成を担当。",
    years: "1〜2年目",
  },
  {
    level: 2,
    title: "コンサルタント",
    description:
      "自律的にタスクを遂行。クライアントとの直接コミュニケーションも担当。",
    years: "2〜4年目",
  },
  {
    level: 3,
    title: "シニアコンサルタント",
    description:
      "ワークストリームのリード。後輩育成やクライアントへの提案も主導。",
    years: "3〜5年目",
  },
  {
    level: 4,
    title: "マネジャー",
    description:
      "プロジェクト全体の管理・推進。クライアントリレーション構築と収益管理を担う。",
    years: "5〜8年目",
  },
  {
    level: 5,
    title: "シニアマネジャー",
    description:
      "複数プロジェクトの統括。事業開発や組織マネジメントにも携わる。",
    years: "7〜10年目",
  },
  {
    level: 6,
    title: "ディレクター",
    description:
      "経営レベルの意思決定に参画。事業戦略の立案と組織全体の方向性を牽引。",
    years: "10年目〜",
  },
];

export const alumniStories = [
  {
    name: "Tさん",
    currentRole: "大手コンサルファーム シニアコンサルタント",
    zeronityYears: "3年間在籍",
    comment:
      "Zeronityで学んだ「現場に入り込む力」は、どのファームでも通用するスキルです。若手のうちから裁量を持って働けた経験が、今のキャリアの基盤になっています。",
  },
  {
    name: "Fさん",
    currentRole: "ITスタートアップ COO",
    zeronityYears: "4年間在籍",
    comment:
      "事業を立ち上げる力はZeronityで養われました。コンサルティングとスタートアップの両方の視点を持てたことが、今の経営に活きています。",
  },
  {
    name: "Sさん",
    currentRole: "外資IT企業 プロジェクトマネジャー",
    zeronityYears: "2年間在籍",
    comment:
      "未経験からIT業界に飛び込みましたが、Zeronityの育成環境のおかげで短期間でスキルアップできました。卒業後も良い関係が続いています。",
  },
];

export const benefits = [
  {
    category: "成長支援",
    items: [
      "資格取得支援制度（受験費用全額負担）",
      "外部研修・セミナー費用補助",
      "書籍購入補助",
      "社内勉強会・ナレッジ共有会",
    ],
  },
  {
    category: "働き方",
    items: [
      "リモートワーク対応",
      "フレックスタイム制度",
      "副業OK（事前申請制）",
      "有給休暇取得推奨（取得率80%以上）",
    ],
  },
  {
    category: "コミュニティ",
    items: [
      "社内部活動（フットサル・ゴルフ・ボードゲームなど）",
      "四半期キックオフイベント",
      "社員旅行（年1回）",
      "メンター制度",
    ],
  },
];

export const cultureEvents = [
  {
    name: "四半期キックオフ",
    description:
      "全社員が集まり、業績振り返りと次四半期の方針を共有。表彰式やチームビルディングも実施。",
    frequency: "年4回",
  },
  {
    name: "LT大会（Lightning Talks）",
    description:
      "社員が自由なテーマで5分間のプレゼンを行う社内イベント。技術・ビジネス・趣味など多様なテーマが登場。",
    frequency: "月1回",
  },
  {
    name: "社員旅行",
    description:
      "年に1回の社員旅行。チームの垣根を越えた交流の場として、毎年企画を工夫しています。",
    frequency: "年1回",
  },
];
