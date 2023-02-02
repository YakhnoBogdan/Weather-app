import { LoadingRequestModel } from '../Types/RequestStateModel'

export const loadingRequestLoad = (isLoading: LoadingRequestModel) => {
  return {
    ...isLoading,
    success: false,
    request: true,
    failure: false,
  }
}

export const successRequestLoad = (isLoading: LoadingRequestModel) => {
  return {
    ...isLoading,
    success: true,
    request: false,
    failure: false,
  }
}

export const failureRequestLoad = (isLoading: LoadingRequestModel) => {
  return {
    ...isLoading,
    success: false,
    request: false,
    failure: true,
  }
}
