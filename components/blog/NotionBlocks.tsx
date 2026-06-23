import type { CSSProperties, ReactNode } from 'react';
import type { NotionBlock, RichText } from '@/lib/notion';

// Notion ブロックを React に描画する軽量レンダラ（依存ライブラリ無し）。
// 対応: 見出し / 段落 / 箇条書き / 番号付き / 引用 / コールアウト / コード /
//       画像 / 区切り / ToDo / テーブル。GEO的に重要な見出し・表・リストを網羅。

function RichTextRun({ rich }: { rich?: RichText[] }) {
  if (!rich?.length) return null;
  return (
    <>
      {rich.map((t, i) => {
        const a = t.annotations;
        let node: ReactNode = t.plain_text;
        if (a.code) node = <code className="blog-inline-code">{node}</code>;
        if (a.bold) node = <strong>{node}</strong>;
        if (a.italic) node = <em>{node}</em>;
        if (a.strikethrough) node = <s>{node}</s>;
        if (a.underline) node = <u>{node}</u>;
        if (t.href) {
          const external = /^https?:\/\//.test(t.href);
          node = (
            <a
              href={t.href}
              {...(external ? { target: '_blank', rel: 'noopener' } : {})}
            >
              {node}
            </a>
          );
        }
        return <span key={i}>{node}</span>;
      })}
    </>
  );
}

const rt = (b: NotionBlock): RichText[] =>
  ((b[b.type] as { rich_text?: RichText[] })?.rich_text ?? []) as RichText[];

function imageOf(b: NotionBlock) {
  const img = b.image as { file?: { url: string }; external?: { url: string }; caption?: RichText[] };
  return {
    url: img?.file?.url ?? img?.external?.url ?? '',
    caption: img?.caption ?? [],
  };
}

// 連続するリスト項目をまとめて <ul>/<ol> にする。
export function NotionBlocks({ blocks }: { blocks: NotionBlock[] }) {
  const out: ReactNode[] = [];
  let i = 0;
  while (i < blocks.length) {
    const b = blocks[i];
    if (b.type === 'bulleted_list_item' || b.type === 'numbered_list_item') {
      const type = b.type;
      const items: NotionBlock[] = [];
      while (i < blocks.length && blocks[i].type === type) {
        items.push(blocks[i]);
        i++;
      }
      const ListTag = type === 'bulleted_list_item' ? 'ul' : 'ol';
      out.push(
        <ListTag key={b.id} className="blog-list">
          {items.map((it) => (
            <li key={it.id}>
              <RichTextRun rich={rt(it)} />
              {it.children?.length ? <NotionBlocks blocks={it.children} /> : null}
            </li>
          ))}
        </ListTag>
      );
      continue;
    }
    out.push(<Block key={b.id} b={b} />);
    i++;
  }
  return <>{out}</>;
}

function Block({ b }: { b: NotionBlock }) {
  switch (b.type) {
    case 'heading_1':
      return <h2 className="blog-h2"><RichTextRun rich={rt(b)} /></h2>;
    case 'heading_2':
      return <h3 className="blog-h3"><RichTextRun rich={rt(b)} /></h3>;
    case 'heading_3':
      return <h4 className="blog-h4"><RichTextRun rich={rt(b)} /></h4>;
    case 'paragraph': {
      const r = rt(b);
      if (!r.length) return <p className="blog-p">&nbsp;</p>;
      return <p className="blog-p"><RichTextRun rich={r} /></p>;
    }
    case 'quote':
      return <blockquote className="blog-quote"><RichTextRun rich={rt(b)} /></blockquote>;
    case 'callout': {
      const icon = (b.callout as { icon?: { emoji?: string } })?.icon?.emoji;
      return (
        <div className="blog-callout">
          {icon && <span aria-hidden="true">{icon}</span>}
          <div><RichTextRun rich={rt(b)} /></div>
        </div>
      );
    }
    case 'code': {
      const code = (b.code as { rich_text?: RichText[] })?.rich_text ?? [];
      return (
        <pre className="blog-code"><code>{code.map((t) => t.plain_text).join('')}</code></pre>
      );
    }
    case 'to_do': {
      const checked = (b.to_do as { checked?: boolean })?.checked;
      return (
        <p className="blog-todo">
          <input type="checkbox" checked={!!checked} readOnly /> <RichTextRun rich={rt(b)} />
        </p>
      );
    }
    case 'divider':
      return <hr className="blog-hr" />;
    case 'image': {
      const { url, caption } = imageOf(b);
      if (!url) return null;
      return (
        <figure className="blog-figure">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt={caption.map((c) => c.plain_text).join('') || ''} loading="lazy" />
          {caption.length > 0 && (
            <figcaption className="blog-caption"><RichTextRun rich={caption} /></figcaption>
          )}
        </figure>
      );
    }
    case 'table': {
      const rows = (b.children ?? []).filter((c) => c.type === 'table_row');
      const hasHeader = Boolean((b.table as { has_column_header?: boolean })?.has_column_header);
      return (
        <div className="blog-table-wrap">
          <table className="blog-table">
            <tbody>
              {rows.map((row, ri) => {
                const cells = ((row.table_row as { cells?: RichText[][] })?.cells ?? []);
                const Cell = hasHeader && ri === 0 ? 'th' : 'td';
                return (
                  <tr key={row.id}>
                    {cells.map((cell, ci) => (
                      <Cell key={ci}><RichTextRun rich={cell} /></Cell>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
    case 'bookmark': {
      const url = (b.bookmark as { url?: string })?.url;
      if (!url) return null;
      return <p className="blog-p"><a href={url} target="_blank" rel="noopener">{url}</a></p>;
    }
    default:
      // 未対応ブロックは本文があれば段落として描画（取りこぼし防止）。
      return rt(b).length ? <p className="blog-p"><RichTextRun rich={rt(b)} /></p> : null;
  }
}

export const blogProseStyle: CSSProperties = {};
