import * as React from 'react';
import { tv, VariantProps } from 'tailwind-variants';

type TextButtonProps = VariantProps<typeof style> &
  React.ComponentPropsWithRef<'button'>;

const TextButton = React.forwardRef<HTMLButtonElement, TextButtonProps>(
  (
    { children, className, size = 'base', variant = 'primary', ...rest },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type='button'
        className={style({ size, variant, className })}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

export default TextButton;

const style = tv({
  base: [
    'button inline-flex items-center justify-center font-semibold',
    'focus:outline-none focus-visible:ring',
    'transition duration-100',
    'underline decoration-current hover:decoration-white/0 active:decoration-current disabled:hover:decoration-current',
    'disabled:cursor-not-allowed disabled:brightness-105',
  ],
  variants: {
    variant: {
      primary: [
        'text-primary-500 hover:text-primary-600 active:text-primary-700',
        'focus-visible:ring-primary-400',
        'disabled:text-primary-400',
      ],
      secondary: [
        'text-secondary-500 hover:text-secondary-600 active:text-secondary-700',
        'focus-visible:ring-secondary-400',
        'disabled:text-secondary-400',
      ],
      basic: ['focus-visible:ring-gray-400', 'disabled:text-gray-300'],
      white: [
        'text-white',
        'focus-visible:ring-white',
        'disabled:text-gray-300',
      ],
      danger: [
        'text-red-500 hover:text-red-600 active:text-red-600',
        'focus-visible:ring-red-300',
        'disabled:text-red-300',
      ],
    },
    size: {
      sm: ['text-xs md:text-sm'],
      base: ['text-sm  md:text-base'],
    },
  },
});
