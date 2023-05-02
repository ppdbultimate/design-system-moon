import clsx from 'clsx';
import get from 'lodash.get';
import * as React from 'react';
import {
  Accept,
  DropzoneOptions,
  FileRejection,
  useDropzone,
} from 'react-dropzone';
import { Controller, useFormContext } from 'react-hook-form';

import TextButton from '@/components/buttons/TextButton';
import FilePreview from '@/components/forms/FilePreview';
import PanduanKompresModal from '@/components/modal/PanduanKompresModal';
import Typography from '@/components/typography/Typography';

import { FileWithPreview } from '@/types/dropzone';

type DropzoneInputProps = {
  accept?: Accept;
  helperText?: string;
  id: string;
  label: string | null;
  maxFiles?: number;
  readOnly?: boolean;
  hideError?: boolean;
  validation?: Record<string, unknown>;
} & Partial<DropzoneOptions>;

const DEFAULT_MIN_SIZE = 100_000;
const DEFAULT_MAX_SIZE = 400_000;

export default function DropzoneInput({
  accept,
  helperText = '',
  id,
  label,
  maxFiles = 1,
  validation,
  readOnly,
  hideError = false,
  ...dropzoneOptions
}: DropzoneInputProps) {
  const {
    control,
    getValues,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  const error = get(errors, id);
  const withLabel = label !== null;

  //#region  //*=========== Error Focus ===========
  const dropzoneRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    error && dropzoneRef.current?.focus();
  }, [error]);
  //#endregion  //*======== Error Focus ===========

  //#region  //*=========== Sync Files With RHF ===========
  const fileValue = getValues(id);
  const [files, setFiles] = React.useState<FileWithPreview[]>(fileValue || []);

  React.useEffect(() => {
    setFiles(fileValue);
  }, [fileValue]);
  //#endregion  //*======== Sync Files With RHF ===========

  const onDrop = React.useCallback(
    <T extends File>(acceptedFiles: T[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles && rejectedFiles.length > 0) {
        setValue(id, files ? [...files] : null);
        setValue(id, files ? [...files] : null);

        let message = rejectedFiles && rejectedFiles[0].errors[0].message;
        if (rejectedFiles[0].errors[0].code === 'file-too-large') {
          message = `File terlalu besar, maksimal ${
            (dropzoneOptions.maxSize || DEFAULT_MAX_SIZE) / 1000
          }KB`;
        } else if (rejectedFiles[0].errors[0].code === 'file-too-small') {
          message = `File terlalu kecil, minimal ${
            (dropzoneOptions.minSize || DEFAULT_MIN_SIZE) / 1000
          }KB`;
        } else if (rejectedFiles[0].errors[0].code === 'too-many-files') {
          message = `Maksimal ${maxFiles} file`;
        } else if (rejectedFiles[0].errors[0].code === 'file-invalid-type') {
          message = message.replace(
            'File type must be',
            'Ekstensi file yang diperbolehkan adalah',
          );
        }

        setError(id, {
          type: 'manual',
          message: message,
        });
      } else {
        const acceptedFilesPreview = acceptedFiles.map((file: T) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        );

        setFiles(
          files
            ? [...files, ...acceptedFilesPreview].slice(0, maxFiles)
            : acceptedFilesPreview,
        );

        setValue(
          id,
          files
            ? [...files, ...acceptedFiles].slice(0, maxFiles)
            : acceptedFiles,
          {
            shouldValidate: true,
          },
        );
        clearErrors(id);
      }
    },
    [
      clearErrors,
      dropzoneOptions.maxSize,
      dropzoneOptions.minSize,
      files,
      id,
      maxFiles,
      setError,
      setValue,
    ],
  );

  React.useEffect(() => {
    return () => {
      () => {
        files.forEach((file) => URL.revokeObjectURL(file.preview));
      };
    };
  }, [files]);

  const deleteFile = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    file: FileWithPreview,
  ) => {
    e.preventDefault();
    const newFiles = [...files];

    newFiles.splice(newFiles.indexOf(file), 1);

    if (newFiles.length > 0) {
      setFiles(newFiles);
      setValue(id, newFiles, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    } else {
      setFiles([]);
      setValue(id, null, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    // 5KB
    minSize: dropzoneOptions.minSize || DEFAULT_MIN_SIZE,
    // 400KB
    maxSize: dropzoneOptions.maxSize || DEFAULT_MAX_SIZE,
    ...dropzoneOptions,
  });

  return (
    <div>
      {withLabel && (
        <Typography as='label' variant='s3' className='block' htmlFor={id}>
          {label}
        </Typography>
      )}

      {readOnly && !(files?.length > 0) ? (
        <div className='mt-1 divide-y divide-gray-300 rounded-lg border border-gray-300 py-3 pl-3 pr-4 text-sm'>
          Tidak ada file yang diupload
        </div>
      ) : files?.length >= maxFiles ? (
        <ul
          className={clsx([
            'divide-y divide-gray-300 rounded-lg border border-gray-300',
            withLabel && 'mt-1',
          ])}
        >
          {files.map((file, index) => (
            <FilePreview
              key={index}
              readOnly={readOnly}
              file={file}
              deleteFile={deleteFile}
            />
          ))}
        </ul>
      ) : (
        <Controller
          control={control}
          name={id}
          rules={validation}
          render={({ field }) => (
            <>
              <div
                className={clsx([
                  'focus:ring-dark-400 group focus:outline-none',
                  withLabel && 'mt-1',
                ])}
                {...getRootProps()}
                ref={dropzoneRef}
              >
                <input {...field} {...getInputProps()} />
                <div
                  className={clsx(
                    'w-full cursor-pointer rounded-lg px-2 py-8',
                    error
                      ? 'dropzone-border-dash-error border-red-500 group-focus:border-red-500'
                      : 'dropzone-border-dash group-focus:border-primary-500',
                  )}
                >
                  <div className='space-y-1 text-center'>
                    <svg
                      className='mx-auto h-12 w-12 text-gray-400'
                      stroke='currentColor'
                      fill='none'
                      viewBox='0 0 48 48'
                      aria-hidden='true'
                    >
                      <path
                        d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                        strokeWidth={2}
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                    <p className='text-gray-500'>
                      Klik untuk upload, atau drag file ke sini
                    </p>
                    <p className='text-xs text-gray-500'>{`${
                      maxFiles - (files?.length || 0)
                    } file lagi`}</p>
                  </div>
                </div>
              </div>

              {helperText && (
                <Typography variant='c1' color='secondary' className='mt-1'>
                  {helperText}
                </Typography>
              )}
              {!hideError && error && (
                <Typography variant='c1' color='danger' className='mt-1'>
                  {error?.message?.toString()}
                  {errors[id]?.message
                    ?.toString()
                    .includes('File terlalu besar') && (
                    <PanduanKompresForDropzone />
                  )}
                </Typography>
              )}
              {!readOnly && !!files?.length && (
                <ul className='mt-1 divide-y divide-gray-300 rounded-lg border border-gray-300'>
                  {files.map((file, index) => (
                    <FilePreview
                      key={index}
                      readOnly={readOnly}
                      file={file}
                      deleteFile={deleteFile}
                    />
                  ))}
                </ul>
              )}
            </>
          )}
        />
      )}
    </div>
  );
}

function PanduanKompresForDropzone() {
  return (
    <PanduanKompresModal>
      {({ openModal }) => (
        <span className='mt-2 flex items-center justify-between rounded-lg border border-gray-300 p-2 shadow-sm'>
          <span className='text-typo-secondary'>
            Lihat panduan kompres gambar
          </span>
          <TextButton onClick={openModal} size='sm' className='md:text-xs'>
            di sini
          </TextButton>
        </span>
      )}
    </PanduanKompresModal>
  );
}
