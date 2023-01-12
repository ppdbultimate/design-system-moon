import * as React from 'react';

import clsxm from '@/lib/clsxm';

const TextButtonSize = ['sm', 'base'] as const;
const TextButtonVariant = ['primary', 'secondary', 'basic', 'danger'] as const;

type TextButtonProps = {
  size?: typeof TextButtonSize[number];
  variant?: typeof TextButtonVariant[number];
} & React.ComponentPropsWithRef<'button'>;

const TextButton = React.forwardRef<HTMLButtonElement, TextButtonProps>(
  (
    { children, className, size = 'base', variant = 'primary', ...rest },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type='button'
        className={clsxm(
          'button inline-flex items-center justify-center font-semibold',
          'focus:outline-none focus-visible:ring',
          'transition duration-100 after:transition after:duration-100',
          "relative after:absolute after:inset-x-0 after:h-[2px] after:bg-current after:content-['']",
          'hover:after:opacity-0 active:after:opacity-100 disabled:hover:after:opacity-100',
          //#region  //*=========== Size ===========
          size === 'sm' &&
            'text-xs after:bottom-[1px] md:text-sm md:after:bottom-[3px]',
          size === 'base' && 'text-sm after:bottom-0 md:text-base',
          //#endregion  //*======== Size ===========
          //#region  //*=========== Variant ===========
          variant === 'primary' && [
            'text-primary-500 hover:text-primary-600 active:text-primary-700',
            'focus-visible:ring-primary-400',
            'disabled:text-primary-400',
          ],
          variant === 'secondary' && [
            'text-secondary-500 hover:text-secondary-600 active:text-secondary-700',
            'focus-visible:ring-secondary-400',
            'disabled:text-secondary-400',
          ],
          variant === 'basic' && [
            'focus-visible:ring-gray-400',
            'disabled:text-gray-300',
          ],
          variant === 'danger' && [
            'text-red-500 hover:text-red-600 active:text-red-600',
            'focus-visible:ring-red-300',
            'disabled:text-red-300',
          ],
          'disabled:cursor-not-allowed disabled:brightness-105',
          //#endregion  //*======== Variant ===========
          className
        )}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

export default TextButton;
