// センサーズ5体の設定。出典：
//  - https://www.keeponlearning.fun/sensors （性格・センサーの役割と数値範囲）
//  - note「キャラづくり」連載（出身地 / 能力 / 健康ルーティン / 相棒）
// ゲーム側のルール（数値範囲・能力）はここの設定に合わせている。変えるときは両方を見ること。

export type SensorId = 'pochio' | 'kasso' | 'photon' | 'pikkari' | 'oton';

export type SensorCharacter = {
  id: SensorId;
  name: string;
  sensor: string;
  /** キャラの色（手足・しっぽ） */
  color: string;
  /** 文字に使う濃いめの色（白地で読める濃さ） */
  ink: string;
  range: string;
  rangeNote: string;
  personality: string;
  ability: string;
  abilityNote: string;
  from: string;
  buddy: string;
  buddyNote: string;
  routine: string;
};

export const SENSORS: SensorCharacter[] = [
  {
    id: 'pochio',
    name: 'ぽちお',
    sensor: 'タッチセンサー',
    color: '#ff2a1f',
    ink: '#d81f15',
    range: '0 か 1',
    rangeNote: 'おしているときは 0、おしていないときは 1。',
    personality: 'はんのうが はやくて、こうきしん おうせい。きゅうに あつくなったり さめたりする。',
    ability: 'FIRE',
    abilityNote: 'あたまの スイッチを おすと、めと こころが ひに かわって パワーアップ。',
    from: 'ハワイ ポまち',
    buddy: 'キツツキ',
    buddyNote: 'あたまの「やるきスイッチ」を おしてくれる。',
    routine: 'きんトレ マニア。いちにちじゅう ダンベルを はなさない。',
  },
  {
    id: 'kasso',
    name: 'かっそー',
    sensor: 'かそくどセンサー',
    color: '#4c8a1e',
    ink: '#3f7a15',
    range: 'ふる 0〜100 ／ かたむける 25〜75',
    rangeNote: 'X（ぜんご）・Y（さゆう）・Z（じょうげ）の うごきが わかる。',
    personality: 'いつも うごきまわっている。ともだちづくりが とくい。いけんが コロコロ かわる。',
    ability: 'SPEED',
    abilityNote: 'めにも とまらぬ はやさ。さかだちの ほうが はやいらしい。',
    from: 'ひみつけんきゅうじょ（Xこく Yけん Zし）',
    buddy: 'チーター',
    buddyNote: 'うまれたころから いっしょに かけっこ。',
    routine: 'あさも よるも ひたすら ランニング。',
  },
  {
    id: 'photon',
    name: 'フォットん',
    sensor: 'せきがいせんフォトリフレクタ',
    color: '#5fdcea',
    ink: '#1699a8',
    range: '0〜100',
    rangeNote: 'ちかいもの・あかるい いろほど 100に ちかづく。くろい ものは はんしゃ しにくい。',
    personality: 'かんさつりょくが するどく、ちてき。まわりに えいきょう されやすい。',
    ability: 'MEMORY',
    abilityNote: 'せかいの できごとを ぜんぶ おぼえている。めから ビームで うつしだす。',
    from: 'こだいローマ（410ねん うまれ）',
    buddy: 'フクロウ',
    buddyNote: 'おもいだす きっかけを そっと くれる。',
    routine: 'まいにち メモと にっき。しゃしんを 100まい とる。',
  },
  {
    id: 'pikkari',
    name: 'ピッカリー',
    sensor: 'ひかりセンサー',
    color: '#ffc45c',
    ink: '#d98200',
    range: '0〜100',
    rangeNote: 'くらいと 0、あかるいと 100。',
    personality: 'あかるく えがお まんてん。ムードに さゆう されやすい。',
    ability: 'LIGHT',
    abilityNote: 'ぜんしんを ピカッと ひからせて、くらやみを てらす。スマホの じゅうでんも できる。',
    from: 'ニューヨーク',
    buddy: 'ハムスター',
    buddyNote: 'いつも いっしょに ごはんを たべる。',
    routine: 'たべることが だいすき。まいにち かかさず じゅうでん。',
  },
  {
    id: 'oton',
    name: 'おとん',
    sensor: 'おとセンサー',
    color: '#a31cf0',
    ink: '#8a12d0',
    range: '0〜50',
    rangeNote: 'しずかだと 0、おとが おおきいほど 50に ちかづく。',
    personality: 'じぶんからは あまり うごかず、しじを まつ。きまぐれだけど まわりを なごませる。',
    ability: 'VOICE',
    abilityNote: 'うたごえで ひとを ねむらせたり、ほんとうの ことを かたらせたりする。',
    from: 'おきなわ',
    buddy: 'カメ',
    buddyNote: 'ライブの あいまに イスに なってくれる。',
    routine: 'まいにち 1じかん いじょう うたう。24じかん ねたことも ある。',
  },
];

export const SENSOR_BY_ID = Object.fromEntries(SENSORS.map((s) => [s.id, s])) as Record<
  SensorId,
  SensorCharacter
>;

export const NOTE_ARTICLES = [
  { title: 'センサーズの しゅっしんち', href: 'https://note.com/keepon_/n/n50fea11184aa' },
  { title: 'センサーズは のうりょくしゃ だった', href: 'https://note.com/keepon_/n/n49ed0e72fbef' },
  { title: 'センサーズの けんこうルーティン', href: 'https://note.com/keepon_/n/nbd9e777756d6' },
  { title: 'センサーズと あいぼうたち', href: 'https://note.com/keepon_/n/n47d866d35eec' },
];
