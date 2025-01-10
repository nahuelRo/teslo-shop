import Image from "next/image";

interface Props {
  alt: string;
  className?: React.StyleHTMLAttributes<HTMLImageElement>["className"];
  width: number;
  height: number;
  src?: string;
  style?: React.StyleHTMLAttributes<HTMLImageElement>["style"];
}

export const ProductImage = ({
  src,
  alt,
  height,
  width,
  className,
  style,
}: Props) => {
  const localSrc = src
    ? src.startsWith("http")
      ? src
      : `/products/${src}`
    : "/imgs/placeholder.jpg";

  return (
    <Image
      src={localSrc}
      width={width}
      height={height}
      alt={alt}
      className={className}
      style={style}
    />
  );
};
