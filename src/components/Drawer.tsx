import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

import clsxm from '@/lib/clsxm';

import Typography from '@/components/typography/Typography';

const Drawer = ({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root {...props} />
);
Drawer.displayName = 'Drawer';

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={clsxm([
      'fixed inset-0 z-30 bg-gray-500/80 backdrop-blur-sm',
      className,
    ])}
    {...props}
  />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> & {
    disableClickOutside?: boolean;
  }
>(({ className, children, disableClickOutside, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      onPointerDownOutside={(e) => disableClickOutside && e.preventDefault()}
      className={clsxm(
        'fixed inset-x-0 z-30 bottom-0 flex h-auto flex-col rounded-t-xl bg-white',
        className,
      )}
      {...props}
    >
      <div className='mx-auto mt-4 h-2 w-[100px] rounded-full bg-neutral-200' />
      <div className='w-full max-w-md p-4 mx-auto space-y-4 '>{children}</div>
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = 'DrawerContent';

const DrawerHeader = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props} />
);
DrawerHeader.displayName = 'DrawerHeader';

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={clsxm('flex flex-col gap-2', className)} {...props} />
);
DrawerFooter.displayName = 'DrawerFooter';

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    asChild
    className={clsxm('text-center text-balance', className)}
    {...props}
  >
    <Typography as={DrawerPrimitive.Title} variant='h2'>
      {props.children}
    </Typography>
  </DrawerPrimitive.Title>
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    asChild
    className={clsxm('flex text-center w-full flex-col text-pretty', className)}
    {...props}
  >
    <Typography variant='b3' color='secondary' as={DrawerPrimitive.Description}>
      {props.children}
    </Typography>
  </DrawerPrimitive.Description>
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

const DrawerSection = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={clsxm(
      'flex flex-col overflow-y-auto px-4 -mx-4 max-h-[50svh]',
      className,
    )}
    {...props}
  />
);
DrawerSection.displayName = 'DrawerSection';

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerSection,
  DrawerTitle,
  DrawerTrigger,
};
