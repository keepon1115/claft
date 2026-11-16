import { StudentDetailContent } from '@/components/student-story';
import { getStudentBySlug, getAllStudentSlugs } from '@/lib/studentData';
import { notFound } from 'next/navigation';
import { defaultOpenGraph } from '@/lib/seo';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export const dynamicParams = false;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function StudentDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const student = getStudentBySlug(slug);

  // 該当する生徒が見つからない場合は404
  if (!student) {
    notFound();
  }

  return (
    <>
      <BreadcrumbJsonLd trail={[['メンバーのストーリー', '/student-story'], [`${student.name}のストーリー`, `/student-story/${slug}`]]} />
      <StudentDetailContent student={student} />
    </>
  );
}

// 静的生成のためのパスを生成
export async function generateStaticParams() {
  const slugs = getAllStudentSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// メタデータ生成（オプション）
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const student = getStudentBySlug(slug);

  if (!student) {
    return {
      title: 'スクール生が見つかりません',
    };
  }

  return {
    title: `${student.name}のストーリー`,
    description: student.shortIntro,
    openGraph: {
      ...defaultOpenGraph,
      title: `${student.name}のストーリー`,
      description: student.shortIntro,
    },
  };
}
