import { Metadata } from 'next';
import { ClaftHopeClient } from '@/components/claft-hope/ClaftHopeClient';

export const metadata: Metadata = {
  title: '「CLAFT」という希望 | CLAFT',
  description:
    '正解のない時代を、希望を持って歩んでいくために。CLAFTは、学校と社会のあいだにある"分断"をつなぎ、未来を自ら創り出す力を育む場所です。探究・対話・実践で、お子さまの「好き」や「得意」を未来を切り拓く武器に。',
  openGraph: {
    title: '「CLAFT」という希望 | CLAFT',
    description:
      '正解のない時代を、希望を持って歩んでいくために。CLAFTは、学校と社会の分断をつなぎ、未来を自ら創り出す力を育む場所です。',
    type: 'website',
  },
};

export default function ClaftHopePage() {
  return <ClaftHopeClient />;
}
