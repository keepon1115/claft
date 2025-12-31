# 📝 CLAFTタイポグラフィシステム ガイド

## 概要

このドキュメントは、CLAFTウェブサイト全体で統一されたタイポグラフィを使用するためのガイドです。
「入り口セクション（親子で参加）」カードのデザインから抽出した、理想的な文字のバランスをサイト全体に適用します。

---

## 🎯 デザイン原則

### 1. **見出し（Japanese Headings）**
- **特徴**: 太字で、文字が詰まりすぎないよう、わずかに字間を広げる
- **印象**: 堂々としていて、可読性が高い
- **Letter Spacing**: `0.01em` - `0.02em`
- **Font Weight**: `700` - `900` (Bold〜Black)

### 2. **本文（Body Text）**
- **特徴**: 行間を広めに取る（1.7〜1.8倍程度）
- **印象**: 窮屈感がなく、ゆったりと読むことができる「余白のある」テキスト
- **Line Height**: `1.7` - `1.8`
- **Letter Spacing**: `0em` (標準)

---

## 📊 CSS変数

### フォントサイズ（レスポンシブ）

```css
--text-xs: clamp(12px, 1.6vw, 14px);
--text-sm: clamp(13px, 1.8vw, 16px);
--text-base: clamp(15px, 2vw, 18px);
--text-lg: clamp(16px, 2.2vw, 20px);
--text-xl: clamp(18px, 2.4vw, 22px);
--text-2xl: clamp(20px, 2.8vw, 26px);
--text-3xl: clamp(24px, 3.5vw, 32px);
--text-4xl: clamp(28px, 4vw, 38px);
--text-5xl: clamp(32px, 5vw, 48px);
--text-6xl: clamp(36px, 6vw, 56px);
```

### 字間（Letter Spacing）

```css
--tracking-tighter: -0.02em;
--tracking-tight: -0.01em;
--tracking-normal: 0em;
--tracking-wide: 0.01em;
--tracking-wider: 0.02em;
--tracking-widest: 0.05em;
```

### 行間（Line Height）

```css
--leading-none: 1;
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.7;
--leading-loose: 1.8;
--leading-extra-loose: 2;
```

### ウェイト（Font Weight）

```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
--font-black: 900;
```

---

## 🎨 ユーティリティクラス

### 見出し（Headings）

#### `.heading-display`
- **用途**: ページの最上位見出し（ヒーローセクションなど）
- **サイズ**: `clamp(36px, 6vw, 56px)`
- **ウェイト**: 900 (Black)
- **字間**: 0.01em

```html
<h1 class="heading-display">未完成を、手づくりする</h1>
```

#### `.heading-xl`
- **用途**: セクションタイトル（大）
- **サイズ**: `clamp(32px, 5vw, 48px)`
- **ウェイト**: 900 (Black)

```html
<h2 class="heading-xl">CLAFTの学び</h2>
```

#### `.heading-lg`
- **用途**: セクションタイトル（中）
- **サイズ**: `clamp(28px, 4vw, 38px)`
- **ウェイト**: 800 (ExtraBold)

```html
<h2 class="heading-lg">ナビゲーター</h2>
```

#### `.heading-md`
- **用途**: カードタイトル・サブセクション
- **サイズ**: `clamp(24px, 3.5vw, 32px)`
- **ウェイト**: 800 (ExtraBold)
- **例**: 「親子で参加」「大人として参加」

```html
<h3 class="heading-md">親子で参加</h3>
```

#### `.heading-sm`
- **用途**: 小見出し
- **サイズ**: `clamp(20px, 2.8vw, 26px)`
- **ウェイト**: 700 (Bold)

```html
<h4 class="heading-sm">探究・対話・実践</h4>
```

---

### サブタイトル・キャプション

#### `.subtitle`
- **用途**: 英語のサブタイトル
- **サイズ**: `clamp(13px, 1.8vw, 16px)`
- **ウェイト**: 600 (SemiBold)
- **字間**: 0.05em（広め）
- **例**: "Kids & Parents"

```html
<p class="subtitle">Kids & Parents</p>
```

#### `.caption`
- **用途**: 注釈・補足説明
- **サイズ**: `clamp(12px, 1.6vw, 14px)`
- **ウェイト**: 500 (Medium)

```html
<p class="caption">※2024年度の実績です</p>
```

---

### 本文（Body Text）

#### `.body-xl`
- **用途**: リード文・大きめの本文
- **サイズ**: `clamp(18px, 2.4vw, 22px)`
- **行間**: 1.8（ゆったり）

```html
<p class="body-xl">
  自分のキャリアを自律的に築きたい
  「子ども」と「大人」のための教育コミュニティ
</p>
```

#### `.body-lg`
- **用途**: 強調したい本文
- **サイズ**: `clamp(16px, 2.2vw, 20px)`
- **行間**: 1.8

```html
<p class="body-lg">
  お子さまの可能性を広げたい保護者の方へ。
</p>
```

#### `.body-base`（推奨・デフォルト）
- **用途**: 通常の本文
- **サイズ**: `clamp(15px, 2vw, 18px)`
- **行間**: 1.8（ゆったり）
- **例**: 「お子さまの可能性を...」

```html
<p class="body-base">
  お子さまの可能性を広げたい保護者の方へ。
  <br />
  <strong>小学生・中学生・高校生</strong>が対象です。
</p>
```

#### `.body-sm`
- **用途**: 小さめの本文
- **サイズ**: `clamp(13px, 1.8vw, 16px)`
- **行間**: 1.7

```html
<p class="body-sm">詳細はお問い合わせください。</p>
```

---

### 特殊用途

#### `.lead`
- **用途**: セクションの導入文
- **サイズ**: `clamp(16px, 2.2vw, 20px)`
- **ウェイト**: 500 (Medium)
- **行間**: 1.8
- **字間**: 0.02em（やや広め）

```html
<p class="lead">
  勉強ではなく、新たなモノをつくる「冒険」
</p>
```

#### `.emphasis`
- **用途**: インラインの強調
- **ウェイト**: 700 (Bold)

```html
<p class="body-base">
  CLAFTでは<span class="emphasis">創造性</span>と
  <span class="emphasis">対話力</span>を大切にします。
</p>
```

---

## 💡 使用例

### 例1: カードデザイン（親子で参加）

```html
<div class="card">
  <!-- アイコン -->
  <div style="font-size: clamp(50px, 10vw, 70px);">👨‍👩‍👧‍👦</div>
  
  <!-- メインタイトル -->
  <h3 class="heading-md">親子で参加</h3>
  
  <!-- サブタイトル -->
  <p class="subtitle">Kids & Parents</p>
  
  <!-- 説明文 -->
  <p class="body-base">
    お子さまの可能性を広げたい保護者の方へ。
    <br />
    <strong>小学生・中学生・高校生</strong>が対象です。
  </p>
  
  <!-- ボタン -->
  <button class="btn">このドアを開く</button>
</div>
```

### 例2: セクションヘッダー

```html
<section>
  <!-- タイトル -->
  <h2 class="heading-xl">CLAFTの学び</h2>
  
  <!-- リード文 -->
  <p class="lead">勉強ではなく、新たなモノをつくる「冒険」</p>
  
  <!-- 本文 -->
  <p class="body-base">
    CLAFTでは、探究・対話・実践を通じて、
    自分だけの学びを深めていきます。
  </p>
</section>
```

### 例3: ナビゲーター紹介

```html
<section>
  <!-- タイトル -->
  <h2 class="heading-lg">ナビゲーター</h2>
  
  <!-- サブタイトル -->
  <p class="lead">あなたの冒険を、一緒に歩む仲間</p>
  
  <!-- 本文 -->
  <p class="body-base">
    CLAFTは、完璧を目指す場所ではありません。
  </p>
  
  <p class="body-base">
    試行錯誤しながら、自分だけの道を見つけていく——
    <br />
    そんな<span class="emphasis">「未完成の美しさ」</span>を大切にしています。
  </p>
</section>
```

---

## 🔧 インラインスタイルでの使用

CSS変数を直接使用する場合：

```jsx
<h3 style={{
  fontSize: 'var(--text-3xl)',
  fontWeight: 'var(--font-extrabold)',
  lineHeight: 'var(--leading-snug)',
  letterSpacing: 'var(--tracking-wide)',
  color: 'var(--ink-900)'
}}>
  親子で参加
</h3>

<p style={{
  fontSize: 'var(--text-base)',
  lineHeight: 'var(--leading-loose)',
  color: 'var(--ink-700)'
}}>
  お子さまの可能性を広げたい保護者の方へ。
</p>
```

---

## 📱 レスポンシブ対応

すべてのフォントサイズは`clamp()`関数を使用しているため、自動的にレスポンシブに対応します：

```css
/* モバイル（最小）→ タブレット → デスクトップ（最大） */
--text-3xl: clamp(24px, 3.5vw, 32px);
                 ↑      ↑      ↑
              モバイル  可変   PC
```

---

## ✅ チェックリスト

新しいコンポーネントを作成する際のチェックリスト：

- [ ] 見出しには `.heading-*` クラスを使用
- [ ] 本文には `.body-base` を基本として使用
- [ ] サブタイトルには `.subtitle` を使用
- [ ] リード文には `.lead` を使用
- [ ] 行間は `1.7` - `1.8` を保つ
- [ ] 見出しの字間は `0.01em` - `0.02em` を保つ
- [ ] 色は CSS変数（`var(--ink-*)`)を使用

---

## 🎨 カラー参照

タイポグラフィと組み合わせて使用する色：

```css
--ink-900: #1f2937;  /* メインテキスト・見出し */
--ink-800: #273446;  /* 濃いめのテキスト */
--ink-700: #374151;  /* 本文 */
--ink-600: #4b5563;  /* サブテキスト */
--ink-500: #6b7280;  /* キャプション */
```

---

## 🚀 実装の推奨フロー

1. **既存コンポーネントの更新**
   - 一つずつクラスを適用
   - 視覚的な確認を行う

2. **新規コンポーネント**
   - 最初からユーティリティクラスを使用
   - このガイドを参照

3. **一貫性の維持**
   - インラインスタイルよりクラスを優先
   - 独自の値を避ける（CSS変数を使用）

---

**制作日**: 2025年12月3日  
**バージョン**: 1.0  
**プロジェクト**: CLAFT ウェブサイト タイポグラフィシステム

