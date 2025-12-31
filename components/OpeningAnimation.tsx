'use client';

import { useEffect, useState } from 'react';

export const OpeningAnimation = () => {
  // 初期値は false にしておき、確認が終わってから表示するか決める
  const [show, setShow] = useState(false);

  useEffect(() => {
    // 1. セッションストレージを確認
    const key = 'claft-visited'; // 記憶させておく合言葉
    const hasVisited = sessionStorage.getItem(key);

    if (hasVisited) {
      // すでに訪問済みなら何もしない（showはfalseのまま＝表示されない）
      return;
    }

    // 2. まだ訪問していない場合
    setShow(true); // アニメーションを表示
    sessionStorage.setItem(key, 'true'); // 「訪問しました」と記録

    // --- 以下、前回と同じアニメーション終了処理 ---
    
    // スクロール禁止
    document.body.style.overflow = 'hidden';

    // 4.5秒後に消す
    const timer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = ''; // スクロール解除
    }, 4500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  // show が false なら何も描画しない
  if (!show) return null;

  return (
    <div className="opening-overlay">
      <div className="opening-text text-part-1">
        君の人生の主人公は・・・
      </div>
      <div className="opening-text text-part-2">
        君だ！！
      </div>
    </div>
  );
};