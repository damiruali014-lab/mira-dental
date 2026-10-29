import sizes from '../data/image-sizes.json'

export type ImageName = keyof typeof sizes

type Props = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'width' | 'height'> & {
  name: ImageName
  alt: string
  sizes: string
  priority?: boolean
}

export function srcSetFor(name: ImageName) {
  const meta = sizes[name]
  return [...meta.sizes.map((w) => `/images/r/${name}-${w}.webp ${w}w`), `/images/${name}.webp ${meta.w}w`].join(', ')
}

/** Responsive photo from public/images, with intrinsic size to prevent layout shift. */
export function Img({ name, priority, ...rest }: Props) {
  const meta = sizes[name]
  return (
    <img
      src={`/images/${name}.webp`}
      srcSet={srcSetFor(name)}
      width={meta.w}
      height={meta.h}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
      {...rest}
    />
  )
}
