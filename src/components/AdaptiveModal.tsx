import * as React from 'react';

import useMediaQuery from '@/hooks/useMediaQuery';

import Button from '@/components/buttons/Button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerSection,
  DrawerTitle,
} from '@/components/Drawer';
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalSection,
  ModalTitle,
} from '@/components/modal/RadixModal';

import { ExtractProps } from '@/types/helper';

type AdaptiveModalProps = {
  title: string;
  description?: string;
  /** @default 'Close' */
  closeText?: string;
  /** @default false */
  isOpen: boolean;
  /** Set State Action to control modal isOpen state */
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  actionButtonProps?: ExtractProps<typeof Button>;
  children?: React.ReactNode;
};

export default function AdaptiveModal({
  title,
  description,
  closeText = 'Close',
  isOpen = false,
  setIsOpen,
  children,
  actionButtonProps,
}: AdaptiveModalProps) {
  /**
   * To avoid hydration failure, set the open state to the value of isOpen prop when the component is mounted.
   * @see https://github.com/radix-ui/primitives/issues/1386#issuecomment-1171798282
   * @see https://github.com/radix-ui/primitives/issues/1386#issuecomment-1573074278
   */
  React.useEffect(() => {
    setIsOpen(isOpen);
  }, [isOpen, setIsOpen]);

  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop)
    return (
      <Modal open={isOpen} onOpenChange={setIsOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
            {description && <ModalDescription>{description}</ModalDescription>}
          </ModalHeader>

          {children && <ModalSection>{children}</ModalSection>}

          <ModalFooter>
            <ModalClose asChild>
              <Button variant='outline'>{closeText}</Button>
            </ModalClose>
            {actionButtonProps && (
              <Button variant='primary' {...actionButtonProps} />
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    );

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>

        {children && <DrawerSection>{children}</DrawerSection>}

        <DrawerFooter>
          {actionButtonProps && (
            <Button variant='primary' {...actionButtonProps} />
          )}
          <DrawerClose asChild>
            <Button variant='outline'>{closeText}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
