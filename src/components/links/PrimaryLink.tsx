import * as React from 'react';
import { tv, VariantProps } from 'tailwind-variants';

import UnstyledLink, {
  UnstyledLinkProps,
} from '@/components/links/UnstyledLink';

type PrimaryLinkProps = VariantProps<typeof style> & UnstyledLinkProps;

const PrimaryLink = React.forwardRef<HTMLAnchorElement, PrimaryLinkProps>(
  (
    { className, children, size = 'base', variant = 'primary', ...rest },
    ref
  ) => {
    return (
      <UnstyledLink
        ref={ref}
        className={style({ size, variant, className })}
        {...rest}
      >
        {children}
      </UnstyledLink>
    );
  }
);

export default PrimaryLink;

const style = tv({
  base: [
    'button inline-flex items-center justify-center font-semibold',
    'focus:outline-none focus-visible:ring',
    'transition duration-100',
    'underline decoration-current hover:decoration-white/0 active:decoration-current disabled:hover:decoration-current',
  ],
  variants: {
    variant: {
      primary: [
        'text-primary-500 hover:text-primary-600 active:text-primary-700',
        'focus-visible:ring-primary-400',
      ],
      secondary: [
        'text-secondary-500 hover:text-secondary-600 active:text-secondary-700',
        'focus-visible:ring-secondary-400',
      ],
      basic: ['focus-visible:ring-gray-400'],
      white: ['text-white', 'focus-visible:ring-white'],
      danger: [
        'text-red-500 hover:text-red-600 active:text-red-600',
        'focus-visible:ring-red-300',
      ],
    },
    size: {
      sm: ['text-xs md:text-sm'],
      base: ['text-sm  md:text-base'],
    },
  },
});
