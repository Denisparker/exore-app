import * as t from './types'

export const addLoading = (value: string) => ({
  type: t.ADD_LOADING,
  payload: value,
})
export const removeLoading = (value: string) => ({
  type: t.REMOVE_LOADING,
  payload: value,
})

export const addError = (value: { [key: string]: string }) => ({
  type: t.ADD_ERROR,
  payload: value,
})
export const removeError = (value: string) => ({
  type: t.REMOVE_ERROR,
  payload: value,
})

