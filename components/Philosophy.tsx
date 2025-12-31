export function Philosophy(){
  return (
    <section 
      className="section container py-10" 
      id="philosophy"
      style={{
        background: `
          radial-gradient(circle at 20% 30%, rgba(255, 214, 107, 0.06) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(52, 198, 190, 0.06) 0%, transparent 50%)
        `
      }}
    >
      {/* タイトル */}
      <div className="text-center mb-8">
        <h2 
          className="heading-xl mb-4"
          style={{
            position: 'relative',
            display: 'inline-block'
          }}
        >
          <span style={{ position: 'relative', zIndex: 1 }}>
            勉強から<span style={{ color: '#34c6be' }}>冒険</span>へ
          </span>
          {/* 手書き風アンダーライン */}
          <svg
            style={{
              position: 'absolute',
              bottom: '-8px',
              left: '-10px',
              width: 'calc(100% + 20px)',
              height: '20px',
              zIndex: 0
            }}
            viewBox="0 0 300 20"
            preserveAspectRatio="none"
          >
            <path
              d="M5,15 Q80,12 150,13 T295,15"
              stroke="#34c6be"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              style={{ opacity: 0.6 }}
            />
          </svg>
        </h2>
      </div>

      {/* テキストコンテンツ */}
      <div 
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 20px'
        }}
      >
        <p className="body-base mb-6" style={{ lineHeight: 'var(--leading-loose)' }}>
          CLAFTは、教科書を暗記し、テストで高得点を取るための「勉強」をする場ではありません。<br />
          「探究・対話・実践」を通して、 自分だけの正解をカタチにする場所です。
        </p>

        <p className="body-base mb-6" style={{ lineHeight: 'var(--leading-loose)' }}>
          自分の心が動く"興味や疑問"をきっかけに、<br />
          未知の世界へ飛びこみ、おもしろい仲間と出会い、 この世にまだないモノを創り出す。<br />
          それは、決められたレールを歩くことではなく、 自ら道を切り拓いていく「冒険」そのものです。
        </p>

        <p className="body-lg text-center mt-8">
          <strong className="emphasis">
            あなたはCLAFTでどんな冒険をしますか？
          </strong>
        </p>
      </div>
    </section>
  );
}
