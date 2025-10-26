import Link from 'next/link';
import { navItems } from '../lib/nav';

export function Nav(){
  return (
    <nav className="hidden lg:block sticky top-4 h-[calc(100dvh-32px)] p-2 bg-white rounded-xl shadow-soft">
      <ul className="flex flex-col gap-2">
        {navItems.map((i)=> (
          <li key={i.href}><Link className="block rounded-lg px-4 py-2 font-bold text-brand hover:bg-[rgba(0,0,0,.03)]" href={i.href}>{i.label}</Link></li>
        ))}
      </ul>
    </nav>
  );
}
