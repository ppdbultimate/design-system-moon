import * as React from 'react';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import ExampleModal from '@/pages/sandbox/components/ExampleModal';
import { ExampleRadixModal } from '@/pages/sandbox/components/ExampleRadixModal';

export default function ModalPage() {
  return (
    <Layout>
      <Seo templateTitle='Modal' />

      <main>
        <section className=''>
          <div className='layout min-h-screen py-20'>
            <div className='space-x-2'>
              <ExampleModal>
                {({ openModal }) => (
                  <Button onClick={openModal}>Open Modal</Button>
                )}
              </ExampleModal>
              <ExampleRadixModal>
                {({ openModal }) => (
                  <Button onClick={openModal}>Open Radix Modal</Button>
                )}
              </ExampleRadixModal>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
