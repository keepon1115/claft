"use client";
import Link from 'next/link';
import { useState } from 'react';
import { navItems } from '@/lib/nav';

export function Header(){
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="lg:hidden sticky top-0 z-50 border-b border-[rgba(0,0,0,.06)] bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex w-[min(1120px,92%)] items-center gap-3 py-3">
          <button aria-label="メニュー" onClick={()=>setOpen(v=>!v)} className="grid place-items-center rounded-md p-2 border">
            <span className="i">≡</span>
          </button>
          <Link href="/" className="font-bold">CLAFT</Link>
          <div className="ml-auto" />
        </div>
      </header>
      {open && <div onClick={()=>setOpen(false)} className="fixed inset-0 z-[60] bg-black/50" />}
      <aside className={`lg:hidden fixed top-0 left-0 z-[70] h-dvh w-[78%] max-w-[300px] bg-white shadow-soft transition-transform ${open? 'translate-x-0':'-translate-x-full'}`}>
        <div className="p-4 border-b flex items-center gap-3">
          <Link href="/" className="font-bold">CLAFT</Link>
          <button aria-label="閉じる" onClick={()=>setOpen(false)} className="ml-auto rounded-md border px-2 py-1">×</button>
        </div>
        <nav className="p-2">
          <ul className="flex flex-col">
            {navItems.map(i=> (
              <li key={i.href}>
                <Link onClick={()=>setOpen(false)} className="block px-4 py-3 border-b hover:bg-[rgba(52,198,190,.08)]" href={i.href}>{i.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-3">
          <a href="https://lin.ee/wcsFK9A" className="inline-flex items-center gap-2 rounded-full bg-[#06c755] px-4 py-3 font-bold text-white">LINE で相談</a>
        </div>
      </aside>
    </>
  );
}
