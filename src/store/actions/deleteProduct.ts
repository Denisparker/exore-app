import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { addLoading, removeError, removeLoading } from '.'
import { SET_PRODUCTS, SET_SERVER_PRODUCTS } from './types'

export default function deleteProduct(
  id: string
): ThunkAction<Promise<void>, StateValue, unknown, AnyAction> {
  return async (dispatch, getState) => {
    const entry = 'getProducts'

    dispatch(removeError(entry))
    dispatch(addLoading(entry))
    if (+id > 20) {
      const newProducts = getState().localProducts.filter((i) => i.id !== id)
      dispatch({ type: SET_PRODUCTS, payload: newProducts })
      dispatch(removeLoading(entry))
    } else {
      fetch(`https://fakestoreapi.com/products/${id}`, {
        method: 'DELETE',
      })
        .catch((err) => err)
        .then(() => {
          const products = getState().serverProducts.filter((i) => i.id !== id)
          dispatch({ type: SET_SERVER_PRODUCTS, payload: products })
        })
        .finally(() => {
          alert('Это всего лишь эмуляция удаления')
          dispatch(removeLoading(entry))
        })
    }
  }
}
