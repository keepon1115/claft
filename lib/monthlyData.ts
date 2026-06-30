export type Season = 'spring' | 'early-summer' | 'rainy' | 'summer' | 'autumn' | 'winter';

export interface SeasonTheme {
  headingBg: string;
  accent: string;
  motif: string;
  label: string;
}

export interface Dialogue {
  speaker: 'satoru' | 'shoichiro';
  text: string;
}

export interface Announcement {
  title: string;
  date: string;
  audience: string;
  body: string;
  image?: { src?: string; alt?: string };
  link?: { label: string; href: string; external: boolean };
}

export interface Feature {
  id: 'recap' | 'news' | 'info';
  category: string;
  title: string;
  lead: string;
  image?: { src?: string; alt?: string; caption?: string };
  dialogues?: Dialogue[];
  announcements?: Announcement[];
  bookNote?: string;
  subAnnouncements?: { body: string; link?: { label: string; href: string; external: boolean } }[];
}

export interface Issue {
  slug: string;
  volume: number;
  year: number;
  month: number;
  season: Season;
  videoUrl: string;
  coverTitle: string;
  coverSubtitle?: string;
  featureColors?: Partial<Record<Feature['id'], string>>;
  features: Feature[];
  editorNote: string;
}

export const seasonThemes: Record<Season, SeasonTheme> = {
  spring: {
    headingBg: '#f9e8f0',
    accent: '#f06a6a',
    motif: 'sakura',
    label: '春',
  },
  'early-summer': {
    headingBg: '#fffce0',
    accent: '#f5b73a',
    motif: 'koinobori',
    label: '初夏',
  },
  rainy: {
    headingBg: '#e0f4f3',
    accent: '#34c6be',
    motif: 'hydrangea',
    label: '梅雨',
  },
  summer: {
    headingBg: '#fff9e0',
    accent: '#f5a623',
    motif: 'sunflower',
    label: '夏',
  },
  autumn: {
    headingBg: '#fdf0e0',
    accent: '#e07b39',
    motif: 'maple',
    label: '秋',
  },
  winter: {
    headingBg: '#e8f0f8',
    accent: '#5b8def',
    motif: 'snowflake',
    label: '冬',
  },
};

export const featureColors: Record<Feature['id'], string> = {
  recap: '#f5a623',
  news: '#58c3a2',
  info: '#34c6be',
};

export const issues: Issue[] = [
  {
    slug: '2026-05',
    volume: 2,
    year: 2026,
    month: 5,
    season: 'early-summer',
    videoUrl: '#',
    coverTitle: 'KEEPON JOURNAL',
    featureColors: { info: '#f06a6a' },
    features: [
      {
        id: 'recap',
        category: 'イベント振り返り',
        title: '4月のロボット発表会',
        lead: '4月はロボット発表会を開催。テーマは「日本の魅力を伝えようロボット」。自考力キッズ・エジソン・エキスパート、そしてスタッフまで、盛りだくさんの作品が並ぶ発表会になりました。みんなの発表動画は5月からウェブサイトで視聴可能に。寄せられたコメントが次回発表会の改善材料になるので、参加していなかった人もぜひコメントを送ってください。親子で見ながらの一言でもOK。',
        image: { src: '/assets/images/journal/2026-05/recap.jpg', caption: '4月のロボット発表会の様子' },
        dialogues: [
          {
            speaker: 'satoru',
            text: '皆さんのコメントを元に、発表会はだんだん続いていって、改善の材料になるので',
          },
          {
            speaker: 'shoichiro',
            text: '親子で見ながらでもいいですし、ちょびっとの一言でもいいですしね',
          },
        ],
      },
      {
        id: 'news',
        category: 'ロボットニュース',
        title: '人型ロボットのハーフマラソン',
        lead: '今月のロボットニュースは、中国・北京で2回目の開催となった人型ロボットのハーフマラソン大会（約21km）。優勝したのは中国Unitree社の人型ロボット「シャンディエン（飝電＝中国語で"雷"、フラッシュの意）」。タイムは50分26秒で、人間の世界記録57分20秒を上回りました。去年のロボット記録は2時間40分。わずか1年で1時間以上も短縮した計算です。100チーム以上が参加し、スタート直後につまずいたり柵に衝突するロボットも。すごさの正体は2つ——「モーターとバッテリーの強化」と「安定したランニングフォーム」。ロボットを長時間安定して走らせるには大量の電力と発熱対策が必要で、それを可能にする高性能なモーター・バッテリーは2足歩行以外のあらゆるロボットにも応用できます。アーテックのカリキュラム（レベル6-3・8-3）にも歩行ロボットがあり、作った人なら分かる通り、足を上げて重心を傾けながらバランスを保って歩く動きはとても難しい。将来は夜間警備・介護・災害現場などへの活用が期待され、エンタメとしての可能性も。身近に歩行ロボットがいたら、どんな仕事をしてくれるか想像してみてください。',
        image: { src: '/assets/images/journal/2026-05/news.jpg', caption: '人型ロボットのハーフマラソン大会（中国・北京）' },
        dialogues: [
          {
            speaker: 'shoichiro',
            text: 'あれを50分間走らせるのもすごいし、そのスピードを出すのもすごい。相当な技術の進化が見えますね',
          },
          {
            speaker: 'satoru',
            text: '夜の警備とかは、日本より海外の方が使われそう。人口が増えて人手が追いつかないところとか',
          },
          {
            speaker: 'shoichiro',
            text: 'スタート直後にバーって激突したの、真剣に頑張ってる分つい笑えてくる。エンタメとしても面白いんちゃうかな',
          },
        ],
        bookNote: '歩行ロボットの想定用途：夜間警備 / 介護・高齢者サポート / 災害・被災現場。4月に紹介した「フィジカルAI」の用途のひとつとしても期待されている。',
      },
      {
        id: 'info',
        category: '今月のお知らせ',
        title: 'スクールからのお知らせ',
        lead: '5月のイベントをまとめました。気になるものはリンクから詳細を確認してください。',
        announcements: [
          {
            title: 'ロボプロ検定（5月）',
            date: '5月実施（次回は9月）',
            audience: 'エジソン・エキスパートコース（ブロンズは入門レベル）',
            body: '漢字検定や英語検定のロボットプログラミング版。知識テスト（筆記）と、指定された動きをするロボットを作る技能テストの2本立て。ブロンズ・シルバー・ゴールドの3ランクで、ブロンズは車を動かすプログラムができればクリアできる入門レベル。参加無料、両方クリアで公式の認定証がもらえます。落ちても成績に響くものではなく、腕試しのつもりで気軽に挑戦を。テキストで学んだことの復習・定着になり、作りたい動きを自分で作れる幅が広がります。',
          },
          {
            title: 'Yononaka「ゲームって何？」',
            date: '5月開催',
            audience: '小学生〜大人 どなたでも（前提知識不要・正解なし）',
            body: '自分の思っていること・感じていることを話す時間。今月のテーマは「ゲームって何？」。ゲームはテレビゲームだけでなく、カードゲーム・ボードゲーム・日常の遊びまで含めて捉えます。いまゲームは教育現場にも入っていて（教育版マインクラフト、桃鉄の教育版、くら寿司のビッくらポンの仕組み、災害シミュレーションなど）、ただ楽しむだけでなく「やる前に知らなかったことを発見し、言葉にして残す」ことが学びになります。これはキープオンのPBL（課題解決型学習）の学び方そのもの。正解がないので、初めての人も安心して参加してください。',
            link: { label: 'Yononaka（対話ワーク）を見る', href: '/yononaka', external: false },
          },
          {
            title: 'お仕事発見ワークショップ（5/31 キープオンラボ）',
            date: '5月31日（土）キープオンラボ',
            audience: 'まだ仕事をしていない小中学生',
            body: '10年前と今では、どんな仕事があるかが大きく変わっています。その違いを比較しながら、10年後・20年後の仕事はどうなっていくかをみんなで考えるワークショップ。キープオンラボでリアルに集まって開催します。',
            link: { label: 'Keepon Lab を見る', href: '/keepon-lab', external: false },
          },
        ],
      },
    ],
    editorNote: '花粉も終わり、春の過ごしやすい季節に。散々ゲームの話をしたけれど、外をブラっと歩いて春の空気に当たるのも気持ちいい。自分だけの「大りんこ（＝お気に入りの過ごし方）」を、皆さんも見つけてください。',
  },
  {
    slug: '2026-06',
    volume: 3,
    year: 2026,
    month: 6,
    season: 'rainy',
    videoUrl: 'https://youtu.be/iIpt-gRcT30',
    coverTitle: 'KEEPON JOURNAL',
    features: [
      {
        id: 'recap',
        category: 'イベント振り返り',
        title: '5月のロボプロ検定',
        lead: '5月は「ロボプロ検定」を実施しました。ロボットプログラミングの知識テストと技能テストの2本立てで、ブロンズ・シルバー・ゴールドの3ランク。今回は最難関のゴールドに複数名が挑戦し、月曜エキスパートクラスの Tくん が知識・技能どちらも合格。キープオン初のゴールドランク合格者となりました。落ちた子も問題を持ち帰って復習するなど、検定はゴールではなく「学びと自分の現在地を確認する手段」。次回は9月、ゴールドでなくてもブロンズ・シルバーからぜひ挑戦を。',
        image: { src: '/assets/images/journal/2026-06/recap.jpg', caption: '5月のロボプロ検定の様子' },
        dialogues: [
          {
            speaker: 'shoichiro',
            text: '実際僕も試験に立ち合ってたんですけど、問題を見ても「ん？」ていう部分が結構あって',
          },
          {
            speaker: 'satoru',
            text: 'それぐらい難しいんですよ',
          },
          {
            speaker: 'shoichiro',
            text: '落ちても全然気にすることなく、チャレンジしてくれたこと自体が学びにつながる',
          },
        ],
      },
      {
        id: 'news',
        category: 'ロボットニュース',
        title: '農業ロボット「シンロボ」',
        lead: '今月のロボットニュースは農業ロボット「シンロボ」。日本の農業は担い手不足と高齢化が進み、暑さ・雨風の中での重労働という課題があります。シンロボはAIとカメラを搭載し、レタスの間の雑草をピンポイントで抜いたり、水を与えたり、土や作物の状態を見て自分でやるべき作業を判断します。畑に置いておけば作業をこなしてくれる——その将来性に投資家から資金が集まったことがニュースに。人が大変・危ない仕事にロボットを入れれば、もっと便利な世界がつくれる。その視点をぜひ持ってほしい。',
        image: { src: '/assets/images/journal/2026-06/news.jpg', caption: '農業ロボット「シンロボ」' },
        dialogues: [
          {
            speaker: 'shoichiro',
            text: '道路は閉じた環境やから自動運転も進むけど、土を相手にすると毎日状況が変わる。だからこそAIが必要なんでしょうね',
          },
          {
            speaker: 'satoru',
            text: 'うまくいったら、いろんな大変な場所にロボットを入れられる。皆さんも考えてみてください',
          },
        ],
        bookNote: '関連書籍として小説『下町ロケット』3巻・4巻（無人トラクター開発の話）を紹介。開発の苦労や技術的な話が熱い一冊。',
      },
      {
        id: 'info',
        category: '今月・来月のお知らせ',
        title: 'スクールからのお知らせ',
        lead: '今月・来月のイベントと締め切りをまとめました。参加申込は各リンクからどうぞ。',
        announcements: [
          {
            title: 'ゲーム展示会（6月）',
            date: '6月（最終日 6/27、6/26までの提出で1日遊べます）',
            audience: 'スクール生・スタッフ',
            body: '教室にゲームプレイ専用PCを2台設置。スクール生とスタッフが作ったゲーム「KPP」を遊べる環境に。授業の前後や休憩時間にプレイして、面白かった点・もっとこうしたら面白くなるアイデアを感想として伝えてください。作って・出して・遊んでもらって初めて「自分のゲームってどうなんだろう」という気づきが得られます。1人で2個3個出してもOK。',
            image: { src: '/assets/images/journal/2026-06/info-game.jpg' },
            link: { label: 'ゲーム展示会ページを見る', href: '/futurecraft/Exhibition-game', external: false },
          },
          {
            title: 'PLAY CLAFT（11/29 秋のスクールフェスタへ向けて）',
            date: '第1段階：6/24まで アイデア募集',
            audience: 'スクール生',
            body: 'スクール生自身がイベントを企画する取り組み（3回目）。第1段階として「教室でできる遊び＋ワクワク・ドキドキする要素」のアイデアを募集します。例：だるまさんが転んだ＋「ゴリラ」と言われたらゴリラのポーズで止まる。身近な遊びに一工夫でオリジナルの遊びに。7/26には意見交換会で形にしていきます。',
            image: { src: '/assets/images/journal/2026-06/info-play-claft.jpg' },
            link: { label: 'アイデアを送る（Googleフォーム）', href: 'https://forms.gle/r3YJY1hUmGqbMZLd6', external: true },
          },
          {
            title: 'なんでも発表会（7/26 日）',
            date: '7月26日（日）9:00〜16:30',
            audience: 'スクール生',
            body: '自分の活動・探究・好きなこと・得意なことを、テーマフリーで自由に発表する年に一度の会。「没頭して作る→発表する→反応をもらう→また作る」のループで、好きが得意に変わり、伝える力が育ち、仲間が見つかります。発表は1人10分が基本（15〜20分も可）。スライドでもイラストでもOK。',
            image: { src: '/assets/images/journal/2026-06/info-nandemo.jpg' },
            link: { label: '参加を申し込む（Googleフォーム）', href: 'https://forms.gle/2LBMyGGH7yfksVW7A', external: true },
          },
        ],
        subAnnouncements: [
          {
            body: '6/19「AIロボット社会、僕たちはどう生きるか」全6回の初回。初回は生成AI（ChatGPT・Gemini・Claude・Grokなど）の紹介。AIと共に働く社会の入り口に触れてほしい。',
            link: { label: 'AIロボット社会ページを見る', href: '/yononaka/ai-robot', external: false },
          },
          {
            body: '7月のYononakaはURC（ロボット国際協議会）テーマ＝SDGs 8番「働きがいも経済成長も」と絡めた内容。',
          },
        ],
      },
    ],
    editorNote: 'スクール長の悟と将一郎の毎月の配信。ロボットもゲームも発表も、すべては「創って伝える」ための手段。6月も頑張っていきましょう。',
  },
  {
    slug: '2026-07',
    volume: 4,
    year: 2026,
    month: 7,
    season: 'summer',
    videoUrl: 'https://youtu.be/fgbDegadJi8',
    coverTitle: 'KEEPON JOURNAL',
    features: [
      {
        id: 'recap',
        category: 'イベント振り返り',
        title: '6月のゲーム展示会',
        lead: '6月はスクール生が作ったゲームを教室に展示し、いつでもプレイできるようにした初の企画「ゲーム展示会」を開催しました。早く終わった子、自考力キッズ、兄弟で来てくれた子など、本当にいろんな子がプレイ。遊んだあとの感想は「めっちゃ頭使った」「こんなん作れるのすごい」「楽しかった」。自分の作ったゲームを誰かが遊んでコメントをくれることが、次のモチベーションにつながります。年に1〜2回のペースでこれからも続けていく予定。次回は遊ぶ側だった子も、ぜひ自分のゲームを作って出してみてください。',
        image: { src: '/assets/images/journal/2026-07/recap.jpg', caption: '多彩な作品が並びました' },
        dialogues: [
          {
            speaker: 'shoichiro',
            text: 'コメントを書く側の子も、同じスクールの先輩がこういうのを作れると知って、自分もゲーム作りをやってみようと思ったかもしれませんね',
          },
          {
            speaker: 'satoru',
            text: 'そうやね。「こんなん作れるのすごい！でも年齢が近い人がつくってるんや！」という感じで、自分の近い人だとより意識できると思うし。',
          },
          {
            speaker: 'shoichiro',
            text: 'うんうん。まあ作り手としてもやっぱフィードバックはすごくありがたい。自分のゲーム「難しすぎる」と書かれていたから、難易度を改めよう、と思いました笑',
          },
        ],
      },
      {
        id: 'news',
        category: 'ロボットニュース',
        title: '夏の"蚊"とAI',
        lead: '7月のテーマは夏らしく「蚊」。実は蚊は、サメやクマも含めた生き物全体の中で世界一人間を死なせている生き物です。血を吸う（吸うのはメスだけ）ときに唾液からマラリアやデング熱などの病気をうつしてしまうため。そこで注目されているのが、卵が孵化しなくなる「ボルバキア菌」を持ったオスを人工的に育てて放ち、メスと交尾させて新しい蚊が生まれないようにするプログラム（Googleの親会社アルファベットが実施）。今回の主役はロボットよりAIです。①超高速カメラと画像認識AIでさなぎのオス・メスを判別し、オスだけを残す。②温度・餌・水質を監視し、AIが幼虫の健康を管理して元気なオスを育てる。③過去のデータとGPSから「野生のメスが多い場所」を計算し、専用車で放出する数と場所を決める。殺虫剤が効かないほど強い蚊に対して、こうしたアプローチで感染症に苦しむ人を助けようとしています。',
        image: { src: '/assets/images/journal/2026-07/news.jpg', caption: 'AIで雌雄を判別し、健康に育て、放つ場所まで計算する蚊の対策プログラム' },
        dialogues: [
          {
            speaker: 'shoichiro',
            text: 'めちゃめちゃ戦略的ですね。AIってそんなことにも応用されるんやぁ',
          },
          {
            speaker: 'satoru',
            text: 'こんな感じで、AIを使って解決できそうな課題はあるかな、とみんなにも考えてもらえたらと思います。',
          },
          {
            speaker: 'shoichiro',
            text: '課題を解決するのはAIやロボットでも、課題だと気づいて言葉にするのは人間の役割やと思いますね。にしても、あんなに小さいのに、画像認識でオスかメスかちゃんと判別できるのがすごい',
          },
          {
            speaker: 'satoru',
            text: 'さなぎの段階だと中が透けて見えるから、レントゲンみたいに中を見て判断してるんやと思います',
          },
        ],
        bookNote: 'AIの役割は3ステップ。①画像認識でオスのさなぎだけを残す ②環境データを監視して元気なオスに育てる ③GPS・過去データで放出する場所と数を計算する。「ロボットだけじゃなくAIを使って解決できそうな課題はあるかな？」が今回の問いです。',
      },
      {
        id: 'info',
        category: '今月のお知らせ',
        title: 'スクールからのお知らせ',
        lead: '7月のイベントをまとめました。気になるものはリンクから詳細を確認してください。',
        announcements: [
          {
            title: '【新企画】7月のフォトコンテスト',
            date: '7月1日〜7月27日（締切後の提出もOK）',
            audience: 'スクール生・保護者 どなたでも',
            body: '毎月テーマに沿ってみんなの写真を集める新企画がスタート。記念すべき第1回のテーマは「好きな食べ物」です。写真に加えて、タイトルや「なぜそれが好きなのか」の一言も添えてください（名前入りもOK）。しっかり撮ったポートレートでも、ぬいぐるみと一緒でも、「これ何味でしょう?」のクイズ風でも何でもOK。27日までに集まったものから、スタッフがいいなと思った写真を翌月の配信で共有します。スクール生だけでなく、保護者の皆さんもぜひお気軽にご参加ください。',
            link: { label: '写真を送る（Googleフォーム）', href: 'https://forms.gle/ZDWbokLefiJvN3H39', external: true },
          },
          {
            title: 'なんでも発表会（7/26 日）',
            date: '7月26日（日）10:00〜16:30',
            audience: 'スクール生（グループ発表もOK）',
            body: 'ゲームでもおもちゃでも、自分が作った作品でも、他の習い事でやっていることでも、好きなこと・得意なことを堂々と発表する年に一度の会（今回で4回目）。CLAFTコースのPBL（課題解決型学習）の発表の場にもなります。今回から「展示の部」を新設。当日来られない人や、ピアノなど現地で発表しづらい人は、やりたいことを動画に撮って当日スタッフが印刷・展示する形で参加できます。学校の自由研究や、夏休みにやることの予行としてもおすすめ。まだまだ発表する人を募集中です。',
            image: { src: '/assets/images/journal/2026-07/info-nandemo.jpg' },
            link: { label: '参加を申し込む（Googleフォーム）', href: 'https://forms.gle/2LBMyGGH7yfksVW7A', external: true },
          },
          {
            title: 'PLAY CLAFT 投票＆意見交換会',
            date: '投票：7/8まで（7/10決定） / 意見交換会：7/26 なんでも発表会にて',
            audience: 'スクール生',
            body: '先月募集したイベントのアイデアを、CLAFTメンバーのミーティングで8個に絞りました。「人生ゲーム」や「かるた取り」など身近な遊びに、ワクワク・びっくり要素を加えて組み合わせた案が並びます。いま投票が始まっており、7/8までに投票、7/10に決定してWeekly keeponで案内します。決まったイベントは、7/26のなんでも発表会で意見交換会を開いてさらに深め、役割分担をして8〜11月にかけて制作。11月の秋のスクールフェスタで実施します。',
            image: { src: '/assets/images/journal/2026-07/info-play-claft.jpg' },
          },
          {
            title: 'Yononaka「AIロボット社会、僕たちはどう生きるか」',
            date: '第2回：7月24日（金） / 第3回：8月予定',
            audience: '中学生以上（小学生も歓迎）',
            body: '自分の思っていること・感じていることを話し、正解が1つでないお題について意見を共有する時間。6月から始まった連続シリーズ「AIロボット社会、僕たちはどう生きるか」は、AIと対決するのではなく、AIやロボットと一緒によりよく生きる未来を考えます。第1回（6/19）は「AIと人間の境界線はどこにある」。どこまでをコンピューターに任せていいかは人によってきれいに割れ、Neuralink（脳に電極を埋め、念じるだけで機械を動かすBMI）の動画も鑑賞しました。第2回（7/24）は「心の形を探しに」。第3回は8月に小学生も誰でも参加OKのごちゃ混ぜ回として開催予定です。',
            link: { label: 'Yononaka（対話ワーク）ってなに？', href: '/yononaka', external: false },
          },
        ],
        subAnnouncements: [
          {
            body: '個別で、悩み事や進路相談もオンラインで受け付けています。「スクールでこういうイベントがあったらいいな」というアイデアも大歓迎。習い事の枠を超えた学びの機会を一緒に作っていけたらと思っています☺',
            link: { label: '個別面談はこちら', href: '/meeting', external: false },
          },
        ],
      },
    ],
    editorNote: '7月3日は語呂合わせで「波の日」。暑さで中だるみにならないように、波に乗って7月も乗り切っていきましょう。自分の頭で考えて、オリジナルのものを創って、人に伝える——その繰り返しがキープオンの学びです。',
  },
];

export function getIssue(slug: string): Issue | undefined {
  return issues.find((i) => i.slug === slug);
}
