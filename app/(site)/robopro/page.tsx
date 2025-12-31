import { redirect } from 'next/navigation';

export const metadata = { title: 'ロボプロコース（外部サイトへ移動） | CLAFT' };

export default function RoboProPage(){
  redirect('https://www.keeponlearning.fun/online');
}
