import type { Metadata } from 'next';
import { MobileContainer, Section } from '@/components/MobileContainer';
import { getPublishedPosts } from '@/lib/notion';
import { BlogIndexClient } from '@/components/blog/BlogIndexClient';

export const revalidate = 60; // ISR: 60秒ごとに再生成

export const metadata: Metadata = {
  title: 'ブログ｜探究・キャリア教育・オンライン学習',
  description:
    '子育ての悩み・AI時代の学び・探究と対話の実践・習い事選びまで、小中学生の保護者向けブログ。探究スクールCLAFT（大阪・八尾／オンライン）が「自分で考え、選ぶ力」の育て方を現場から発信します。',
  alternates: { canonical: '/blog' },
};

export default async function BlogIndex() {
  const posts = await getPublishedPosts();

  return (
    <MobileContainer>
      <Section>
        <header className="blog-index-head">
          <p className="craft-label">CLAFT BLOG</p>
          <h1 className="blog-index-title">子どもの「どうしたらいい？」に、問いから答える。</h1>
          <p className="blog-index-lead">
            勉強のこと、AIのこと、やる気や自信のこと。正解をひとつに決めず、お子さまと一緒に考えるためのヒントを、探究スクールCLAFTの現場からお届けします。
          </p>
        </header>

        <BlogIndexClient posts={posts} />
      </Section>
    </MobileContainer>
  );
}
