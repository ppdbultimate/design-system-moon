import clsx from 'clsx';
import * as React from 'react';

import ButtonLink from '@/components/links/ButtonLink';
import Modal from '@/components/modal/Modal';
import NextImage from '@/components/NextImage';
import Tag from '@/components/tag/Tag';
import Typography from '@/components/typography/Typography';

type ModalReturnType = {
  openModal: () => void;
};

export default function PanduanKompresModal({
  children,
}: {
  children: (props: ModalReturnType) => JSX.Element;
}) {
  const [open, setOpen] = React.useState(false);
  const modalReturn: ModalReturnType = {
    openModal: () => setOpen(true),
  };

  return (
    <>
      {children(modalReturn)}
      <Modal
        open={open}
        setOpen={setOpen}
        title='Panduan Kompres Gambar'
        modalContainerClassName='overflow-hidden'
      >
        <Modal.Section
          className={clsx([
            'space-y-4 overflow-y-scroll bg-light p-2',
            'max-h-[80vh] sm:max-h-[70vh]',
          ])}
        >
          {PANDUAN_KOMPRES_CONTENT.map(({ title, description, body }, i) => (
            <div className='space-y-4 rounded-md bg-white p-4 shadow' key={i}>
              <Tag size='sm'>{`Langkah ${i + 1}`}</Tag>
              <div className='space-y-1'>
                {title && <Typography variant='s2'>{title}</Typography>}
                {description && (
                  <Typography variant='b3' color='secondary'>
                    {description}
                  </Typography>
                )}
              </div>
              {body?.type === 'node' && body.content}
              {body?.type === 'image' && (
                <NextImage
                  src={body.src}
                  width={720}
                  height={1280}
                  alt='Panduan Kompres Gambar'
                  className='mx-auto mt-4 w-4/5 overflow-hidden rounded-lg border border-typo-outline'
                />
              )}
            </div>
          ))}

          <div className='rounded-md bg-secondary-50 p-4 shadow'>
            <Tag size='sm' color='success'>
              Selesai
            </Tag>
            <Typography variant='b3' color='secondary' className='mt-4'>
              Sekarang gambar-gambar Anda sudah dikompres dan siap digunakan
              dengan ukuran file yang lebih kecil.
            </Typography>
          </div>
        </Modal.Section>
      </Modal>
    </>
  );
}

//#region  //*=========== Content ===========
const PANDUAN_KOMPRES_CONTENT: {
  title?: string;
  description?: React.ReactNode;
  body?:
    | { type: 'node'; content: React.ReactNode }
    | { type: 'image'; src: string };
}[] = [
  {
    title: 'Buka browser melalui ponsel atau komputer',
  },
  {
    title: 'Akses situs kompres gambar',
    description: (
      <>
        Kunjungi situs{' '}
        <span className='font-medium text-typo'>
          iloveimg.com/id/kompres-gambar
        </span>{' '}
        atau klik tombol di bawah ini.
      </>
    ),
    body: {
      type: 'node',
      content: (
        <div className='flex items-center justify-between rounded-lg border border-gray-300 p-2'>
          <Typography variant='s3'>Situs kompres gambar</Typography>
          <ButtonLink
            href='https://www.iloveimg.com/id/kompres-gambar'
            size='sm'
          >
            klik di sini
          </ButtonLink>
        </div>
      ),
    },
  },
  {
    title: 'Pilih Gambar',
    description: (
      <>
        Klik tombol{' '}
        <span className='font-medium text-typo'>"Pilih Gambar"</span> untuk
        memilih gambar yang ingin dikecilkan ukurannya.
      </>
    ),
    body: {
      type: 'image',
      src: '/images/panduan-kompres-foto/pilih-gambar.jpg',
    },
  },
  {
    title: 'Kompres Gambar',
    description: (
      <>
        Klik tombol{' '}
        <span className='font-medium text-typo'>"Kompres Gambar"</span> dan
        tunggu hingga proses selesai.
      </>
    ),
    body: {
      type: 'image',
      src: '/images/panduan-kompres-foto/kompres-gambar.jpg',
    },
  },
  {
    title: 'Unduh Gambar',
    description: (
      <>
        Klik tombol{' '}
        <span className='font-medium text-typo'>
          "Unduh Gambar yang dikompres"
        </span>{' '}
        untuk mengunduh gambar.
      </>
    ),
    body: {
      type: 'image',
      src: '/images/panduan-kompres-foto/unduh-gambar.jpg',
    },
  },
];

//#endregion  //*======== Content ===========
