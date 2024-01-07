import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import logger from '@/lib/logger';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
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
import Typography from '@/components/typography/Typography';

type ModalReturnType = {
  openModal: () => void;
};

export function ExampleRadixModal({
  children,
}: {
  children: (props: ModalReturnType) => JSX.Element;
}) {
  const [open, setOpen] = React.useState(false);
  const modalReturn: ModalReturnType = {
    openModal: () => setOpen(true),
  };

  //#region  //*=========== Form ===========
  const methods = useForm({
    mode: 'onTouched',
    defaultValues: {
      name: 'Dumy',
      email: 'Dummy@gmail.com',
    },
  });
  const { handleSubmit, reset } = methods;
  //#endregion  //*======== Form ===========

  //#region  //*=========== Form Submit ===========
  const onSubmit = (data: unknown) => {
    logger({ data }, 'rhf.tsx line 26');
    reset();
    setOpen(false);
    return;
  };
  //#endregion  //*======== Form Submit ===========

  return (
    <>
      {children(modalReturn)}
      <Modal open={open} onOpenChange={setOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Modal Title Radix</ModalTitle>
            <ModalDescription>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Distinctio ex cumque assumenda! Nesciunt reiciendis dolores sit
              atque incidunt debitis repudiandae.
            </ModalDescription>
          </ModalHeader>

          <ModalSection>
            <Typography variant='b2'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates perferendis aliquam, temporibus itaque aspernatur
              eveniet perspiciatis voluptatibus reprehenderit doloribus et porro
              amet quo, voluptatum assumenda esse optio quidem quas voluptatem
              quia impedit, totam atque? Optio, cumque alias. Optio, eos ad.
              Sunt, reiciendis, laborum perferendis voluptatibus ullam optio,
              impedit quo quis itaque velit rerum. Similique asperiores, unde
              sit commodi beatae atque voluptatum eveniet, vel debitis quia
              error nisi id ipsum ut iste recusandae nam earum nemo minus
              aperiam deserunt assumenda optio esse omnis. Ad magni quidem
              repudiandae alias error. Eius ipsam labore aliquid cumque id.
              Eligendi unde fugit iure doloribus quas dolorum provident, quis
              recusandae repellat reiciendis! Possimus expedita veniam omnis
              consequuntur ducimus ad, hic reprehenderit illum voluptate nobis
              officia rerum cumque dolore, sed exercitationem. Quos rem totam
              pariatur vitae tempore sapiente molestiae fugit iste, eveniet fuga
              voluptatibus ratione laborum explicabo dicta beatae blanditiis
              sed? Cumque et maxime repudiandae necessitatibus incidunt esse
              fuga eligendi est numquam in obcaecati omnis reiciendis aperiam id
              cupiditate, eius quo unde ullam veritatis suscipit corrupti eos!
              Quasi, ex! Asperiores cupiditate saepe assumenda nisi itaque
              numquam quaerat officiis dolor explicabo omnis. Iusto adipisci
              porro illo, doloribus error nam! Eius autem nemo vero voluptates
              tenetur rem officiis quos?
            </Typography>
            <FormProvider {...methods}>
              <form
                id='form'
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col gap-4'
              >
                <div className='flex flex-col gap-2'>
                  <Input id='name' label='Name' />
                  <Input id='email' label='Email' type='email' />
                </div>
              </form>
            </FormProvider>
          </ModalSection>

          <ModalFooter>
            <ModalClose asChild>
              <Button variant='outline'>Cancel</Button>
            </ModalClose>
            <Button type='submit' form='form'>
              Label
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
