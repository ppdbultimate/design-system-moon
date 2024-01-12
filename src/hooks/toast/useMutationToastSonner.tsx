import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import * as React from 'react';
import { toast } from 'sonner';

import { DEFAULT_TOAST_MESSAGE } from '@/constant/toast';

import { ApiError } from '@/types/api';

type OptionType = {
  loading?: string;
  success?: string;
  error?: string;
};

export default function useMutationToastSonner<T, K>(
  mutation: UseMutationResult<T, AxiosError<ApiError>, K>,
  customMessages: OptionType = {},
) {
  const { data, isError, isLoading, error } = mutation;

  const toastStatus = React.useRef<string | number>(data ? 'done' : 'idle');

  React.useEffect(() => {
    const toastMessage = {
      ...DEFAULT_TOAST_MESSAGE,
      ...customMessages,
    };

    // If it is not the first render
    if (toastStatus.current === 'done' && !isLoading) return;

    if (isError) {
      toast.error(
        typeof toastMessage.error === 'string'
          ? toastMessage.error
          : toastMessage.error(error),
        { id: toastStatus.current, duration: 2000 },
      );
      toastStatus.current = 'done';
    } else if (isLoading) {
      toastStatus.current = toast.loading(toastMessage.loading, {
        duration: Infinity,
      });
    } else if (data) {
      toast.success(toastMessage.success, {
        id: toastStatus.current,
        duration: 2000,
      });
      toastStatus.current = 'done';
    }
  }, [customMessages, data, error, isError, isLoading]);

  return { ...mutation };
}
