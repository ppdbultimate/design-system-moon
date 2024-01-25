import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import logger from '@/lib/logger';
import useDialog from '@/hooks/useDialog';

import AdaptiveModal from '@/components/AdaptiveModal';
import Input from '@/components/forms/Input';
import Typography from '@/components/typography/Typography';

type ModalReturnType = {
  openModal: () => void;
};

export default function ExampleAdaptiveModal({
  children,
}: {
  children: (props: ModalReturnType) => JSX.Element;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const modalReturn: ModalReturnType = {
    openModal: () => setIsOpen(true),
  };

  //#region  //*=========== Form ===========
  const methods = useForm({
    mode: 'onTouched',
    defaultValues: {
      name: 'Dumy',
      email: 'Dummy@gmail.com',
    },
  });
  const { handleSubmit } = methods;
  //#endregion  //*======== Form ===========

  const dialog = useDialog();
  //#region  //*=========== Form Submit ===========
  const onSubmit = (data: unknown) => {
    logger({ data }, 'rhf.tsx line 26');

    dialog({
      title: 'Submit Form',
      description: 'Are you sure you want to submit this form?',
      submitText: 'Hurray',
      variant: 'warning',
      catchOnCancel: true,
    })
      .then(() => {
        setIsOpen(false);
        logger('Accepted');
      })
      .catch(() => logger('Canceled'));

    return;
  };
  //#endregion  //*======== Form Submit ===========

  return (
    <>
      {children(modalReturn)}
      <AdaptiveModal
        title='Adaptive Modal'
        actionButtonProps={{
          children: 'Save change',
          type: 'submit',
          form: 'form',
        }}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        description='Put your description here, lorem ipsum logs ignar dian'
      >
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

            <Typography variant='b3'>
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
          </form>
        </FormProvider>
      </AdaptiveModal>
    </>
  );
}
