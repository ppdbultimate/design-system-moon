import clsx from 'clsx';
import * as React from 'react';
import { HiOutlineClipboardList } from 'react-icons/hi';

import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

export default function LandingPage() {
  return (
    <Layout>
      <Seo templateTitle='Landing' />

      {/* //!TODO this is dummy navbar */}
      <section className='layout h-14'></section>

      <main>
        {/* CTA Section */}
        <section className='min-h-main grid pb-[calc(100%/48)]'>
          <div className='layout relative grid !max-w-none overflow-hidden rounded-2xl bg-primary-100 bg-landing-cta-particle bg-cover bg-top'>
            <div
              className={clsx(
                'flex flex-col-reverse p-8',
                'sm:layout sm:flex-row sm:items-center sm:p-0'
              )}
            >
              <div className='z-10 sm:max-w-md'>
                <div className='space-y-3'>
                  <Typography as='h1' variant='h2' className='font-normal'>
                    Selamat Datang di
                  </Typography>
                  <Typography
                    as='h1'
                    variant='h1'
                    className='text-3xl sm:text-5xl'
                  >
                    Portal Penerimaan Peserta Didik Baru (PPDB)
                  </Typography>
                  <Typography as='h1' variant='h2' className='font-normal'>
                    Provinsi Jawa Timur 2023
                  </Typography>
                </div>
                <ButtonLink
                  href='#panduan'
                  leftIcon={HiOutlineClipboardList}
                  className='mt-6 font-averta'
                >
                  Baca Panduan
                </ButtonLink>
              </div>
              <div className='relative w-full'>
                <NextImage
                  width={2160}
                  height={2160}
                  alt='Layanan Sistem Innformasi PPDB Online Jenjang sekolah SMA dan SMK Negeri di wilayah Provinsi Jawa Timur'
                  src='https://res.cloudinary.com/dagugstv5/image/upload/v1675074299/ppdb-jatim-2023/pages/landing/cta/cta-phone_ty2mdb.png'
                  className={clsx(
                    'absolute bottom-0 w-full origin-bottom scale-[250%]',
                    'sm:top-1/2 sm:bottom-auto sm:origin-right sm:-translate-y-1/2 sm:translate-x-[30%] sm:scale-150'
                  )}
                  priority
                  useSkeleton
                />
              </div>
            </div>
            <Noise />
          </div>
        </section>

        {/* INFORMASI SECTION */}
        <section className='min-h-main mt-32 w-full'>
          <div className='layout space-y-3 sm:text-center'>
            <Typography as='h1' variant='h1' className='text-3xl sm:text-5xl'>
              Pusat Informasi PPDB Jawa Timur
            </Typography>
            <Typography as='h1' variant='h2' className='font-normal'>
              Pusat informasi terbaru mengenai PPDB Jawa Timur 2023
            </Typography>
          </div>
        </section>
      </main>
    </Layout>
  );
}

function Noise() {
  return (
    <div className='pointer-events-none absolute inset-0 bg-noise mix-blend-overlay'></div>
  );
}
