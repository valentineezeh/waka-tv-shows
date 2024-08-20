import * as Sentry from '@sentry/vue'

// Initialize Sentry with your Data Source Name (DSN)


const logError = (errorData) => {
  Sentry.captureException(errorData.error, {
    extra: {
      componentName: errorData.componentName,
      componentProps: errorData.componentProps,
      componentInfo: errorData.componentInfo
    }
  })
}

export default {
  logError
}

export const logErrorToService = (err, vm, info) => {
  const errorData = {
    error: err,
    componentName: vm.$options.name || 'Anonymous Component',
    componentProps: vm.$props,
    componentInfo: info
  }
  logError(errorData)
}