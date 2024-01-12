import { useMutation } from '@tanstack/react-query';
import * as React from 'react';
import { toast } from 'sonner';

import apiMock from '@/lib/axios-mock';
import useMutationToastSonner from '@/hooks/toast/useMutationToastSonner';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import SonnerToaster from '@/components/SonnerToast';
import Typography from '@/components/typography/Typography';

import { ApiResponse } from '@/types/api';

type LoginData = {
  email: string;
  password: string;
};

export default function SonnerToastPage() {
  const {
    data: mutationData,
    isLoading,
    mutate,
  } = useMutationToastSonner<ApiResponse<undefined>, LoginData>(
    useMutation((data) => apiMock.post('/login', data).then((res) => res.data)),
  );

  return (
    <Layout>
      <Seo templateTitle='Toast-rq.page' />
      <SonnerToaster />

      <main>
        <section>
          <div className='layout min-h-screen py-20'>
            <Typography variant='h1' as='h1'>
              Toast
            </Typography>
            <div className='mt-4 flex flex-wrap gap-3'>
              <Button
                onClick={() =>
                  toast.success('success', {
                    description: 'this is description',
                  })
                }
              >
                Success
              </Button>
              <Button onClick={() => toast.error('Oops! Something went wrong')}>
                Error
              </Button>
              <Button onClick={() => toast.loading('Loading...')}>
                Loading
              </Button>
              <Button onClick={() => toast.info('For your information')}>
                Info
              </Button>
              <Button
                onClick={() =>
                  toast('Click here', {
                    action: {
                      label: 'Action',
                      onClick: () => toast.success('Action clicked'),
                    },
                    cancel: {
                      label: 'Cancel',
                      onClick: () => toast.error('Cancel clicked'),
                    },
                  })
                }
              >
                Action
              </Button>
            </div>
            <div className='mt-8 space-y-3 space-x-3 '>
              <Button
                isLoading={isLoading}
                onClick={() =>
                  mutate({ email: 'admin@mail.com', password: 'admin' })
                }
              >
                Promise
              </Button>
              <Typography variant='h2' as='h2'>
                Mutation:
              </Typography>
              {mutationData && (
                <pre>{JSON.stringify(mutationData, null, 2)}</pre>
              )}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
