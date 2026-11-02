# メンバーストーリー更新ルール（スプレッドシート → data/student-stories.json）

メンバーストーリー（`/student-story`）と印刷ページは、Googleスプレッドシートに書いた内容を AI が取り込みスクリプト経由で `data/student-stories.json` に反映して更新する。
**スプレッドシート＝オーナーが編集する場所／student-stories.json＝いまページに出ている内容（正）**。反映先がリポジトリ内のファイルなので、**公開にはコミット・プッシュ（Vercelのデプロイ）が必要**。

- シート：https://docs.google.com/spreadsheets/d/1m2mx1_F8lbKIC27w73TXlychcddvAn46EJqLcdKg-1Q/edit
- ファイルID：`1m2mx1_F8lbKIC27w73TXlychcddvAn46EJqLcdKg-1Q`（Google Drive連携で読む）
- 形式は必ず**Googleスプレッドシート形式**にする。Excelファイル（.xlsx）のままだと、読み取り時に絵文字が文字化けする。
- なんでも展示会（[NANDEMO_WORKS_SHEET_RULES.md](./NANDEMO_WORKS_SHEET_RULES.md)）と同じ運用。

## コピペ用プロンプト

```
メンバーストーリーを、スプレッドシートの内容で更新をお願いします。
シート：（シートのURL）
ルール：docs/MEMBER_STORIES_SHEET_RULES.md を読んでから作業してください。
まずお試し実行（--dry-run）の差分一覧を見せて、OKしたら反映してください。
```

## シートの見方

どのタブも、1行目が英語の項目名（変更しない）、2行目が日本語の説明、データは3行目から。列は**見出し名**で読むので、順番を入れ替えてもよい。

| タブ | 1行の単位 | 列 |
|---|---|---|
| members | 1人 | slug, name, status, grade, avatarEmoji, iconUrl, shortIntro, likes, character, strengths, motivationEnv, vision_text, vision_subText, goal_thisYear, action1_title, action1_desc, action1_emoji, action1_tags, quote, laterConnection, visitorQuestion, workUrl, exhibitVideoUrl, updatedAt, interestTags, hiddenFields |
| timeline | 1出来事 | slug, date, category, title, desc, public |
| likesHistory | 1回分 | slug, date, likes |

| 列 | 中身 |
|---|---|
| iconUrl | 印刷の表面右上に出す正方形の画像URL（`https://`）。空なら同じ枠に avatarEmoji を出す |
| workUrl | 印刷の表面に「作品を見る」QRとして出すURL（`https://`）。空なら欄ごと出ない |
| likes・action1_tags・interestTags・hiddenFields | 複数の値は「、」区切り |
| date・updatedAt | `2026-10` の形（年だけなら `2026`） |

### 非公開のルール
- status が「公開」でない人は出ない。
- セルに `【要確認】` が含まれる項目は出ない（文字列の一部でも同じ）。
- hiddenFields に書いた項目名は出ない。
- timeline は public が `○` の行だけ出る。
- 空になった項目は、セクションごと出ない。

### 印刷に出る項目
- 表面：名前・学年、アイコン、shortIntro、好きなこと、自分のキャラ、強み、今挑戦していること、workUrl のQR
- 裏面：なりたい姿（補足・今年の目標を含む）、スクールでの歩み（最後にNOW）、ストーリーページのQR
- `quote`・`laterConnection`・`visitorQuestion` はWebページにだけ出る。

## AIが守る手順

1. シートを `read_file_content` で読む（Google Drive連携）。
2. スクラッチパッド等の一時ディレクトリに、UTF-8 の `members.csv`・`timeline.csv`・`likesHistory.csv` として**セルの内容を1文字も変えずに**書き出す（プロジェクト内にCSVを残さない）。読み取り結果が途中で切れていないか、行数も確認する。
3. **お試し実行**：`npm run import:stories -- <CSVフォルダ> --dry-run`。書き込まず、項目単位の差分・警告・非公開にした項目・下書きの人が出る。
   - 入力チェックNG（必須項目の空欄、`https://` で始まらないURL）が出たら、何も書き込まれない。内容をオーナーに伝えて終わる。
   - シートを直していない項目が差分に出たら、読み写しの誤りを疑い、CSVを見直す。
   - 絵文字の文字化け警告が出たら、オーナーに伝える（今の値が保たれる）。
4. 差分一覧をオーナーに見せ、OKをもらう。
5. OKが出たら `--dry-run` を外して本番実行し、`npm run build` が通ることを確認する。
6. コミット・プッシュは、指示があった時だけ行う。プッシュされるとVercelでデプロイされ、公開される。

## 注意

- **このシートに非公開情報を書かない。** 面談メモなどは別ファイルの面談記録（`メンバーストーリー_管理シート`）にだけ置く。AIは更新時に面談記録を読まない。
- slug は URL になるので、一度決めたら変えない。
- 文言は1文字も変えない。誤字に気づいても直さず、オーナーに報告する。
- 一覧の表示順は members の行の並び順。しょういちろう（CLAFT代表）はシートに入れず、`lib/studentData.ts` に手書きで持つ。
- 印刷は `/student-story/{slug}/print`（1人）と `/student-story/print-all`（全員）。Chromeで A4・縦・両面（長辺とじ）・余白デフォルト・ヘッダーとフッターなし・背景のグラフィックあり。
