"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

export function FadeImage({ alt, className = "", fill, onLoad, src, ...props }: ImageProps) {
  const [loadedSrc, setLoadedSrc] = useState<ImageProps["src"] | null>(null);
  const loaded = loadedSrc === src;
  const markLoaded = () => setLoadedSrc(src);
  const image = (
    <Image
      {...props}
      src={src}
      alt={alt}
      fill={fill}
      className={`fade-image${loaded ? " is-loaded" : ""}${className ? ` ${className}` : ""}`}
      onLoad={event => {
        markLoaded();
        onLoad?.(event);
      }}
      ref={node => {
        if (node?.complete && node.naturalWidth > 0) markLoaded();
      }}
    />
  );
  const skeleton = <span className={`image-skeleton${loaded ? " is-hidden" : ""}`} aria-hidden="true" />;

  if (fill) {
    return (
      <>
        {skeleton}
        {image}
      </>
    );
  }

  return (
    <span className="fade-image-wrap">
      {skeleton}
      {image}
    </span>
  );
}
