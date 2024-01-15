import * as React from 'react';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import ExampleAdaptiveModal from '@/pages/sandbox/components/ExampleAdaptiveModal';

export default function AdaptiveDrawerPage() {
  return (
    <Layout>
      <Seo templateTitle='Alert' />

      <main>
        <section className='space-x-4 layout min-h-screen py-20'>
          <ExampleAdaptiveModal>
            {({ openModal }) => (
              <Button onClick={openModal}>Open Adaptive Modal</Button>
            )}
          </ExampleAdaptiveModal>
        </section>
      </main>
    </Layout>
  );
}
