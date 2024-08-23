import { create } from 'zustand';
import { ToastProps, ToastType } from '../../types/toastTypes';

// This is the Principal State of the Toasts where we will store the toasts and manage them with the functions addToast and removeToast
interface ToastState {
  toasts: (ToastProps & { id: number; date: Date })[]; // id and date are added to the toast
  addToast: (
    type: ToastType,
    message: ToastProps['message'],
    props: ToastProps['props']
  ) => void;
  removeToast: (id: number) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (type, message, props) => {
    const id = props?.id ?? Math.floor(Math.random() * 100);
    const date = new Date();
    // the default duration is 3000 ms for all toasts except for the loading type which is 100000 ms
    const defaultDuration = !props?.duration
      ? type === 'loading'
        ? 100000
        : 3000
      : props.duration;
    let newToast = {
      id,
      type,
      message,
      props,
      date,
    };
    // if exists a toast with the same id, it will be removed and the new one will be added keeping some properties
    set((state) => {
      const existingToastIndex = state.toasts.findIndex(
        (toast) => toast.id === id
      );
      if (existingToastIndex !== -1) {
        const existingToast = state.toasts[existingToastIndex];
        newToast = {
          ...existingToast,
          type,
          message,
          props: {
            ...props,
            duration: defaultDuration, // the duration every time is restored to the default value
            // these values are overwritten if they are passed in props and kept if they are not
            position: props?.position ?? existingToast.props?.position,
            toastStyle: props?.toastStyle ?? existingToast.props?.toastStyle,
            styles: {
              // for default the styles of toastStyles are inherited unless otherwise indicated, inheriStyles will be undefined if it is not passed in props
              ...(props?.inheritStyles !== false && {
                ...existingToast.props?.styles,
              }),
              // the values of ...props.styles overwrite the values of ...existingToast.props.
              ...props?.styles,
            },
          },
          date,
        };

        const updatedToasts = [...state.toasts];
        updatedToasts[existingToastIndex] = newToast;
        return { toasts: updatedToasts };
      } else {
        return {
          toasts: [
            ...state.toasts,
            { ...newToast, props: { ...props, duration: defaultDuration } },
          ],
        };
      }
    });

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.date !== date),
      }));
    }, defaultDuration);
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast?.props?.id !== id),
    })),
}));

// Ej: toast.error('...', { title: 'Error' });
export const toast = {
  error: (message: string, props: ToastProps['props']) =>
    useToastStore.getState().addToast('error', message, props),
  success: (message: string, props: ToastProps['props']) =>
    useToastStore.getState().addToast('success', message, props),
  info: (message: string, props: ToastProps['props']) =>
    useToastStore.getState().addToast('info', message, props),
  warning: (message: string, props: ToastProps['props']) =>
    useToastStore.getState().addToast('warning', message, props),
  dismiss: (id: number) => useToastStore.getState().removeToast(id),
  loading: (message: string, props: ToastProps['props']) =>
    useToastStore.getState().addToast('loading', message, props),
};
