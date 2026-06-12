import type { CSSProperties } from 'react';
import { SectionTitle } from '@/components/craft/SectionTitle';

export type ActionCard = {
  title: string;
  description: string;
  emoji: string;
  tags?: string[];
};

type CurrentActionsProps = {
  actions: ActionCard[];
};

export function CurrentActions({ actions }: CurrentActionsProps) {
  return (
    <section className="py-8 px-4">
      {/* セクションタイトル */}
      <div className="hp-section-head" style={{ marginBottom: '24px' }}>
        <SectionTitle variant={2} lineColor="var(--brand)">
          今、挑戦していること
        </SectionTitle>
      </div>

      {/* アクションカード */}
      <div className="flex flex-col gap-5">
        {actions.map((action, index) => (
          <div
            key={index}
            className="craft-paper craft-tilt craft-lift reveal p-5"
            style={
              {
                '--rot': `${index % 2 === 0 ? -0.6 : 0.6}deg`,
                transitionDelay: `${index * 80}ms`,
              } as CSSProperties
            }
          >
            <span className={`craft-tape ${index % 2 === 0 ? 'craft-tape--cream' : ''}`} aria-hidden="true" />

            {/* カードヘッダー（絵文字は生徒データの内容なので維持） */}
            <div className="flex items-start gap-3 mb-3">
              <span className="ss-avatar" style={{ width: '44px', height: '44px', fontSize: '20px' }}>
                {action.emoji}
              </span>
              <h3 className="heading-sm m-0 flex-1" style={{ paddingTop: '8px' }}>
                {action.title}
              </h3>
            </div>

            {/* 説明文 */}
            <p className="body-base text-[var(--ink-700)] mb-3 m-0" style={{ lineHeight: 'var(--leading-loose)' }}>
              {action.description}
            </p>

            {/* タグ */}
            {action.tags && action.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {action.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="ss-tag">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
