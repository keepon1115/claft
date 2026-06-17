'use client';

import React, { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { ArrowDown, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';

type Speaker = 'child' | 'teacher' | 'parent';

type Line = {
  who: Speaker;
  text: string;
};

type Station = {
  n: string;
  tag: string;
  title: string;
  theme: ThemeName;
  bg: string;
  lines: Line[];
  note?: string;
  cta: string;
  ctaHref: string;
};

type ThemeName = 'red' | 'orange' | 'yellow' | 'green' | 'turquoise' | 'blue' | 'violet';

const THEMES: Record<
  ThemeName,
  {
    accent: string;
    soft: string;
    ink: string;
    bg: string;
    hat: string;
    tunic: string;
    pants: string;
  }
> = {
  red: {
    accent: '#d85a4a',
    soft: '#fde3dc',
    ink: '#8d3428',
    bg: '#fbf1ed',
    hat: '#d85a4a',
    tunic: '#f07861',
    pants: '#9b4037',
  },
  orange: {
    accent: '#ef8a3c',
    soft: '#fde8d3',
    ink: '#9a4a16',
    bg: '#fbf1e5',
    hat: '#ef8a3c',
    tunic: '#f4a55c',
    pants: '#ad5d21',
  },
  yellow: {
    accent: '#d9a928',
    soft: '#fff1bf',
    ink: '#7f620c',
    bg: '#fbf5df',
    hat: '#d9a928',
    tunic: '#f1c94f',
    pants: '#96751d',
  },
  green: {
    accent: '#74ab3d',
    soft: '#e4f0d5',
    ink: '#426c20',
    bg: '#eef4e7',
    hat: '#74ab3d',
    tunic: '#92bf5a',
    pants: '#527f2a',
  },
  turquoise: {
    accent: '#1d9e75',
    soft: '#d7ede4',
    ink: '#0f6e56',
    bg: '#e8f2ed',
    hat: '#1d9e75',
    tunic: '#38b890',
    pants: '#126f58',
  },
  blue: {
    accent: '#3d7fc2',
    soft: '#dfeafb',
    ink: '#224f83',
    bg: '#edf2f8',
    hat: '#3d7fc2',
    tunic: '#5d98d4',
    pants: '#25598f',
  },
  violet: {
    accent: '#8b62c8',
    soft: '#eadff8',
    ink: '#5b3c8d',
    bg: '#f3edf8',
    hat: '#8b62c8',
    tunic: '#a57ed8',
    pants: '#62429c',
  },
};

const STATIONS: Station[] = [
  {
    n: '①',
    tag: 'ワクワク',
    title: '好きなものを、好きなだけ！',
    theme: 'red',
    bg: THEMES.red.bg,
    lines: [
      {
        who: 'child',
        text: 'ぼく、ロボットを動かしたい！だからロボットプログラミングをやってみる！……あ、でも、となりの子がやってるマイクラも楽しそうやなぁ…',
      },
      {
        who: 'teacher',
        text: 'お、気になる？ ほな、ちょっと隣のぞいてみよか！ウチはロボットもマイクラも、英会話も工作も、好きなものを好きなだけ選んでええんやで',
      },
      {
        who: 'parent',
        text: 'その日の気分で、子どもと一緒に「今日何する？」って決めるのがすごく新鮮です。曜日や時間を自由に選べたり、パソコンや教材を無料で貸してもらえるのも助かります。何より、家では落ち着きのない子が、あんなに集中して作っている姿、初めて見たかも…！',
      },
      {
        who: 'teacher',
        text: 'そうなんです。自分の「好き」から入ると、子どもたちの集中力って本当にすごいんですよ。ウチでは、作った作品を自分で紹介する動画を撮って、親御さんにお送りしています。自分の言葉で「ここを工夫した！」って伝えることで、表現力も自然と身についていくんです',
      },
    ],
    note: '“ワクワク”から始まるオーダーメイド学習。1コマ60分・定員5名・いつでも入会OK。',
    cta: '受講申し込みをする',
    ctaHref: 'https://select-type.com/rsv/?id=3spOTwJvnpQ&c_id=429087',
  },
  {
    n: '②',
    tag: 'チャレンジ',
    title: 'ドキドキがワクワクに変わる！「発表」へのチャレンジ',
    theme: 'orange',
    bg: THEMES.orange.bg,
    lines: [
      {
        who: 'child',
        text: 'やってみたいけど、上手に発表できるかな……。みんなの前で失敗したらカッコ悪いし、ちょっと緊張するなぁ',
      },
      {
        who: 'teacher',
        text: 'うん緊張するよな。でもテーマは何でもエエんやで。ペットのことでも、今集めてるカードのことでも。自分で「これ伝えたい！」って考えて紹介できたら、それだけで100点満点。勇気を出して自分のことを伝えることが、一生の自信になるんやで',
      },
      {
        who: 'child',
        text: '発表が終わったあと、みんなからコメントがついた「参加賞状」がもらえるの、照れくさいけどうれしいなぁ！次はどんなものを発表しようかな！',
      },
      {
        who: 'parent',
        text: '送られてきた発表動画を見て、「うちの子、こんなこと考えて作ってたんだ！」って本当に驚きました。家では見られない、一回り大きくなったような成長した姿が見られて、すごく嬉しいです',
      },
    ],
    cta: 'なんでも発表会・展示会について',
    ctaHref: '/futurecraft/Exhibition',
  },
  {
    n: '③',
    tag: 'ひろげる',
    title: 'イベントに参加！そして、自分でイベントを作っちゃう！？',
    theme: 'yellow',
    bg: THEMES.yellow.bg,
    lines: [
      {
        who: 'child',
        text: 'うーん、最近なんかちょっと退屈やなぁ。おもしろいことないかなぁ…',
      },
      {
        who: 'teacher',
        text: 'それなら、いっぺんウチのイベントに遊びにおいでや！スタッフが作った謎解きゲームもあれば、みんなで企画した「ガチの紙飛行機大会」なんかもあるで。参加して遊ぶのはもちろん、「これやりたい！」って自分でイベントを作る側にまわってもええんやで！',
      },
      {
        who: 'child',
        text: 'えっ！イベントって、先生じゃなくて自分たちで作ってもいいんや！おもしろそう！',
      },
      {
        who: 'parent',
        text: '覗いてみて驚いたのは、いろんな学年の子が一緒になって夢中で遊んでいる姿でした。年上の子が、年下の子に優しくルールを教えてあげていて……こういう温かい場所だったんですね。親の私たちも一緒に参加して、気づけば子ども以上にワクワクしちゃいました！',
      },
      {
        who: 'teacher',
        text: 'そう言うてもらえると嬉しいです！イベントをただ楽しむだけじゃなくて、「どうすればみんなに喜んでもらえるかな？」って考えて、自分にできることで手伝う。この「誰かをハッピーにする経験」が、子どもたちの大きな自信に繋がっていくんですよ',
      },
    ],
    cta: 'イベント情報をチェック',
    ctaHref: '/lab',
  },
  {
    n: '④',
    tag: 'たいわ',
    title: 'オンラインで世界とつながる！「正解のない問い」で自分を知る',
    theme: 'green',
    bg: THEMES.green.bg,
    lines: [
      {
        who: 'child',
        text: 'みんな、なんでそんなこと言ったんやろ？ ぼくの考えとは、ぜんぜん違っててびっくりした…',
      },
      {
        who: 'teacher',
        text: 'お、ええ気づきやん！ウチの「Yononaka」や「海外の子たちとの交流」は、答えのない問いをみんなでトコトン話し合う時間なんや。人の考えを聞くことで、「あ、普通って人によって違うんやな」とか、「自分はほんまはこれがやりたかったんや！」ってことに気づけるんやで',
      },
      {
        who: 'child',
        text: '自分のことって、みんなと話してるうちに「これが好きなんや」「こんな風に考えてるんや」ってどんどんハッキリしてくるなぁ。なんかオモシロい！',
      },
      {
        who: 'parent',
        text: '小学生も、中学生も、ときには大人まで、同じ輪の中で本気で対話しているんですよね。住んでいる地域も年齢もバラバラな「老若男女」がフラットに混ざり合って学び合えるのは、まさにオンラインならでは。見ているうちに、私も思わず混ざりたくなっちゃいました！',
      },
    ],
    cta: 'Yononakaについて詳しく',
    ctaHref: 'https://claft-hp.vercel.app/yononaka',
  },
  {
    n: '⑤',
    tag: 'いどむ',
    title: '答えのない世界へ！「社会の課題」というコンテストに挑む',
    theme: 'turquoise',
    bg: THEMES.turquoise.bg,
    lines: [
      {
        who: 'child',
        text: 'このコンテスト、テーマが「こまっている人を助ける」なんや。自分が作った作品でも、挑戦できるかなぁ…？',
      },
      {
        who: 'teacher',
        text: 'めっちゃええやん、やってみよ！結果がどうあれ、「この困りごと、どうやったら解決できるやろ？」って自分の頭で考えた時点で、もう大きな一歩なんや。それを誰かに伝えるために形にできるなんて、ぶっちゃけ最強やで！',
      },
      {
        who: 'child',
        text: 'そうかぁ！勝ち負けよりも、誰かの役に立つことを自分で考えるのが大事なんやな。頭の中のイメージを形にするのは難しそうやけど、なんかワクワクしてきた！',
      },
      {
        who: 'parent',
        text: '子どもの「好きなこと」が、いつのまにか「社会の課題」とつながっている…これって、まさにこれからの時代を生き抜く力そのものですね。難しい課題に真剣に向き合ってチャレンジする我が子の姿、本当にカッコいいです！',
      },
    ],
    cta: 'コンテスト情報を見る',
    ctaHref: '/lab',
  },
  {
    n: '⑥',
    tag: 'つなげる',
    title: '自分の「好き」を社会に広げる「お仕事マップ」',
    theme: 'blue',
    bg: THEMES.blue.bg,
    lines: [
      {
        who: 'child',
        text: '将来の夢って言われても、自分が何の仕事に向いているのか、よくわからないなぁ…',
      },
      {
        who: 'teacher',
        text: 'そらそうや〜分からへんよ！世の中にはまだ見ぬ仕事がいっぱいあるし、仕事もイベントみたいに自分で作ることができるんやで！例えば、今までウチでやってきたことを「お仕事マップ」に並べてみよう。マイクラで街を作ったのは「建築家」や「都市計画」、イベントを盛り上げたのは「プロデューサー」や「マーケター」の仕事と同じやで。自分の「好き」はもう仕事に繋がってるんやで！',
      },
      {
        who: 'child',
        text: 'えっ！ぼくが楽しくてやってたことって、もう仕事の練習になってたん！？自分の「好き」がどんな仕事になるのかマップで見ると、未来がめっちゃ楽しみに思えてきた！',
      },
      {
        who: 'parent',
        text: '大人が決めた「職業」に子どもを当てはめるんじゃなくて、その子の「個性」から社会の仕事を逆引きしていくアプローチがあるんですね。自分の強みを自覚した子は強いですね。「将来こんなことやってみたい！」と目を輝かせて話す姿に、未来が明るくなりました！みなさんのお仕事インタビューも、仕事への興味が湧いてとてもいいですね！',
      },
    ],
    cta: 'お仕事マップを見てみる',
    ctaHref: '/lab',
  },
  {
    n: '⑦',
    tag: 'つくる',
    title: '「CLAFT」で自分だけのキャリアを創る',
    theme: 'violet',
    bg: THEMES.violet.bg,
    lines: [
      {
        who: 'teacher',
        text: 'ここまでの歩み全部が、ウチの目指す「CLAFT（クラフト）」なんや。好きなことを形にして（Creative）、それを人に伝える（Communication）。そこで返ってきた周りの反応が、また次のワクワクのタネになる。このサイクルをぐるぐる回していくんやで',
      },
      {
        who: 'child',
        text: 'あれ？ ぐるっと回って、また一番最初の「好きなことを好きなだけ」の場所に戻ってきた！でも不思議やな、前よりも自分の「好き」や「やりたいこと」が、すっごくハッキリわかってる気がする！',
      },
      {
        who: 'teacher',
        text: 'そうやで！それが“自分の手でキャリアを創る”っていうことや。この先、世の中がどんな風に激しく変わっていっても、自分で好奇心をぐるぐる回せる力があれば、どこでだって自分の足で歩いていけるんやで',
      },
      {
        who: 'parent',
        text: 'この子はただの習い事をしているんじゃなくて、「自分だけの学び方」を自分で見つけていっているんですね。親の私もワクワクしてきました！私ももう一度、自分の好きなことを学び直して、これまでのキャリアとかけ算してみようかな？',
      },
    ],
    cta: 'CLAFTについて詳しく',
    ctaHref: 'https://claft-hp.vercel.app',
  },
];

function isExternalHref(href: string) {
  return href.startsWith('http');
}

function Walker({ themeName }: { themeName: ThemeName }) {
  const theme = THEMES[themeName];

  return (
    <div className="roadmap-walker-avatar" aria-hidden="true">
      <svg viewBox="0 0 36 56">
        <ellipse cx="18" cy="54" rx="9" ry="2.5" fill="rgba(58,51,46,.12)" />
        <rect x="10.5" y="38" width="5.8" height="9" rx="2.8" fill={theme.pants} />
        <rect x="19.7" y="38" width="5.8" height="9" rx="2.8" fill={theme.pants} />
        <ellipse cx="13.5" cy="47" rx="4" ry="2.5" fill="#5e554f" />
        <ellipse cx="22.5" cy="47" rx="4" ry="2.5" fill="#5e554f" />
        <rect x="8" y="28" width="20" height="14" rx="6" fill={theme.tunic} />
        <rect x="3" y="30" width="5.5" height="4" rx="2" fill="#ffe0c2" />
        <rect x="27.5" y="30" width="5.5" height="4" rx="2" fill="#ffe0c2" />
        <circle cx="18" cy="18" r="11.5" fill="#ffe0c2" />
        <path d="M7 16 Q7 7 18 7 Q29 7 29 16" fill="#6b4c3b" />
        <polygon points="18,1 7,12 29,12" fill={theme.hat} />
        <rect x="5" y="11" width="26" height="3.5" rx="1.5" fill={theme.ink} opacity=".86" />
        <circle cx="13" cy="19" r="2" fill="#3a332e" />
        <circle cx="23" cy="19" r="2" fill="#3a332e" />
        <circle cx="14" cy="18" r=".8" fill="#fff" />
        <circle cx="24" cy="18" r=".8" fill="#fff" />
        <path d="M14 23 Q18 26 22 23" fill="none" stroke="#3a332e" strokeWidth="1" strokeLinecap="round" />
        <ellipse cx="10" cy="22" rx="2.5" ry="1.5" fill="#f5c4b3" opacity=".5" />
        <ellipse cx="26" cy="22" rx="2.5" ry="1.5" fill="#f5c4b3" opacity=".5" />
      </svg>
    </div>
  );
}

function SpeakerSprite({ speaker }: { speaker: Speaker }) {
  if (speaker === 'teacher') {
    return (
      <span className="roadmap-avatar roadmap-avatar-teacher" aria-hidden="true">
        <svg viewBox="0 0 44 44">
          <circle cx="22" cy="22" r="21" fill="var(--roadmap-accent)" />
          <circle cx="22" cy="21" r="12.5" fill="#ffe0c2" />
          <path d="M11 20c1-8 6-12 11-12s10 4 11 12c-4-4-18-4-22 0Z" fill="#4d3b33" />
          <circle cx="17" cy="22" r="1.8" fill="#2f2a26" />
          <circle cx="27" cy="22" r="1.8" fill="#2f2a26" />
          <path d="M18 27q4 3 8 0" fill="none" stroke="#2f2a26" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M14.5 22h5M24.5 22h5M19.5 22h5" fill="none" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" opacity=".82" />
          <path d="M12 38c2.5-6 17.5-6 20 0" fill="var(--roadmap-accent-ink)" opacity=".38" />
        </svg>
      </span>
    );
  }

  if (speaker === 'parent') {
    return (
      <span className="roadmap-avatar roadmap-avatar-parent" aria-hidden="true">
        <svg viewBox="0 0 44 44">
          <circle cx="22" cy="22" r="21" fill="#e3dccf" />
          <circle cx="22" cy="20.5" r="12.5" fill="#ffe0c2" />
          <path d="M10.5 19c.7-7 5.8-11.5 11.6-11.5S33 12 33.5 19c-3-2.5-5.8-3.8-11.5-3.8S13.5 16.5 10.5 19Z" fill="#73513f" />
          <circle cx="17" cy="22" r="1.7" fill="#2f2a26" />
          <circle cx="27" cy="22" r="1.7" fill="#2f2a26" />
          <path d="M18 27q4 2.7 8 0" fill="none" stroke="#2f2a26" strokeWidth="1.6" strokeLinecap="round" />
          <ellipse cx="13.8" cy="25" rx="2.1" ry="1.2" fill="#f3b7a7" opacity=".55" />
          <ellipse cx="30.2" cy="25" rx="2.1" ry="1.2" fill="#f3b7a7" opacity=".55" />
          <path d="M12 38c2.8-6 17.2-6 20 0" fill="#8d8174" opacity=".45" />
        </svg>
      </span>
    );
  }

  return (
    <span className="roadmap-avatar roadmap-avatar-child" aria-hidden="true">
      <svg viewBox="0 0 44 44">
        <circle cx="22" cy="22" r="21" fill="var(--roadmap-accent-soft)" />
        <circle cx="22" cy="21" r="12.5" fill="#ffe0c2" />
        <path d="M11.5 19c.6-7.8 5.4-11.5 10.7-11.5 5.1 0 9.8 3.7 10.3 11.5-4.2-3.8-16.6-3.8-21 0Z" fill="#6b4c3b" />
        <path d="M22 5 12 14h20Z" fill="var(--roadmap-accent)" />
        <rect x="10" y="13.2" width="24" height="3" rx="1.5" fill="var(--roadmap-accent-ink)" opacity=".85" />
        <circle cx="17" cy="22" r="1.8" fill="#2f2a26" />
        <circle cx="27" cy="22" r="1.8" fill="#2f2a26" />
        <path d="M18 27q4 3 8 0" fill="none" stroke="#2f2a26" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M12 38c2.5-6 17.5-6 20 0" fill="var(--roadmap-accent)" opacity=".42" />
      </svg>
    </span>
  );
}

export function RoadmapWalk() {
  const scrollerRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState<Set<string>>(() => new Set());
  const [activeIndex, setActiveIndex] = useState(0);
  const [walkerTop, setWalkerTop] = useState(24);
  const [stageHeight, setStageHeight] = useState(0);
  const activeStation = STATIONS[activeIndex] ?? STATIONS[0];
  const activeTheme = THEMES[activeStation.theme];

  const completed = useMemo(() => Math.max(activeIndex + 1, visible.size), [activeIndex, visible.size]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const stage = stageRef.current;
    if (!scroller || !stage) return;

    let ticking = false;
    const updateWalker = () => {
      const maxScroll = Math.max(1, scroller.scrollHeight - scroller.clientHeight);
      const progress = Math.min(1, Math.max(0, scroller.scrollTop / maxScroll));
      const maxTop = Math.max(40, stage.offsetHeight - 88);
      setWalkerTop(24 + progress * maxTop);
      setStageHeight(stage.offsetHeight);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateWalker);
        ticking = true;
      }
    };

    updateWalker();
    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateWalker);

    return () => {
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateWalker);
    };
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute('data-station-id');
          const rawIndex = entry.target.getAttribute('data-station-index');
          if (!id || rawIndex === null) return;

          setVisible((prev) => {
            if (prev.has(id)) return prev;
            const next = new Set(prev);
            next.add(id);
            return next;
          });
          setActiveIndex(Number(rawIndex));
        });
      },
      // 画面中央付近を横切った駅をアクティブに。閾値0なので、セリフが長く
      // ビューポートより縦に高い駅でも確実に発火する。
      { root: scroller, threshold: 0, rootMargin: '-45% 0px -45% 0px' },
    );

    scroller.querySelectorAll<HTMLElement>('[data-station-id]').forEach((station) => observer.observe(station));
    return () => observer.disconnect();
  }, []);

  const pageStyle = {
    '--roadmap-bg': activeStation.bg,
    '--roadmap-accent': activeTheme.accent,
    '--roadmap-accent-soft': activeTheme.soft,
    '--roadmap-accent-ink': activeTheme.ink,
  } as CSSProperties;

  const scrollToTop = () => {
    scrollerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main ref={scrollerRef} className="lab-page-body roadmap-page" style={pageStyle}>
      <div className="roadmap-atmosphere" aria-hidden="true" />
      <div ref={stageRef} className="roadmap-stage">
        <div className="roadmap-rail" aria-hidden="true">
          <div className="roadmap-rail-line" />
          <div
            className="roadmap-rail-trail"
            style={{
              height: `${Math.max(0, walkerTop + 32)}px`,
              backgroundSize: `100% ${Math.max(stageHeight, 1)}px`,
            }}
          />
          <div className="roadmap-walker" style={{ transform: `translateY(${walkerTop}px)` }}>
            <div key={activeIndex} className="roadmap-walker-arrive">
              <Walker themeName={activeStation.theme} />
            </div>
          </div>
        </div>

        <header className="roadmap-hero">
          <span className="roadmap-eyebrow">KEEP ON LABO</span>
          <h2>
            ラボの
            <span>歩き方</span>
          </h2>
          <p>
            好きを入口に、自分の言葉で伝え、社会や未来のキャリアへ広げていく。
            スクロールしながら、キープオンラボの学びの旅を一緒に歩いてみてください。
          </p>
          <div className="roadmap-progress" aria-label={`現在 ${completed} / ${STATIONS.length} 地点`}>
            <div className="roadmap-progress-bar">
              <span style={{ width: `${(completed / STATIONS.length) * 100}%` }} />
            </div>
            <b>
              {String(completed).padStart(2, '0')} / {String(STATIONS.length).padStart(2, '0')}
            </b>
          </div>
          <div className="roadmap-scrollcue">
            <ArrowDown aria-hidden="true" />
            スクロールして、歩いてみよう
          </div>
        </header>

        <section className="roadmap-map" aria-label="ラボでの学びの流れ">
          {STATIONS.map((station, index) => {
            const stationTheme = THEMES[station.theme];
            const stationStyle = {
              '--roadmap-accent': stationTheme.accent,
              '--roadmap-accent-soft': stationTheme.soft,
              '--roadmap-accent-ink': stationTheme.ink,
            } as CSSProperties;
            const isIn = visible.has(station.n);
            const isCurrent = index === activeIndex;
            const isDone = index < activeIndex;

            return (
              <article
                key={station.n}
                className={`roadmap-station${isIn ? ' is-in' : ''}${isCurrent ? ' is-current' : ''}${isDone ? ' is-done' : ''}`}
                data-station-id={station.n}
                data-station-index={index}
                style={stationStyle}
              >
                <div className="roadmap-station-head">
                  <div className="roadmap-badge">
                    <Sparkles aria-hidden="true" />
                    <span>{station.n}</span>
                  </div>
                  <span className="roadmap-tag">{station.tag}</span>
                </div>
                <h3>{station.title}</h3>

                <div className="roadmap-dialogue">
                  {station.lines.map((line, lineIndex) => (
                    <div
                      key={`${station.n}-${lineIndex}`}
                      className={`roadmap-bubble roadmap-${line.who}`}
                      style={{ transitionDelay: `${lineIndex * 115}ms` }}
                    >
                      {line.who === 'parent' ? (
                        <div className="roadmap-parent-note">
                          <SpeakerSprite speaker="parent" />
                          <p>
                            <b>保護者さん</b>
                            {line.text}
                          </p>
                        </div>
                      ) : (
                        <>
                          <SpeakerSprite speaker={line.who} />
                          <p>
                            <b>{line.who === 'child' ? 'わたし' : 'ラボ'}</b>
                            {line.text}
                          </p>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                {station.note && <p className="roadmap-note">{station.note}</p>}

                <a
                  className="roadmap-cta"
                  href={station.ctaHref}
                  target={isExternalHref(station.ctaHref) ? '_blank' : undefined}
                  rel={isExternalHref(station.ctaHref) ? 'noopener noreferrer' : undefined}
                >
                  {station.cta}
                  <ArrowRight aria-hidden="true" />
                </a>
              </article>
            );
          })}
        </section>

        <section className="roadmap-loop">
          <div className="roadmap-loop-ring" aria-hidden="true">
            <Sparkles />
          </div>
          <h3>また、ここから。</h3>
          <p>
            ぐるっと一周して、最初の「好き」に戻ってきました。
            でも今度は、前より一段深く、自分のワクワクが見えているはずです。
          </p>
          <div className="roadmap-echo">
            「つくる、伝える、反応をもらう。また好きが育つ。」その循環が、ラボの歩き方です。
          </div>
          <button className="roadmap-restart" type="button" onClick={scrollToTop}>
            <RotateCcw aria-hidden="true" />
            もう一度、はじめから歩く
          </button>
        </section>
      </div>
    </main>
  );
}
