'use client';
import Link from 'next/link';
import { navItems } from '@/lib/nav';
import { usePathname } from 'next/navigation';

interface NavProps {
  onLinkClick?: () => void;
}

export function Nav({ onLinkClick }: NavProps){
  const pathname = usePathname();

  const handleClick = () => {
    if (onLinkClick) {
      onLinkClick();
    }
  };
  
  return (
    <nav className="l-nav">
      <ul>
        <li>
          <Link 
            href="/" 
            aria-current={pathname === '/' ? 'page' : undefined}
            onClick={handleClick}
          >
            トップ
          </Link>
        </li>
        {navItems.map((item) => {
          const isCurrent = pathname === item.href || 
                           (item.href.includes('#') && pathname === item.href.split('#')[0]);
          return (
            <li 
              key={item.href}
              className={`${item.children ? 'has-sub' : ''} ${item.alwaysOpen ? 'open' : ''}`}
            >
              {item.external ? (
                <a 
                  href={item.href} 
                  target="_blank" 
                  rel="noopener"
                  // data-variant を削除しました
                  onClick={handleClick}
                >
                  {item.label}
                </a>
              ) : (
                <Link 
                  href={item.href}
                  aria-current={isCurrent ? 'page' : undefined}
                  // data-variant を削除しました
                  onClick={handleClick}
                >
                  {item.label}
                </Link>
              )}
              {item.children && (
                <ul className="sub">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      {child.external ? (
                        <a 
                          href={child.href}
                          target="_blank"
                          rel="noopener"
                          onClick={handleClick}
                        >
                          {child.label}
                        </a>
                      ) : (
                        <Link 
                          href={child.href}
                          aria-current={pathname === child.href ? 'page' : undefined}
                          onClick={handleClick}
                        >
                          {child.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}