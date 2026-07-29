import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ArrowRightDoodle, Underline } from "@/components/craft/HandDrawn";
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
   ロボット発表会 2026年8月 作品紹介ページ
   - Supabase の exhibitions(slug: robot-2026-08) / works を取得して表示
   - コース（キッズ／エジソン／エキスパート）別にセクション分けし、
     上部のボタンからアンカーリンクでジャンプできる
   - 未接続・作品0件のときは仮動画1本の静止フォールバックを表示
     （Supabase復旧後、作品を登録すれば自動でコメント・リアクション付きに切り替わる）
============================================================ */

const EXHIBITION_SLUG = "robot-2026-08";

// フォールバック用の仮サンプル（Supabase未接続、または作品0件のとき表示）
const SAMPLE_YOUTUBE_URL = "https://youtu.be/07_GRHVoA34";

// コース定義（works.course の値と label を一致させる）
const COURSES: { id: string; label: string; lineColor: string; variant: 1 | 2 | 3 }[] = [
  { id: "kids", label: "キッズ", lineColor: "var(--green)", variant: 1 },
  { id: "edison", label: "エジソン", lineColor: "var(--brand)", variant: 2 },
  { id: "expert", label: "エキスパート", lineColor: "var(--pink)", variant: 3 },
];

// 応募フォームの3問を、既存の Work スキーマの空きカラムに割り当てて保存している。
// （author_intro＝何をどんなふうに改造したか / story_devised＝仕組みやアピールポイント /
//   story_learned＝感想や良くしたいポイント。story_made / story_struggled は不使用）
const STORY_BLOCKS: { key: keyof Work; label: string }[] = [
  { key: "author_intro", label: "何をどんなふうに改造したか" },
  { key: "story_devised", label: "仕組みやアピールポイント" },
  { key: "story_learned", label: "感想や良くしたいポイント" },
];

function WorkStory({ work }: { work: Work }) {
  const blocks = STORY_BLOCKS.filter((b) => work[b.key]);
  if (blocks.length === 0) return null;
  return (
    <div className="rp-story">
      {blocks.map((b) => (
        <div key={b.key}>
          <p className="rp-story-label">【{b.label}】</p>
          <p className="rp-story-body">{work[b.key] as string}</p>
        </div>
      ))}
    </div>
  );
}

/** コース見出し。上部の紙ラベルだけを見出しとして使い、下に手描きの下線を引く */
function CourseHeading({
  label,
  lineColor,
  variant,
}: {
  label: string;
  lineColor: string;
  variant: 1 | 2 | 3;
}) {
  return (
    <div className="rp-course-head reveal">
      <h2 className="craft-label rp-course-label">COURSE ・ {label}</h2>
      <Underline
        variant={variant}
        className="rp-course-line craft-draw"
        style={{ color: lineColor }}
      />
    </div>
  );
}

function BackLink() {
  return (
    <Link href="/futurecraft/RobotPresentation" className="nd-back">
      <ArrowLeft size={16} />
      ロボット発表会ページに戻る
    </Link>
  );
}

function CourseNav({ counts }: { counts: Map<string, number> }) {
  return (
    <div className="nd-chips reveal">
      {COURSES.map((c) => (
        <a key={c.id} href={`#course-${c.id}`} className="craft-sticker craft-sticker--ghost">
          {c.label}（{counts.get(c.label) ?? 0}）
        </a>
      ))}
    </div>
  );
}

function PageHeader({ live, counts }: { live: boolean; counts: Map<string, number> }) {
  return (
    <section className="nd-hero">
      <div className="container">
        <p className="nd-hero-eyebrow reveal">
          <span className="craft-label">WORKS ・ 作品一覧</span>
        </p>

        <h1 className="nd-hero-title craft-misprint reveal">
          8月のテーマ
          <br />
          未来のお仕事ロボット
        </h1>

        {!live && (
          <p className="nd-tt-note reveal" style={{ marginTop: 16 }}>
            ※ 現在は準備中です。作品が集まり次第、順次公開します。まずは仮の動画を1本掲載しています。
          </p>
        )}

        {live && <CourseNav counts={counts} />}

        <div className="nd-cta reveal">
          <BackLink />
        </div>
      </div>
    </section>
  );
}

type WorkItem = { work: Work; tally: ReactionTally[] };

function WorkCard({ item, index }: { item: WorkItem; index: number }) {
  const { work, tally } = item;
  return (
    <div
      className="rp-work reveal"
      style={{ transitionDelay: `${index * 70}ms` } as CSSProperties}
    >
      <div className="nd-exhibit-head">
        <h3 className="nd-exhibit-title">{work.title}</h3>
        <p className="nd-exhibit-theme">
          つくった人: {work.author_nickname}
          {work.genre ? ` ・ ${work.genre}` : ""}
        </p>
      </div>

      {work.youtube_url ? (
        <div className="nd-exhibit-video">
          <LiteYouTube url={work.youtube_url} title={work.title} />
        </div>
      ) : work.thumbnail_url ? (
        <div className="nd-exhibit-video">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={work.thumbnail_url}
            alt={work.title}
            style={{ width: "100%", height: "auto", borderRadius: 20 }}
            loading="lazy"
          />
        </div>
      ) : null}

      <WorkStory work={work} />

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

function CourseSections({ items }: { items: WorkItem[] }) {
  const grouped = new Map<string, WorkItem[]>();
  for (const item of items) {
    const key = item.work.course ?? "";
    const list = grouped.get(key) ?? [];
    list.push(item);
    grouped.set(key, list);
  }

  const known = new Set(COURSES.map((c) => c.label));
  const others = items.filter((item) => !known.has(item.work.course ?? ""));

  return (
    <>
      {COURSES.map((c) => {
        const courseItems = grouped.get(c.label) ?? [];
        return (
          <section key={c.id} id={`course-${c.id}`} className="nd-section nd-course-anchor">
            <div className="container">
              <CourseHeading label={c.label} lineColor={c.lineColor} variant={c.variant} />
              {courseItems.length > 0 ? (
                <div className="rp-works">
                  {courseItems.map((item, i) => (
                    <WorkCard key={item.work.id} item={item} index={i} />
                  ))}
                </div>
              ) : (
                <p className="nd-tt-note reveal" style={{ textAlign: "center" }}>
                  まだ作品がありません。順次追加していきます。
                </p>
              )}
            </div>
          </section>
        );
      })}

      {others.length > 0 && (
        <section id="course-other" className="nd-section nd-course-anchor">
          <div className="container">
            <CourseHeading label="その他" lineColor="var(--cream)" variant={1} />
            <div className="rp-works">
              {others.map((item, i) => (
                <WorkCard key={item.work.id} item={item} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function FallbackWorks() {
  return (
    <div className="nd-exhibits">
      <div
        className="nd-exhibit craft-paper craft-tilt reveal"
        style={{ "--rot": "-0.5deg" } as CSSProperties}
      >
        <div className="nd-exhibit-head">
          <h3 className="nd-exhibit-title">サンプル作品</h3>
          <p className="nd-exhibit-theme">未来のお仕事ロボット（掲載イメージ）</p>
        </div>
        <div className="nd-exhibit-video">
          <LiteYouTube url={SAMPLE_YOUTUBE_URL} title="サンプル作品" />
        </div>
        <p className="nd-exhibit-pending">コメント受付は準備中です。作品の公開までもうしばらくお待ちください。</p>
      </div>
    </div>
  );
}

export default async function RobotWorks2608Content() {
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
  const counts = new Map<string, number>();
  for (const item of items) {
    const key = item.work.course ?? "";
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  return (
    <main className="nd-page">
      <PageHeader live={live} counts={counts} />

      {live ? (
        <CourseSections items={items} />
      ) : (
        <section className="nd-section">
          <div className="container">
            <FallbackWorks />
          </div>
        </section>
      )}

      <section className="nd-section nd-section--last">
        <div className="container">
          <div className="nd-cta reveal">
            <Link href="/futurecraft/RobotPresentation" className="craft-sticker">
              ロボット発表会ページに戻る
              <ArrowRightDoodle width={24} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
