import { VariantType, enqueueSnackbar } from 'notistack'

export const sendSnackbar = {
  toast(msg: string, variant: VariantType = 'default') {
    enqueueSnackbar(msg, { variant: variant, autoHideDuration: 2000 })
  },
  success(msg: string) {
    this.toast(msg, 'success')
  },
  error(msg: string) {
    this.toast(msg, 'error')
  },
  info(msg: string) {
    this.toast(msg, 'info')
  },
  warning(msg: string) {
    this.toast(msg, 'warning')
  },
}
