"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

type QA = {
  question: string;
  answer: string;
};

type Interview = {
  name: string;
  title: string;
  subtitle: string;
  heroImage: string;
  photo: string;
  profile: string;
  qas: QA[];
};

const interviews: Interview[] = [
  {
    name: "永田 健",
    title: "Zeronityでのインターンシップの魅力とは",
    subtitle: "「無から有を創る」挑戦。AIの最適化からゼロイチのイベント企画まで、すべてを\u201C自分ごと\u201Dにする力。",
    heroImage: "/images/interview-nagata-hero.png",
    photo: "/images/interview-nagata-photo.png",
    profile: "立教大学4年 / インターン生",
    qas: [
      {
        question: "Zeronityインターンとして働いている理由を教えてください。",
        answer: "Zeronityでインターンを始めたきっかけは、一昨年の夏に参加した就職活動のイベントです。そこで当時コアメンバーだった方と出会い、キャリア面談をしていただく機会があったのですが、面談をする中で、その方が持つ「人の次の一歩を導き出す力」に強く惹かれました。私自身、人の願望や「これからどうなっていきたいか」というビジョンを明確にするお手伝いをしたい、という漠然とした思いがありました。\n\n「やりたいこと」や「なりたい姿」が、面談を通じて明確な言葉になり、具体的な行動に繋がっていく。その過程を体験することができ、「自分もこんな力を身につけたい」と強く思うようになりました。",
      },
      {
        question: "実際に行っている業務やプロジェクトについて教えてください。",
        answer: "現在、大きく分けて二つの業務に携わっています。一つはAIを活用したコンテンツ制作、もう一つはキャリアデザインに関するプロジェクトです。\n\nコンテンツ制作では、主にZeronityのサイトに掲載されている動画コンテンツの文字起こしと要約を担当しています。AIに的確な要約をさせるためのプロンプトは、日々表現を少しずつ変えながら出力結果を試し、最適化を図っています。\n\nもう一つのキャリアデザインに関するプロジェクトでは、長期インターンシップを希望する学生と企業様とを繋ぐ採用イベントを企画しています。このプロジェクトはまさにゼロからのスタートで、イベントの企画立案から進行、当日に向けた準備まで、運営全般を担っています。",
      },
      {
        question: "自身の成長をどのように感じますか？",
        answer: "Zeronityでの活動、特にキャリアデザインのプロジェクトを通じて、自身の成長を強く実感しています。このプロジェクトはまさに「無から有を創る」経験で、すべてが手探りの状態から始まりました。\n\n代表の圧倒的な行動の速さに触れることで、慎重に進めたいという自身のペースが、良い意味で引き上げられています。難易度が高いと感じる課題にも「やるしかない」と踏み出せるようになったのは、事業を次々と創り出す方々と一緒に働くからこそ得られた変化です。\n\n最終的には、起業という形で、自分が心から納得できるアイデアやサービスを世の中に提供したいと考えています。",
      },
      {
        question: "今後どのようなことに挑戦したいですか？",
        answer: "直近では、内定をいただいている企業にて27卒向けイベントの企画・運営メンバーに抜擢していただいたので、これを必ず成功させたいです。この活動には、Zeronityでの経験がダイレクトに活きています。\n\nもともとリーダー気質ではなかったのですが、Zeronityで物事を前に進める役割を何度も経験させていただいたおかげで、今ではこうした役割を担うことにも慣れ、苦に感じなくなりました。\n\nまた、AIへの興味も尽きないので、その活用スキルをさらに深め、業務効率化によって生まれた時間を、人間が本来やるべき創造的な仕事に充てるといった価値を創出することにも関心があります。",
      },
      {
        question: "Zeronityの魅力を教えてください。",
        answer: "何よりも「人」と「環境」にあると思います。将来起業や独立を目指しているような、成長意欲が非常に高い人が多く、日々大きな刺激を受けています。\n\n組織がフラットであるため、代表をはじめとする経営に近い立場の方々と非常に近い距離で関われることも、他にはない大きな魅力です。経営の視点を間近で学び、直接アドバイスをいただける機会は、非常に貴重な経験となっています。",
      },
      {
        question: "Zeronityでのインターンを検討中の方へメッセージをお願いします。",
        answer: "「主体性」が何よりも重要だということです。「これをやりたい」「こんなことに挑戦したい」と自ら声を上げ、仕事や機会を掴みに行く姿勢が不可欠です。\n\n代表から投げかけられた「今の仕事、自分で工夫して楽しんでる？」という一言で、私の考え方が変わりました。どんな仕事にも自分なりの面白さを見出そうと意識するようになりました。\n\nZeronityには、挑戦したいと声を上げれば、後押ししてくれる環境があります。「この環境を使い倒して、自分のやりたいことを実現するんだ」という強い意志を持って飛び込んできてほしいです。",
      },
    ],
  },
];

export default function InterviewArticle() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const interview = interviews[0];

  return (
    <section className="py-24 bg-bg-secondary">
      <div className="max-w-5xl mx-auto px-4">
        <SectionHeading
          label="INTERVIEW"
          title="社員インタビュー"
          subtitle="Zeronityで働くメンバーのリアルな声をお届けします"
        />

        {/* Hero card */}
        <div className="relative rounded-2xl overflow-hidden mb-12">
          <div className="relative w-full h-64 sm:h-80">
            <Image
              src={interview.heroImage}
              alt={interview.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 960px"
            />
          </div>
        </div>

        {/* Profile */}
        <div className="flex flex-col sm:flex-row gap-6 items-start mb-12">
          <div className="w-24 h-24 sm:w-32 sm:h-32 relative rounded-xl overflow-hidden shrink-0">
            <Image
              src={interview.photo}
              alt={interview.name}
              fill
              className="object-cover"
              sizes="128px"
            />
          </div>
          <div>
            <span className="text-xs text-accent-purple font-semibold tracking-wider uppercase">
              #{String(1).padStart(2, "0")} INTERVIEW
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold mt-2">
              {interview.name}
            </h3>
            <p className="text-text-sub text-sm mt-1">{interview.profile}</p>
            <p className="text-text-primary mt-3 text-base leading-relaxed">
              {interview.subtitle}
            </p>
          </div>
        </div>

        {/* Q&A Accordion */}
        <div className="space-y-4">
          {interview.qas.map((qa, i) => {
            const isOpen = expandedIndex === i;
            return (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedIndex(isOpen ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-start gap-4 cursor-pointer"
                >
                  <span className="gradient-text font-bold text-lg shrink-0">
                    Q{i + 1}
                  </span>
                  <span className="text-text-primary font-semibold text-base flex-1">
                    {qa.question}
                  </span>
                  <span className="text-text-sub shrink-0 mt-1">
                    {isOpen ? (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="4" y1="10" x2="16" y2="10" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="10" y1="4" x2="10" y2="16" />
                        <line x1="4" y1="10" x2="16" y2="10" />
                      </svg>
                    )}
                  </span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pl-16">
                        {qa.answer.split("\n\n").map((para, j) => (
                          <p
                            key={j}
                            className="text-text-sub text-sm leading-relaxed mb-3 last:mb-0"
                          >
                            {para}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
