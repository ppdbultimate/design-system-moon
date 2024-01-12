import produce from 'immer';
import { useRouter } from 'next/router';
import * as React from 'react';
import { toast, Toaster } from 'sonner';

export default function SonnerToaster() {
  const router = useRouter();
  /**
   * ? This allows to show a toast via query params
   * * toast_type success, error, or none: default
   * * toast_message (required) the message to show
   */

  React.useEffect(() => {
    const toast_type = router.query.toast_type;
    const toast_message = router.query.toast_message;

    if (typeof toast_message === 'string') {
      if (toast_type === 'success') {
        toast.success(toast_message as string);
      } else if (toast_type === 'error') {
        toast.error(toast_message as string);
      } else {
        toast(toast_message as string);
      }

      const cleanedQuery = produce(router.query, (draft) => {
        delete draft.toast_type;
        delete draft.toast_message;
      });
      router.replace({ query: cleanedQuery }, undefined, { shallow: true });
    }
  }, [router, router.query, router.isReady]);

  return (
    <Toaster
      position='top-center'
      closeButton
      richColors
      toastOptions={{
        classNames: {
          actionButton: '!ml-0 !mr-2 !bg-primary-500',
          closeButton:
            '!left-auto !top-2.5 !-right-1 !border-none !bg-transparent',
        },
      }}
    />
  );
}
