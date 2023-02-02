import clsx from 'clsx';
import * as React from 'react';
import { IconType } from 'react-icons';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { HiOutlineCalendar } from 'react-icons/hi2';

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
        {/* CTA */}
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
                  size='lg'
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

        {/* INFORMASI */}
        <section className='min-h-main mt-32'>
          <div className='layout space-y-3 text-center sm:max-w-md'>
            <Typography as='h1' variant='h1' className='text-3xl sm:text-5xl'>
              Pusat Informasi PPDB Jawa Timur
            </Typography>
            <Typography as='h1' variant='h2' className='font-normal'>
              Pusat informasi terbaru mengenai PPDB Jawa Timur 2023
            </Typography>
          </div>
          <div className='relative mt-8 grid justify-center'>
            <div className='layout z-10 grid  gap-6 py-16 sm:grid-cols-2'>
              {/* Informasi Penting Card */}
              <div className='flex flex-col gap-6 rounded-2xl bg-white p-6'>
                <div className='space-y-1 text-center'>
                  <Typography as='h1' variant='h1'>
                    Informasi Penting
                  </Typography>
                  <Typography as='h2' variant='h6' className='font-normal'>
                    Pengumuman terbaru PPDB Jawa Timur 2023
                  </Typography>
                </div>
              </div>
              {/* Kegiatan Berlangsung Card */}
              <div className='flex max-w-sm flex-col gap-6 rounded-2xl bg-white p-6'>
                <div className='space-y-1 text-center'>
                  <Typography as='h1' variant='h1'>
                    Kegiatan Berlangsung
                  </Typography>
                  <Typography as='h2' variant='h6' className='font-normal'>
                    Jam dan jadwal lengkap dapat dicek pada halaman jadwal
                  </Typography>
                </div>
                <div className='overflow-hidden rounded-lg bg-light'>
                  <DecorativeTab />
                  <div className='space-y-1 p-6'>
                    <KegiatanCard
                      icon={HiOutlineCalendar}
                      name=' Pengambilan PIN'
                      time='2 - 18 Juni 2023'
                    />
                    <KegiatanCard
                      icon={HiOutlineCalendar}
                      name=' Pengambilan PIN'
                      time='2 - 18 Juni 2023'
                    />
                    <KegiatanCard
                      icon={HiOutlineCalendar}
                      name=' Pengambilan PIN'
                      time='2 - 18 Juni 2023'
                    />
                  </div>
                </div>
                <ButtonLink
                  size='lg'
                  variant='secondary'
                  href='#panduan'
                  rightIcon={HiOutlineCalendar}
                  className='font-averta'
                >
                  Lihat Jadwal
                </ButtonLink>
              </div>
            </div>
            <div
              className='absolute inset-0 bg-cover bg-center'
              style={{
                backgroundImage:
                  'url(https://res.cloudinary.com/dagugstv5/image/upload/v1674997120/ppdb-jatim-2023/pages/landing/informasi/informasi-bg_tjuf14.jpg)',
              }}
            >
              <Noise />
            </div>
          </div>
        </section>

        {/* PANDUAN */}
        <section className='min-h-main mt-32'></section>
      </main>
    </Layout>
  );
}

function Noise() {
  return (
    <div className='pointer-events-none absolute inset-0 bg-noise mix-blend-overlay' />
  );
}

function DecorativeTab() {
  return (
    <div className='flex w-full gap-1 bg-typo p-3'>
      <div className='h-2 w-2 rounded-full bg-[#FF4E64]' />
      <div className='h-2 w-2 rounded-full bg-[#FFB319]' />
      <div className='h-2 w-2 rounded-full bg-[#4AD15F]' />
    </div>
  );
}

function KegiatanCard({
  icon: Icon,
  name,
  time,
}: {
  icon: IconType;
  name: string;
  time: string;
}) {
  return (
    <div className='flex items-center gap-4 rounded-lg bg-white p-4'>
      <Icon className='text-2xl text-typo' />
      <div className='space-y-1'>
        <Typography variant='h6' className='font-normal'>
          {name}
        </Typography>
        <Typography variant='c1' font='averta' color='tertiary'>
          {time}
        </Typography>
      </div>
    </div>
  );
}
