import ImagePlaceholder from '@/components/monthly/ImagePlaceholder';

type Props = {
  /** 未入稿なら省略 → プレースホルダ表示 */
  src?: string;
  /** 必須。プレースホルダのときも書かせる（装飾画像は alt="" を明示） */
  alt: string;
  /** 必要な画像の説明。プレースホルダに【要画像】として表示される */
  need: string;
  caption?: string;
  width: number;
  height: number;
};

/**
 * ImagePlaceholder の薄いラッパ。画像待ちで実装を止めないための仕組み（§3-3）。
 * src未指定時は need を【要画像】プレフィックス付きで caption に流し込む。
 */
export function MjFigure({ src, alt, need, caption, width, height }: Props) {
  return (
    <ImagePlaceholder
      src={src}
      alt={alt}
      width={width}
      height={height}
      caption={src ? caption : `【要画像】${need}`}
    />
  );
}
