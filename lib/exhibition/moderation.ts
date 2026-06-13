import Anthropic from '@anthropic-ai/sdk';
import type { CommentType } from './types';
import { COMMENT_TYPE_META } from './types';

export interface ModerationResult {
  decision: 'pass' | 'flag';
  reasons: string[];
  model: string;
  at: string;
}

/** 速くて安い Haiku 系を既定とする（ブリーフ指定） */
const MODERATION_MODEL = 'claude-haiku-4-5';

const SYSTEM_PROMPT = `あなたは子ども向けオンライン展示会のコメントモデレーターです。
このコメントは、子どもが出した作品に対して不特定多数の閲覧者から送られ、承認されると子ども本人に直接届きます。

次のいずれかに少しでも該当する場合は、必ず "flag"（自動公開しない）と判定してください。
1. 暴言・侮辱・からかい・人格攻撃（軽い茶化しや皮肉も含む）
2. 個人情報の記載や要求（本名・住所・学校名・電話番号・SNSアカウント・会う約束 など）
3. 性的・暴力的・差別的な内容、その他子どもに不適切な内容
4. 外部リンク・宣伝・勧誘・スパム

判断に少しでも迷う場合は必ず "flag" にしてください。
完全に安全だと確信できる場合のみ "pass" です。

出力は次のJSONのみ。前後に説明文を付けないこと。
{"decision":"pass"|"flag","reasons":["flagの場合の理由（日本語、簡潔に）"]}`;

function flagged(reasons: string[]): ModerationResult {
  return {
    decision: 'flag',
    reasons,
    model: MODERATION_MODEL,
    at: new Date().toISOString(),
  };
}

/**
 * コメントをAIモデレーションする。
 * 保守的な設計: APIキー未設定・通信エラー・パース失敗など、
 * 何か1つでも想定外があれば必ず flag（= pending のまま運営の承認待ち）に倒す。
 */
export async function moderateComment(input: {
  commentType: CommentType;
  body: string;
  displayName: string | null;
}): Promise<ModerationResult> {
  if (!process.env.ANTHROPIC_API_KEY) {
    return flagged(['ANTHROPIC_API_KEY 未設定のため自動承認をスキップ']);
  }

  try {
    const client = new Anthropic();
    const response = await client.messages.create({
      model: MODERATION_MODEL,
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: [
            `コメント種別: ${COMMENT_TYPE_META[input.commentType].label} (${input.commentType})`,
            `ニックネーム: ${input.displayName ?? '（なし）'}`,
            '本文:',
            input.body,
          ].join('\n'),
        },
      ],
    });

    const text = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === 'text')
      .map((b) => b.text)
      .join('');
    // コードフェンスで囲まれた場合に備えてJSON部分だけを取り出す
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return flagged(['AI応答をJSONとして解釈できず']);

    const parsed = JSON.parse(match[0]) as { decision?: string; reasons?: unknown };
    if (parsed.decision !== 'pass' && parsed.decision !== 'flag') {
      return flagged(['AI応答のdecisionが不正']);
    }
    const reasons = Array.isArray(parsed.reasons)
      ? parsed.reasons.filter((r): r is string => typeof r === 'string')
      : [];
    return {
      decision: parsed.decision,
      reasons,
      model: MODERATION_MODEL,
      at: new Date().toISOString(),
    };
  } catch (e) {
    const message = e instanceof Anthropic.APIError ? `API error ${e.status}` : 'モデレーション実行エラー';
    return flagged([message]);
  }
}
