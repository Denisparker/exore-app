import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { addLoading, removeError, removeLoading } from '.'
import { SET_SERVER_PRODUCTS } from './types'

export default function getProducts(
  target: 'server' | 'products'
): ThunkAction<Promise<void>, StateValue, unknown, AnyAction> {
  return async (dispatch) => {
    const entry = 'getProducts'

    dispatch(removeError(entry))
    dispatch(addLoading(entry))

    if (target === 'server') {
      fetch(`https://fakestoreapi.com/products`)
        .then((res) => res.json())
        .catch((err) => err)
        .then((products) => {
          Array.isArray(products) ? (
          dispatch({
            type: SET_SERVER_PRODUCTS,
            payload: products,
          })) : []
        })
        .finally(() => dispatch(removeLoading(entry)))
    }
    if (target === 'products') {
    }
  }
}
