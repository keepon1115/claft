# 「ラボの歩き方」A4チラシ（表裏2枚・4面）

指示書: `docs/LAB_ROADMAP_FLYER_BRIEF.md`（実装前に必ず参照）。
このフォルダは Next.js アプリのビルド対象外（`print/` は独立した印刷用データ）。

## 構成

```
print/lab-roadmap-flyer/
  build.mjs          … flyer.html を生成するビルドスクリプト（文言・配色データはここ）
  flyer.html          … 生成物。ブラウザで開いて確認 / 印刷できる
  assets/fonts/*.woff2 … Zen Maru Gothic・Noto Sans JP のサブセットフォント（このチラシで使う文字だけ）
  assets/lib/qrcode.js … QRコード生成ライブラリ（kazuhikoarase/qrcode-generator, MIT）
```

## 文言・配色を直すとき

`build.mjs` 内の `STATIONS` / `THEMES` / `HERO_LEAD` などの定数を編集し、

```sh
node build.mjs
```

を実行すると `flyer.html` が再生成される。**文言は `app/(lab)/lab/roadmap/RoadmapWalk.tsx` の原文からの抜粋のみ**（指示書の絶対制約）。

## ブラウザで確認する

`flyer.html` を直接ブラウザで開くと4面が縦に並んで表示される。
`flyer.html#page-cover` のように末尾にフラグメントを付けると、その面だけを単体表示できる
（検証用のデバッグ機能。印刷には影響しない）。フラグメント名は4つ:
`page-cover` / `page-front-half` / `page-back-half` / `page-loop`。

## PDF化（印刷入稿用）

Chrome の `--headless --print-to-pdf` を使う。CSS側で `@page { size: 216mm 303mm; margin: 0; }`
（A4 210×297mm + 塗り足し3mm）を指定済みなので、そのままA4+塗り足しのPDFになる。

```sh
"C:\Program Files\Google\Chrome\Application\chrome.exe" \
  --headless --disable-gpu --no-sandbox \
  --print-to-pdf="flyer.pdf" --no-pdf-header-footer \
  --virtual-time-budget=5000 \
  "file:///c:/dev/claft-HP/print/lab-roadmap-flyer/flyer.html"
```

出力される `flyer.pdf` は4ページ（面1〜4）。印刷所によっては
「1枚目=P1/P2の表裏」「2枚目=P3/P4の表裏」に分割・面付けし直す必要がある場合がある。

## QRコードの飛び先

- 表紙（面1）・面4下部の「KEEP ON LABO」QR: `https://claft.keeponlearning.fun/lab/roadmap`
  （正規ドメイン。**要確認**: 実際に公開されているドメインと一致するか再確認すること）
- 面4「受講申し込みをする」QR: `https://select-type.com/rsv/?id=3spOTwJvnpQ&c_id=429087`
  （RoadmapWalk.tsx 駅①の申込リンクと同一）

## まだ埋まっていないもの（指示書§9・オーナー確認事項）

面4下部に以下のプレースホルダを残してある。内容が決まり次第 `build.mjs` の
`page4` 定義内 `practical-placeholder` を実データに差し替える。

- 教室名・住所・料金・体験会の有無など（現状「教室名・住所・料金など【要確認】」の枠のみ）

そのほか指示書§9の未確定事項（配布シーン、セリフ抜粋の最終選定、写真素材の有無、
印刷所のトンボ・プロファイル仕様）はオーナー確認待ち。

## 実装メモ（レイアウトの工夫）

- 面2（駅①②③）は1列、面3（駅④⑤⑥⑦）は1ページに収まりきらないため2×2グリッドに変更。
  4駅を1列で並べるレイアウトは実測でA4 1枚に収まらなかった（要検証時の学び）。
- 駅④⑤⑥のセリフは、指示書§6の「短め扱い」指示に沿って原文から文単位で抜粋を絞っている
  （文の途中で切ってはいない。省略した文があるだけで、残した文は完全な原文のまま）。
- 保護者の声は面2ではオーバーラップする付箋、面3（グリッド）ではカード内蔵の
  付箋として統合（オーバーラップ配置は2×2グリッドと相性が悪いため）。
