import Image from 'next/image'
import React, { FC, memo, MouseEventHandler, RefObject } from 'react'

interface PitureProps {
  src: string
  alt?: string
  className: string
  priority: boolean
  imgRef?: RefObject<HTMLImageElement>
  onClick?: MouseEventHandler<HTMLImageElement>
  width?: number
  height?: number
  style?: any
}

const Picture: FC<PitureProps> = ({ src, alt, className, priority = false, imgRef, onClick, width, height, style }) => {
  return (
    <Image
      onClick={onClick}
      ref={imgRef}
      src={src}
      alt={alt || 'Thoroughly Cleaned, LLC'}
      width={width || '0'}
      height={height || '0'}
      className={className}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      sizes="100vw"
      unoptimized
      style={style}
    />
  )
}

export default memo(Picture)
