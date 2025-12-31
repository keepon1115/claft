import { StudentDetailContent } from '@/components/student-story';
import { getStudentBySlug, getAllStudentSlugs } from '@/lib/studentData';
import { notFound } from 'next/navigation';

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

  return <StudentDetailContent student={student} />;
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
      title: 'スクール生が見つかりません | CLAFT',
    };
  }

  return {
    title: `${student.name}のストーリー | CLAFT`,
    description: student.shortIntro,
  };
}
