import { redirect } from 'next/navigation';

export const metadata = { title: 'ロボットコース（外部サイトへ移動） | CLAFT' };

export default function RobotPage(){
  redirect('https://www.keeponlearning.fun/edison-academy');
}
