import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ArrowRightDoodle } from "@/components/craft/HandDrawn";
import LiteYouTube from "@/components/exhibition/LiteYouTube";
import ReactionBar from "@/components/exhibition/ReactionBar";
import CommentSection from "@/components/exhibition/CommentSection";
import {
  fetchExhibitionBySlug,
  fetchReactionTally,
  fetchReactionTypes,
  fetchWorks,
} from "@/lib/exhibition/queries";
import type { ReactionTally, Work } from "@/lib/exhibition/types";

/* ============================================================
   なんでも展示会 2026年11月 作品一覧ページ
   - Supabase の exhibitions(slug: nandemo-2026-11) / works を取得して提出順（created_at 昇順）に表示
   - ロボット発表会（RobotPresentation2608）と違い、コース分けはしない
   - 未接続・作品0件のときは「準備中」を表示
============================================================ */

const EXHIBITION_SLUG = "nandemo-2026-11";

type WorkItem = { work: Work; tally: ReactionTally[] };

function BackLink() {
  return (
    <Link href="/futurecraft/Exhibition" className="nd-back">
      <ArrowLeft size={16} />
      なんでも展示会ページに戻る
    </Link>
  );
}

function PageHeader({ live }: { live: boolean }) {
  return (
    <section className="nd-hero">
      <div className="container">
        <p className="nd-hero-eyebrow reveal">
          <span className="craft-label">WORKS ・ 作品一覧</span>
        </p>

        <h1 className="nd-hero-title craft-misprint reveal">
          11月の作品一覧
          <br />
          なんでも展示会
        </h1>

        {!live && (
          <p className="nd-tt-note reveal" style={{ marginTop: 16 }}>
            ※ 現在は準備中です。作品が集まり次第、順次公開します。
          </p>
        )}

        <div className="nd-cta reveal">
          <BackLink />
        </div>
      </div>
    </section>
  );
}

function WorkCard({ item, index }: { item: WorkItem; index: number }) {
  const { work, tally } = item;
  // 作品リンク（ゲーム・アプリ等）は works.story_made に入っている（scripts/import-nandemo-works.mjs が保存）。
  // 作者の名前（author_nickname）は非公開のため、ここでは表示しない。
  // 説明文は author_intro、ボタン文言は story_devised（空なら「作品はこちら」）に入っている。
  const workLink = work.story_made;
  const description = work.author_intro;
  const buttonLabel = work.story_devised || "作品はこちら";
  return (
    <div className="rp-work reveal" style={{ transitionDelay: `${index * 70}ms` } as CSSProperties}>
      <div className="nd-exhibit-head">
        <h3 className="nd-exhibit-title">{work.title}</h3>
      </div>

      {description && (
        <p className="rp-story-body" style={{ marginBottom: 14 }}>
          {description}
        </p>
      )}

      {work.youtube_url && (
        <div className="nd-exhibit-video">
          <LiteYouTube url={work.youtube_url} title={work.title} />
        </div>
      )}

      {workLink && (
        <div className="nd-cta" style={{ marginTop: 16 }}>
          <a href={workLink} target="_blank" rel="noopener noreferrer" className="craft-sticker">
            {buttonLabel}
            <ArrowRightDoodle width={24} />
          </a>
        </div>
      )}

      {tally.length > 0 && (
        <div style={{ marginTop: 14 }}>
          <ReactionBar workId={work.id} initialCounts={tally} variant="picker" />
        </div>
      )}

      <div style={{ marginTop: 14 }}>
        <CommentSection workId={work.id} />
      </div>
    </div>
  );
}

export default async function ExhibitionWorks2611Content() {
  let items: WorkItem[] = [];

  try {
    const exhibition = await fetchExhibitionBySlug(EXHIBITION_SLUG);
    if (exhibition) {
      const works = await fetchWorks(exhibition.id);
      const reactionTypes = await fetchReactionTypes(exhibition.id);
      const tallies = await Promise.all(works.map((w) => fetchReactionTally(w.id, reactionTypes)));
      items = works.map((work, i) => ({ work, tally: tallies[i] }));
    }
  } catch {
    items = [];
  }

  const live = items.length > 0;

  return (
    <main className="nd-page nd-page--autumn">
      <PageHeader live={live} />

      {live && (
        <section className="nd-section">
          <div className="container">
            <div className="rp-works">
              {items.map((item, i) => (
                <WorkCard key={item.work.id} item={item} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="nd-section nd-section--last">
        <div className="container">
          <div className="nd-cta reveal">
            <Link href="/futurecraft/Exhibition" className="craft-sticker">
              なんでも展示会ページに戻る
              <ArrowRightDoodle width={24} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
