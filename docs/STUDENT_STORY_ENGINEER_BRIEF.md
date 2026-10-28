# 指示書：CLAFT「メンバーのストーリー」ページ改修

この指示書だけで作業を始められるように書いてあります。上から順に進めてください。

---

## 0. あなたへのお願い（作業のルール）
- 作業するリポジトリは、CLAFTのホームページ（Next.js / TypeScript / Tailwind、Vercelにデプロイ）です。
- **最初の返答では実装を始めない。** 「1. 最初に読むファイル」を読んだうえで、「9. 最初の返答で返すもの」を返し、承認を待ってください。
- 保守するのは1人です。依存パッケージは最小限にします（追加してよいのは `exceljs`、`qrcode`、`zod` だけ）。DBは使いません。
- 今のデザイン（`craft-paper`・`craft-tape`・`ss-*` などのクラス、手描き風の装飾）を必ず使い回してください。新しい見た目は、既存のクラスを組み合わせて作ります。
- **ストーリーの文言は1文字も変えない。** 誤字に気づいても直さず、報告だけしてください。
- 迷ったら勝手に決めず、質問としてまとめて返してください。

---

## 1. 最初に読むファイル
添付で確認できているもの：
- `app/student-story/page.tsx`（一覧ページ）
- `components/student-story/` の `index.ts`、`HeroSection`、`StudentCard`、`StudentDetailContent`、`PersonalCard`、`FutureVision`、`CurrentActions`、`Timeline`、`BackButton`、`CTASection`

**まだ確認できていないので、リポジトリで探して読むもの：**
- `lib/studentData.ts`：今のデータと型（`StudentProfile`、`studentsData`）
- 詳細ページのルート：`app/student-story/[slug]/page.tsx`（`generateStaticParams` と `metadata` があるはず）
- `ss-avatar`、`ss-item`、`ss-tag`、`ss-timeline`、`ss-now`、`ss-back` を定義しているCSS
- `components/craft/`（`SectionTitle`、`DoodleIcon` で使えるアイコン名、`HandDrawn`）
- `package.json`（Next.jsのバージョンと、App Routerかどうか）

---

## 2. ゴール
1. Excel「メンバーストーリー_管理シート.xlsx」を更新して `npm run import:stories` を流すと、HPのデータが更新される。
2. Excel側で「非公開」にした人・項目・出来事は、HPに一切出ない。
3. 次の7つの機能が入る（詳しくは「5. 実装する機能」）。
   - A. 後からつながったこと（ページの山場）
   - B. 本人の言葉（名前の下に大きく）
   - C. 今年の目標と強み
   - D. タイムラインの「NOW」を自動にする
   - E. A4の印刷用ページ（QRコード2つ）
   - F. 「好き」の移り変わり
   - G. 作品動画の埋め込みと、一覧ページのタグ絞り込み

---

## 3. データの流れ
```
メンバーストーリー_管理シート.xlsx （リポジトリの外に置く。GitHubに上げない）
        │  npm run import:stories -- <xlsxのパス>
        ▼
scripts/import-stories.ts （公開してよいものだけを抜き出す）
        │
        ▼
data/student-stories.json （これだけコミットする）
        │
        ▼
lib/studentData.ts → 一覧・詳細・印刷ページ（すべてSSG）
```
- **ExcelにはHPに出さないメモ（interviews シートの privateNote など）が入っています。** Excel本体はリポジトリに入れないでください。`.gitignore` に `*.xlsx` を追加します。
- スクリプトは、引数でxlsxのパスを受け取ります。引数がなければ、環境変数 `STORIES_XLSX` を見ます。

---

## 4. Excelの読み方

### シートと列
**どのシートも、1行目が英語の項目名、2行目が日本語の説明です。データは3行目から読みます。**

**members**（1人＝1行）
| 列 | 型・形式 | 使い道 |
|---|---|---|
| slug | 英小文字 | URL `/student-story/{slug}` |
| name | ひらがな | |
| status | 「公開」／「下書き」 | 「公開」の人だけ出力する |
| grade | 文字列 | |
| avatarEmoji | 絵文字1つ | 空なら `🌟` |
| shortIntro | 文字列 | 一覧カード |
| likes | 「、」区切り | 配列にする |
| character | 文字列 | 自分のキャラ |
| strengths | 文字列 | 強み（新しく表示） |
| motivationEnv | 文字列 | やる気が出る環境 |
| vision_text / vision_subText | 文字列（改行あり） | なりたい姿 |
| goal_thisYear | 文字列（改行あり） | 今年の目標（新しく表示） |
| action1_title / action1_desc / action1_emoji | 文字列 | 今挑戦していること |
| action1_tags | 「、」区切り | 配列にする |
| quote | 文字列 | 本人の言葉（新しく表示） |
| laterConnection | 文字列 | 後からつながったこと（新しく表示） |
| visitorQuestion | 文字列 | 見に来た人への質問（新しく表示） |
| exhibitVideoUrl | YouTubeのURL（`?t=秒` が付くことあり） | 動画の埋め込み・QR |
| updatedAt | `YYYY-MM` | 「2026年10月時点」の表示、NOWの年月 |
| interestTags | 「、」区切り | 一覧ページの絞り込み |
| hiddenFields | 項目の英語名を「、」区切り | ここに書かれた項目は出力しない |

**timeline**（1出来事＝1行）：`slug`, `date`（YYYY-MM）, `category`, `title`, `desc`, `public`（○／×）

**interviews**（面談1回＝1行）：**`slug`、`date`、`likes3` の3列だけ**を読みます。それ以外の列は絶対に読まない・出力しないでください。

**使い方／confirm／fields** の3シートは読みません。

### 非公開のルール（最重要・この順にすべて適用する）
1. `status` が「公開」でない人は出力しない（一覧・詳細・印刷・`generateStaticParams` のどれにも出さない）。
2. **セルに「【要確認】」が含まれていたら、その項目は空として扱う。** 文字列の一部に含まれている場合も同じです。
3. `hiddenFields` に書かれた項目名は空として扱う。
4. timeline は `public` が「○」の行だけを出す。
5. interviews の `likes3` も、2のルール（【要確認】は空）を適用する。
6. 空になった項目は、**セクションごと表示しない**（見出しだけを残さない）。
7. 取り込みが終わったら、コンソールに次の2つを出す。
   - 【要確認】や hiddenFields で非公開にした項目の一覧（slug と項目名）
   - status が「下書き」で出力しなかった人の一覧

### 値の整え方
- 前後の空白を取る。セル内の改行は `\n` で残す（表示は `white-space: pre-line`）。
- `date`／`updatedAt` がExcelの日付型で入っていたら、`YYYY-MM` に直す。
- 必須項目（slug, name, grade, shortIntro）のどれかが空の「公開」メンバーがいたら、エラーで止めて slug を表示する（zodで検証）。

### 出力するJSONの型（`lib/studentData.ts` で export する）
```ts
export type StoryEvent = { date: string; category?: string; title: string; description?: string; isCurrent?: boolean };
export type LikesSnapshot = { date: string; likes: string };
export type StudentStory = {
  slug: string; name: string; grade: string; avatarEmoji: string; shortIntro: string;
  likes: string[]; character?: string; strengths?: string; motivationEnv?: string;
  futureVision?: { text: string; subText?: string };
  goalThisYear?: string;
  currentActions: { title: string; description: string; emoji: string; tags?: string[] }[];
  quote?: string; laterConnection?: string; visitorQuestion?: string;
  exhibitVideoUrl?: string; updatedAt?: string;
  interestTags: string[];
  likesHistory: LikesSnapshot[];   // interviews の likes3 を日付順に並べたもの
  timeline: StoryEvent[];          // NOW の行は含めない（表示側で足す）
};
```
- 今の `StudentProfile` 型や、`currentActions` などの名前と合わせられるなら合わせてください。違いがあれば、最初の返答で報告してください。
- **一覧にいる「しょういちろう（CLAFT代表）」は、Excelに入っていません。** 今の `studentData.ts` から手書きのデータとして残し、Excelのメンバーの後ろに並べてください。

---

## 5. 実装する機能

### A. 後からつながったこと（ページの山場）
- 新しいコンポーネント `LaterConnection.tsx` を作る。表示する場所は、「今、挑戦していること」の後、「スクールでの歩み」の前。
- 見出しは「後からつながったこと」。サブコピーとして「意味は、やり続けた後からついてくる」を入れる。
- ページの中で一番目立つカードにする（`craft-paper--warm`、テープ2枚、少し大きめの文字）。
- `laterConnection` が空なら表示しない。

### B. 本人の言葉
- `PersonalCard` の名前・学年のすぐ下に、`quote` を「」付きの大きめの引用として出す（`heading-md` 程度）。
- 空なら表示しない。

### C. 今年の目標と強み
- `strengths`：`PersonalCard` の「自分のキャラ」の次に、`ProfileItem` を1つ足す（ラベル「強み」）。
- `goalThisYear`：`FutureVision` のカードの中、サブテキストの下に「今年の目標」として出す。改行はそのまま残す。
- どちらも、空なら表示しない。

### D. タイムラインの「NOW」を自動にする
- 今は「2026年1月 NOW」が固定になっています。`Timeline` に渡す配列の最後に、表示側で次の行を足してください。
  - `date`：`updatedAt` を「2026年10月」の形にしたもの
  - `title` / `description`：`currentActions[0]` の title / description
  - `isCurrent: true`
- `updatedAt` か `currentActions[0]` がない場合は、NOWの行を足さない。
- timeline の日付も「2018年1月」の形で表示する。`category` があれば、日付の横に小さなラベルを出す。

### E. A4の印刷用ページ
- ルートは `app/student-story/[slug]/print/page.tsx`。SSGにして、`generateStaticParams` は公開メンバーだけにする。
- `@page { size: A4 portrait; margin: 12mm; }` で、**必ずA4縦1枚に収める**。ヘッダー・ナビ・フッター・CTA・LINEボタンは出さない（印刷用のレイアウトを分けるか、`print:hidden` で隠す）。
- 載せるもの（上から）：絵文字・名前・学年 → 本人の言葉 → ひとこと紹介 → 好きなこと → 今挑戦していること → 後からつながったこと → 見に来た人への質問 → QRコード2つ
- QRコード（`qrcode` で、ビルド時にSVGを作る）
  1. ストーリーのページ：`https://claft.keeponlearning.fun/student-story/{slug}`（ラベル「ストーリーを読む」）
  2. 発表会の動画：`exhibitVideoUrl` をそのまま使う（ラベル「発表を見る」）。空ならこのQRは出さない
- 文字が多い人もいるので、収まらないときは文字サイズを段階的に小さくする（JSで測らず、文字数をもとにクラスを切り替える程度でよい）。
- `app/student-story/print-all/page.tsx` も作る。公開メンバー全員分を、1人1ページで改ページ（`break-after: page`）して並べる。
- 印刷用ページは `robots: { index: false }` にする。

### F. 「好き」の移り変わり
- 新しいコンポーネント `LikesHistory.tsx` を作る。表示する場所は `PersonalCard` の直後。
- `likesHistory` が2件以上あるときだけ表示する。いちばん新しい「好き」は `likes` から作り、`updatedAt` の日付で最後に足す。
- 見出しは「『好き』の移り変わり」。日付と内容を、左から右へ（スマホでは上から下へ）矢印でつないで並べる。
- 表示例：「2025年：ゲーム制作（RPG）、農業、演劇、創作物 → 2026年8月：…… → 2026年10月：（今の likes）」
- 一言添える：「好きは、変わっていい。」

### G-1. 作品動画の埋め込み
- 新しいコンポーネント `ExhibitVideo.tsx` を作る。表示する場所は「今、挑戦していること」の直後。見出しは「発表を見る」。
- URLの変換ルール：
  - `https://youtu.be/{ID}?t=1380` と `https://www.youtube.com/watch?v={ID}&t=1380` の両方に対応する
  - 埋め込み先は `https://www.youtube-nocookie.com/embed/{ID}?start=1380`（`t` がなければ `start` も付けない）
- 最初はサムネイル画像（`https://i.ytimg.com/vi/{ID}/hqdefault.jpg`）だけを出し、クリックしたら iframe に切り替える（ページを軽くするため）。
- 何人かは同じ動画で、開始位置だけが違います。開始位置をきちんと反映させてください。
- URLが空なら表示しない。

### G-2. 一覧ページのタグ絞り込み
- 一覧のカードの上に、全員の `interestTags` を重複なしで集めたボタンを並べる。先頭に「すべて」を置く。
- タグを押すと、そのタグを持つ人だけが表示される（1つずつ選ぶ形でよい）。状態は URL の `?tag=` に持たせ、共有できるようにする。
- しょういちろうのカードは絞り込みの対象にせず、「すべて」のときだけ表示する。
- タグが1つもなければ、ボタンの行ごと表示しない。
- `StudentCard` に `interestTags` を小さな `ss-tag` で表示する。

---

## 6. 詳細ページのセクションの順番
1. 戻るボタン
2. PersonalCard（名前・学年 → **本人の言葉** → 好きなこと・自分のキャラ・**強み**・やる気が出る環境）
3. **好きの移り変わり**（F）
4. なりたい姿（＋**今年の目標**）
5. 今、挑戦していること
6. **発表を見る**（G-1）
7. **後からつながったこと**（A）
8. スクールでの歩み（**NOWは自動**）
9. **見に来た人への質問**：「{name}から、あなたへの質問」として、小さなカードで表示
10. 「{updatedAt}時点の内容です」（小さな文字）
11. CTA

---

## 7. 守ること
- 顔写真は使わない。HPに出してよいのは、名前（ひらがな）・学年・動画まで。
- Excelにない情報を推測で書き足さない。
- 「特性」という言葉はUIに使わない（言い換えるなら「その子らしさ」）。
- スマホ表示（幅375px）で崩れないようにする。
- 今の `useReveal`（`reveal` クラスのアニメーション）を、新しいセクションにも付ける。

---

## 8. 完了の条件（全部確認してから報告する）
1. `npm run import:stories -- ./メンバーストーリー_管理シート.xlsx` で `data/student-stories.json` ができる。非公開にした項目と、出力しなかった人の一覧がコンソールに出る。
2. 公開メンバーは今の時点で **はると・ひかる・けんしろう・あお・あきひと・しょうご・あかり の7人**（＋しょういちろう）。下書きの5人（しんのすけ・けいすけ・ゆうし・はるれ・そうた）は、一覧にも `/student-story/keisuke` などのURLにも出ない（404になる）。
3. 生成したJSONと、ビルド後のHTMLのどちらにも、文字列「【要確認】」と、interviews の likes3 以外の列の内容が含まれていない（`grep` で確認する）。
4. はるとのページで、好きの移り変わり・本人の言葉・強み・今年の目標・動画・NOW（2026年10月）が表示される。
5. ひかるの動画が23分（1380秒）から再生される。
6. `/student-story/akari/print` を Chrome で印刷プレビューすると、A4縦1枚に収まり、QRコードが2つ読み取れる。
7. `/student-story?tag=音楽` で、あかりだけが表示される。
8. `npm run build` と `npm run lint` がエラーなしで通る。
9. README に「Excelを更新してからHPに反映するまでの手順」と「列を足すときの手順」を追記する。

---

## 9. 最初の返答で返すもの（まだ実装しない）
1. 「1. 最初に読むファイル」を読んだ結果：今のデータ構造と、変えるファイル・新しく作るファイルの一覧
2. 「4. 出力するJSONの型」と今の型の違い、それにどう合わせるか
3. A〜Gそれぞれ、どれくらい大変か（小・中・大）と、作業する順番の案
4. 将一郎に判断してほしいこと（あれば）
