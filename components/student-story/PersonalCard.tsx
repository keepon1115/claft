'use client';

export type StudentProfile = {
  name: string;
  grade: string;
  likes: string[];
  character: string;
  motivationEnv: string;
  avatarEmoji?: string;
};

type PersonalCardProps = {
  profile: StudentProfile;
};

export function PersonalCard({ profile }: PersonalCardProps) {
  return (
    <section className="py-10 px-4 reveal">
      <div 
        className="bg-white rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow)]"
        style={{ 
          boxShadow: '0 8px 24px rgba(31, 41, 55, 0.06)',
          border: '1px solid rgba(0, 0, 0, 0.04)'
        }}
      >
        {/* アバターと名前 */}
        <div className="flex items-center gap-4 mb-6">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
            style={{ 
              background: 'linear-gradient(135deg, var(--brand) 0%, #58c3a2 100%)',
              boxShadow: '0 4px 12px rgba(52, 198, 190, 0.3)'
            }}
          >
            {profile.avatarEmoji || '🌟'}
          </div>
          <div>
            <h2 className="heading-md mb-1">{profile.name}</h2>
            <p className="body-sm text-[var(--ink-500)]">{profile.grade}</p>
          </div>
        </div>
        
        {/* プロフィール項目 */}
        <div className="space-y-4">
          <ProfileItem 
            label="好きなこと" 
            value={profile.likes.join('、')}
            emoji="💖"
          />
          <ProfileItem 
            label="自分のキャラ" 
            value={profile.character}
            emoji="🎭"
          />
          <ProfileItem 
            label="やる気が出る環境" 
            value={profile.motivationEnv}
            emoji="🔥"
          />
        </div>
      </div>
    </section>
  );
}

function ProfileItem({ label, value, emoji }: { label: string; value: string; emoji: string }) {
  return (
    <div 
      className="p-4 rounded-[16px]"
      style={{ 
        background: 'linear-gradient(135deg, rgba(52, 198, 190, 0.06) 0%, rgba(255, 214, 107, 0.06) 100%)',
        lineHeight: 'var(--leading-loose)'
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{emoji}</span>
        <span className="text-[var(--text-sm)] font-bold text-[var(--ink-600)]">{label}</span>
      </div>
      <p className="body-base text-[var(--ink-800)] m-0">{value}</p>
    </div>
  );
}
