import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import * as React from 'react';

import clsxm from '@/lib/clsxm';

import Button from '@/components/buttons/Button';
import Typography from '@/components/typography/Typography';

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={clsxm(
      'bg-gray-500/80 backdrop-blur-sm',
      'fixed inset-0 z-40 overflow-y-auto flex items-end justify-center px-4 pt-4 pb-20 sm:p-0',
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
    ref={ref}
  />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay>
      <AlertDialogPrimitive.Content
        ref={ref}
        onOpenAutoFocus={(e) => e.preventDefault()}
        className={clsxm([
          'relative self-end sm:self-center',
          'duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'bg-white w-full sm:max-w-lg border shadow-xl rounded-2xl',
          'flex flex-col gap-5 sm:gap-10 p-4 sm:p-6',
          className,
        ])}
        {...props}
      />
    </AlertDialogOverlay>
  </AlertDialogPortal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={className} {...props}>
    {props.children}
  </div>
);
AlertDialogHeader.displayName = 'AlertDialogHeader';

const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={clsxm(
      'border-t border-typo-divider rounded-b-2xl',
      '-mb-4 sm:-mb-6 -mx-4 sm:-mx-6',
      'p-4 sm:p-6',
      'flex flex-col-reverse sm:flex-row sm:justify-end',
      'gap-y-2 sm:gap-x-2 ',
      className,
    )}
    {...props}
  />
);
AlertDialogFooter.displayName = 'AlertDialogFooter';

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>((props, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    asChild
    className='text-center sm:text-left text-balance'
    {...props}
  >
    <Typography as={AlertDialogPrimitive.Title} variant='h2'>
      {props.children}
    </Typography>
  </AlertDialogPrimitive.Title>
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>((props, ref) => (
  <AlertDialogPrimitive.Description asChild ref={ref} {...props}>
    <Typography
      variant='b3'
      color='tertiary'
      className='text-center sm:text-left text-pretty'
      as='span'
    >
      {props.children}
    </Typography>
  </AlertDialogPrimitive.Description>
));
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action> & {
    isLoading?: boolean;
  }
>(({ isLoading, ...props }, ref) => (
  <AlertDialogPrimitive.Action asChild ref={ref} {...props}>
    <Button isLoading={isLoading}>{props.children}</Button>
  </AlertDialogPrimitive.Action>
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel> & {
    isLoading?: boolean;
  }
>(({ isLoading, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel asChild ref={ref} {...props}>
    <Button isLoading={isLoading} variant='outline'>
      {props.children}
    </Button>
  </AlertDialogPrimitive.Cancel>
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
};
