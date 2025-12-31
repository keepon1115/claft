'use client';

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
    <section className="py-10 px-4 reveal">
      {/* セクションタイトル */}
      <h2 className="heading-lg mb-6 flex items-center gap-2">
        <span className="text-2xl">🚀</span>
        今、挑戦していること
      </h2>
      
      {/* アクションカード */}
      <div className="flex flex-col gap-4">
        {actions.map((action, index) => (
          <div 
            key={index}
            className="bg-white rounded-[var(--radius-lg)] p-5"
            style={{ 
              boxShadow: '0 6px 20px rgba(31, 41, 55, 0.06)',
              border: '1px solid rgba(0, 0, 0, 0.04)',
              lineHeight: 'var(--leading-loose)'
            }}
          >
            {/* カードヘッダー */}
            <div className="flex items-start gap-3 mb-3">
              <span 
                className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                style={{ 
                  background: 'linear-gradient(135deg, var(--cream) 0%, rgba(255, 214, 107, 0.5) 100%)',
                  boxShadow: '0 2px 8px rgba(255, 214, 107, 0.3)'
                }}
              >
                {action.emoji}
              </span>
              <h3 className="heading-sm m-0 flex-1">{action.title}</h3>
            </div>
            
            {/* 説明文 */}
            <p className="body-base text-[var(--ink-700)] mb-3 m-0">{action.description}</p>
            
            {/* タグ */}
            {action.tags && action.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {action.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex}
                    className="text-[var(--text-xs)] py-1 px-3 rounded-full font-medium"
                    style={{ 
                      background: 'rgba(52, 198, 190, 0.12)',
                      color: 'var(--brand)'
                    }}
                  >
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
