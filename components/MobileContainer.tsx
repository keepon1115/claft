'use client';

import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

export const MobileContainer = ({ children, className = '' }: Props) => {
  return (
    <div className={`w-full max-w-[480px] mx-auto min-h-screen pb-20 pt-6 px-4 ${className}`}>
      {children}
    </div>
  );
};

export const Section = ({ children, id, className = '' }: { children: ReactNode; id?: string; className?: string }) => (
  <section id={id} className={`py-8 ${className}`}>
    {children}
  </section>
);

