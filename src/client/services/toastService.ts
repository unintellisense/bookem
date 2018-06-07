import { toastr } from 'react-redux-toastr'

const toastrOptions = { position: 'top-center' };

export function toastSuccess(title: string, message: string) {
  toastr.success(title, message, toastrOptions as any);
}

export function toastError(title: string, message: string) {
  toastr.error(title, message, toastrOptions as any);
}