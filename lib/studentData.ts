// ========================================
// スクール生データ
// ========================================

export type StudentProfile = {
  slug: string; // URL用の識別子（英数字のみ）
  name: string;
  grade: string;
  avatarEmoji: string;
  shortIntro: string; // 一覧ページで表示する簡単な紹介文
  likes: string[];
  character: string;
  motivationEnv: string;
  futureVision: {
    text: string;
    subText?: string;
  };
  currentActions: {
    title: string;
    description: string;
    emoji: string;
    tags?: string[];
  }[];
  timeline: {
    date: string;
    title: string;
    description?: string;
    isCurrent?: boolean;
  }[];
};

// ========================================
// スクール生データ（ここを編集してください）
// ========================================

export const studentsData: StudentProfile[] = [
  {
    slug: 'haruto',
    name: 'はると',
    grade: '高校1年生',
    avatarEmoji: '🎨',
    shortIntro: 'デザインとプログラミングを組み合わせて、使いやすいWebアプリを作ることに挑戦中。',
    likes: ['Webデザイン', 'UI/UX', 'フロントエンド開発'],
    character: '完璧主義で細部にこだわるタイプ。デザインとコードの両方を理解したいと思っている。',
    motivationEnv: '美しいものに囲まれる × 論理的に考えられる × 実際に使ってもらえる',
    futureVision: {
      text: '誰もが使いやすいWebサービスをデザインして、世の中をもっと便利にしたい。将来はUI/UXデザイナーかフロントエンドエンジニアになりたい。',
      subText: '最近は「アクセシビリティ」にも興味が出てきて、誰でも使えるデザインを学んでいる。',
    },
    currentActions: [
      {
        title: 'タスク管理アプリを開発中',
        description: 'React + TypeScriptで、シンプルで美しいタスク管理アプリを制作中。デザインから実装まで全部自分で。',
        emoji: '💻',
        tags: ['React', 'TypeScript', 'UI/UX'],
      },
      {
        title: 'デザインツールを使いこなす',
        description: 'Figmaでワイヤーフレームからプロトタイプまで作成。デザインの基礎をしっかり学んでいる。',
        emoji: '🎨',
        tags: ['Figma', 'デザイン', 'プロトタイプ'],
      },
      {
        title: 'PLAY CLAFTで作品発表',
        description: '制作したアプリのデモを発表。「使いやすい！」と言ってもらえて、もっと改善したくなった。',
        emoji: '🎤',
        tags: ['プレゼン', '発表会', 'フィードバック'],
      },
    ],
    timeline: [
      {
        date: '2023年9月',
        title: 'CLAFT入会',
        description: 'プログラミングは初心者だったけど、「デザインとコードを両方学びたい」という思いで入会。',
      },
      {
        date: '2023年12月',
        title: '初めてのWebサイト公開',
        description: 'HTML/CSSで自己紹介サイトを作成。初めて自分の作品がネット上に公開されて感動。',
      },
      {
        date: '2024年3月',
        title: 'JavaScriptに挑戦',
        description: '動きのあるWebサイトを作りたくて、JavaScriptの学習をスタート。最初は難しかった。',
      },
      {
        date: '2024年7月',
        title: 'Reactに出会う',
        description: 'モダンなWebアプリを作りたくて、Reactを学び始める。コンポーネント思考に感動。',
      },
      {
        date: '2024年11月',
        title: 'タスク管理アプリ開発中',
        description: 'React + TypeScriptで本格的なアプリ制作に挑戦中。デザインとコードが繋がる楽しさを実感。',
        isCurrent: true,
      },
    ],
  },
  {
    slug: 'kenshiro',
    name: 'けんしろう',
    grade: '中学3年生',
    avatarEmoji: '🤖',
    shortIntro: 'ロボット工学とAIに興味があり、自分で動くロボットを作ることが夢。',
    likes: ['ロボット', 'プログラミング', 'AI・機械学習'],
    character: '論理的思考が得意で、仕組みを理解するのが好き。難しい問題に挑戦するのが楽しい。',
    motivationEnv: '自分で試行錯誤できる × 技術的な話ができる仲間 × 実際に動くものを作れる',
    futureVision: {
      text: '人の役に立つロボットを作りたい。将来はロボット工学の研究者かエンジニアになって、社会課題を解決したい。',
      subText: 'AIを搭載したロボットで、高齢者や障がい者の生活をサポートできたら最高だと思う。',
    },
    currentActions: [
      {
        title: '自律走行ロボットを制作',
        description: 'Arduinoとセンサーを使って、障害物を避けながら走るロボットを制作中。プログラミングと電子工作の両方が必要で面白い。',
        emoji: '🤖',
        tags: ['Arduino', 'センサー', 'プログラミング'],
      },
      {
        title: 'Pythonで画像認識に挑戦',
        description: 'AIに興味があって、Pythonで簡単な画像認識プログラムを作ってみた。機械学習の可能性を感じた。',
        emoji: '🧠',
        tags: ['Python', 'AI', '画像認識'],
      },
      {
        title: 'Yononakaでエンジニアと対話',
        description: 'ロボット開発の現場で働くエンジニアと話せて、「どんな勉強をすればいいか」具体的なアドバイスをもらえた。',
        emoji: '💬',
        tags: ['キャリア', '対話', 'エンジニア'],
      },
    ],
    timeline: [
      {
        date: '2023年5月',
        title: 'CLAFT入会',
        description: '「ロボットを作りたい」という漠然とした夢を持って入会。何から始めればいいか分からなかった。',
      },
      {
        date: '2023年8月',
        title: 'Scratchで基礎を学ぶ',
        description: 'プログラミングの基礎をScratchで学習。アルゴリズムの考え方が少しずつ分かってきた。',
      },
      {
        date: '2023年11月',
        title: 'Arduinoに挑戦開始',
        description: '実際に動くロボットを作りたくて、Arduinoキットを購入。LEDを光らせるだけでも感動した。',
      },
      {
        date: '2024年4月',
        title: '初のロボット完成',
        description: 'ラインに沿って走るロボットを完成。自分で作ったものが動いた時の達成感は忘れられない。',
      },
      {
        date: '2024年9月',
        title: 'AIとロボットの融合に挑戦',
        description: 'Pythonで画像認識を学び、ロボットに搭載する計画を立てている。難しいけど楽しい。',
        isCurrent: true,
      },
    ],
  },
  {
    slug: 'tsukasa',
    name: 'つかさ',
    grade: '社会人',
    avatarEmoji: '📚',
    shortIntro: '働きながらプログラミングを学び直し、キャリアチェンジを目指している。',
    likes: ['Web開発', 'データ分析', '新しいことを学ぶこと'],
    character: '粘り強く、計画的に物事を進めるタイプ。社会人経験があるからこその視点を持っている。',
    motivationEnv: '実務に活かせる × 自分のペースで学べる × 目標が明確',
    futureVision: {
      text: '今の仕事の経験を活かしつつ、エンジニアとして新しいキャリアを築きたい。将来はフルスタックエンジニアになりたい。',
      subText: '「学び直し」は遅くないということを、自分の行動で証明したい。',
    },
    currentActions: [
      {
        title: 'ECサイトを制作中',
        description: 'Next.js + TypeScriptで、本格的なECサイトを制作中。認証、決済、管理画面まで実装している。',
        emoji: '🛒',
        tags: ['Next.js', 'TypeScript', 'フルスタック'],
      },
      {
        title: 'データ分析スキルを磨く',
        description: '前職の経験を活かして、PythonでWebサイトのアクセス解析ツールを自作。データとエンジニアリングを組み合わせる面白さを実感。',
        emoji: '📊',
        tags: ['Python', 'データ分析', 'ツール開発'],
      },
      {
        title: '転職活動を開始',
        description: 'CLAFTで作った作品をポートフォリオにまとめ、エンジニア職への転職活動を開始。面接で実績を話せるのが強み。',
        emoji: '🚀',
        tags: ['転職', 'ポートフォリオ', 'キャリア'],
      },
    ],
    timeline: [
      {
        date: '2023年1月',
        title: 'CLAFT入会',
        description: '「このままでいいのか？」と思い、働きながら学べるスクールを探していてCLAFTに出会った。',
      },
      {
        date: '2023年4月',
        title: 'プログラミング基礎を習得',
        description: 'HTML/CSS/JavaScriptを集中的に学習。平日は2時間、休日は5時間勉強した。',
      },
      {
        date: '2023年8月',
        title: '初めてのWebアプリ完成',
        description: 'タスク管理アプリを作成。「こんなものが自分で作れるようになった」と自信がついた。',
      },
      {
        date: '2024年2月',
        title: 'モダンな技術スタックに挑戦',
        description: 'React、Next.js、TypeScriptなど、実務で使われる技術を本格的に学び始める。',
      },
      {
        date: '2024年11月',
        title: 'ECサイト制作 & 転職活動中',
        description: 'フルスタックのECサイトを制作しながら、エンジニアとしての転職活動を進めている。',
        isCurrent: true,
      },
    ],
  },
  {
    slug: 'aoi',
    name: 'あおい',
    grade: '大学1年生',
    avatarEmoji: '🎬',
    shortIntro: '映像制作とストーリーテリングに興味があり、動画コンテンツで人を感動させたい。',
    likes: ['映像制作', '動画編集', 'ストーリー作り'],
    character: 'クリエイティブで感性豊か。人の心を動かすコンテンツを作りたいという思いが強い。',
    motivationEnv: '自由に表現できる × フィードバックがもらえる × 作品が人に届く',
    futureVision: {
      text: '映像で人の心を動かし、社会に良い影響を与えたい。将来は映像クリエイターとして活動したい。',
      subText: 'ドキュメンタリーや教育系コンテンツなど、「意味のある映像」を作りたい。',
    },
    currentActions: [
      {
        title: 'ショートムービーを制作中',
        description: 'After EffectsとPremiere Proを使って、環境問題をテーマにしたショートムービーを制作中。脚本から撮影、編集まで全部自分で。',
        emoji: '🎬',
        tags: ['映像制作', 'After Effects', 'ストーリー'],
      },
      {
        title: 'YouTubeチャンネル運営',
        description: '学びのプロセスを記録する教育系YouTubeチャンネルを開設。編集スキルとストーリーテリングを磨いている。',
        emoji: '📹',
        tags: ['YouTube', '動画編集', 'コンテンツ制作'],
      },
      {
        title: 'PLAY CLAFTで作品発表',
        description: '制作したショートムービーを発表。「感動した」「考えさせられた」という感想をもらって、もっと作りたくなった。',
        emoji: '🎤',
        tags: ['プレゼン', '発表会', 'フィードバック'],
      },
    ],
    timeline: [
      {
        date: '2024年4月',
        title: 'CLAFT入会',
        description: '大学入学と同時に、「やりたいことを見つけたい」という思いでCLAFTに入会。',
      },
      {
        date: '2024年6月',
        title: '初めての動画編集',
        description: 'Premiere Proを使って簡単なVlogを制作。編集の楽しさに目覚める。',
      },
      {
        date: '2024年8月',
        title: 'ストーリーテリングを学ぶ',
        description: '「技術だけじゃなくて、心に響くストーリーが大事」と気づき、脚本の勉強を始める。',
      },
      {
        date: '2024年10月',
        title: 'YouTubeチャンネル開設',
        description: '学びのプロセスを発信するチャンネルを開設。コンテンツ制作の全体像が見えてきた。',
      },
      {
        date: '2024年12月',
        title: 'ショートムービー制作中',
        description: '環境問題をテーマにした本格的なショートムービーに挑戦中。今までで一番大きなプロジェクト。',
        isCurrent: true,
      },
    ],
  },
  {
    slug: 'koharu',
    name: 'こはる',
    grade: '大学4年生',
    avatarEmoji: '🌱',
    shortIntro: '社会起業に興味があり、テクノロジーを使って地域課題を解決したいと考えている。',
    likes: ['社会課題解決', 'Web開発', 'コミュニティづくり'],
    character: '行動力があり、「まずやってみる」タイプ。人と人を繋げるのが得意。',
    motivationEnv: '社会に貢献できる × 仲間と協働できる × 実際に変化が見える',
    futureVision: {
      text: 'テクノロジーと人の力で、地域や社会の課題を解決したい。将来は社会起業家として活動したい。',
      subText: '就職せずに起業する道を選ぶかもしれない。CLAFTで得た経験が背中を押してくれている。',
    },
    currentActions: [
      {
        title: '地域情報共有プラットフォームを開発',
        description: '地元の課題を解決するため、住民同士が情報交換できるWebプラットフォームを制作中。実際に使ってもらいながら改善している。',
        emoji: '🌍',
        tags: ['Web開発', '社会課題', 'プラットフォーム'],
      },
      {
        title: 'ビジネスプランコンテスト出場',
        description: '制作したプラットフォームを軸に、ビジネスプランコンテストに出場。社会起業の可能性を模索中。',
        emoji: '🏆',
        tags: ['起業', 'ビジネス', 'コンテスト'],
      },
      {
        title: 'Yononakaで起業家と対話',
        description: '実際に社会起業をしている先輩と話して、「理想だけじゃなくてビジネスモデルも大事」と学んだ。',
        emoji: '💬',
        tags: ['キャリア', '対話', '起業'],
      },
    ],
    timeline: [
      {
        date: '2022年4月',
        title: 'CLAFT入会',
        description: '「何か社会に貢献したい」という漠然とした思いを持って入会。具体的に何をすればいいか分からなかった。',
      },
      {
        date: '2022年9月',
        title: 'プログラミングを学び始める',
        description: '「自分でサービスを作れたら強い」と思い、Web開発の勉強をスタート。',
      },
      {
        date: '2023年3月',
        title: '初めてのWebサービス公開',
        description: '地元の飲食店を紹介するサイトを作成。実際に使ってもらえて、「作るだけじゃなくて届けることが大事」と学んだ。',
      },
      {
        date: '2023年10月',
        title: '地域課題に着目',
        description: '地元の高齢化や情報格差という課題に気づき、「テクノロジーで解決できないか」と考え始める。',
      },
      {
        date: '2024年4月',
        title: '地域プラットフォーム開発開始',
        description: '住民同士が情報交換できるプラットフォームの開発をスタート。実際に地域で使ってもらいながら改善中。',
      },
      {
        date: '2024年12月',
        title: '起業を視野に活動中',
        description: 'ビジネスプランコンテストに出場し、卒業後は起業する道も視野に入れている。',
        isCurrent: true,
      },
    ],
  },
];

// ========================================
// ヘルパー関数
// ========================================

/**
 * slugから生徒データを取得
 */
export function getStudentBySlug(slug: string): StudentProfile | undefined {
  return studentsData.find((student) => student.slug === slug);
}

/**
 * 全生徒のslugリストを取得（動的ルート生成用）
 */
export function getAllStudentSlugs(): string[] {
  return studentsData.map((student) => student.slug);
}
