import * as React from 'react';
import { IconType } from 'react-icons';
import { tv, VariantProps } from 'tailwind-variants';

import clsxm from '@/lib/clsxm';

import UnstyledLink, {
  UnstyledLinkProps,
} from '@/components/links/UnstyledLink';

type ButtonLinkProps = {
  leftIcon?: IconType;
  rightIcon?: IconType;
  leftIconClassName?: string;
  rightIconClassName?: string;
} & VariantProps<typeof style> &
  UnstyledLinkProps;

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'base',
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      leftIconClassName,
      rightIconClassName,
      ...rest
    },
    ref
  ) => {
    return (
      <UnstyledLink
        ref={ref}
        className={style({ variant, size, className })}
        {...rest}
      >
        {LeftIcon && (
          <div
            className={clsxm([
              size === 'lg' && 'mr-3',
              size === 'base' && 'mr-2',
              size === 'sm' && 'mr-1',
            ])}
          >
            <LeftIcon
              size='1em'
              className={clsxm('text-base', leftIconClassName)}
            />
          </div>
        )}
        {children}
        {RightIcon && (
          <div
            className={clsxm([
              size === 'lg' && 'ml-3',
              size === 'base' && 'ml-2',
              size === 'sm' && 'ml-1',
            ])}
          >
            <RightIcon
              size='1em'
              className={clsxm('text-base', rightIconClassName)}
            />
          </div>
        )}
      </UnstyledLink>
    );
  }
);

export default ButtonLink;

const style = tv({
  base: [
    'inline-flex items-center justify-center rounded-lg font-medium',
    'focus:outline-none focus-visible:ring',
    'shadow-sm',
    'transition-colors duration-75',
  ],
  variants: {
    variant: {
      primary: [
        'bg-primary-500 text-white',
        'border border-primary-600',
        'hover:bg-primary-600 hover:text-white',
        'active:bg-primary-700',
        'disabled:bg-primary-700',
        'focus-visible:ring-primary-400',
      ],
      secondary: [
        'bg-secondary-500 text-white',
        'border border-secondary-600',
        'hover:bg-secondary-600 hover:text-white',
        'active:bg-secondary-700',
        'disabled:bg-secondary-700',
        'focus-visible:ring-secondary-400',
      ],
      danger: [
        'bg-red-500 text-white',
        'border border-red-600',
        'hover:bg-red-600 hover:text-white',
        'active:bg-red-700',
        'disabled:bg-red-700',
        'focus-visible:ring-red-400',
      ],
      warning: [
        'bg-amber-500 text-white',
        'border border-amber-500',
        'hover:bg-amber-600 hover:text-white',
        'active:bg-amber-700',
        'disabled:bg-amber-700',
        'focus-visible:ring-amber-400',
      ],
      outline: [
        'text-typo',
        'border border-gray-300',
        'hover:bg-light focus-visible:ring-primary-400 active:bg-typo-divider disabled:bg-typo-divider',
      ],
      ghost: [
        'text-primary-500',
        'shadow-none',
        'hover:bg-primary-50 focus-visible:ring-primary-400 active:bg-primary-100 disabled:bg-primary-100',
      ],
    },
    size: {
      sm: ['min-h-[1.75rem] px-2 md:min-h-[2rem]', 'text-xs md:text-sm'],
      base: ['min-h-[2.25rem] px-3 md:min-h-[2.5rem]', 'text-sm md:text-base'],
      lg: ['min-h-[2.75rem] px-3.5 md:min-h-[3rem]', 'text-base'],
    },
  },
});
