import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { addLoading, removeError, removeLoading } from '.'
import { SET_PRODUCTS, SET_SERVER_PRODUCTS } from './types'

interface I {
  title: string
  price: string
  image: string
  id: string
  description: string
  category: string
}

export default function updateProduct(
  newData: I
): ThunkAction<Promise<void>, StateValue, unknown, AnyAction> {
  return async (dispatch, getState) => {
    const entry = 'getProducts'

    dispatch(removeError(entry))
    dispatch(addLoading(entry))
    fetch('https://fakestoreapi.com/products/7', {
      method: 'PUT',
      body: JSON.stringify({
        title: newData.title,
        price: newData.price,
        description: newData.description,
        image: newData.image,
        category: newData.category,
      }),
    })
      .then((res) => res.json())
      .catch((err) => err)
      .then(() => {
        if (+newData.id > 20) {
          const newProduct = getState().localProducts.map((i) =>
            i?.id == newData.id ? newData : i
          )
          dispatch({ type: SET_PRODUCTS, payload: newProduct })
        } else {
          const newProduct = getState().serverProducts.map((i) =>
            i?.id == newData.id ? newData : i
          )
          dispatch({ type: SET_SERVER_PRODUCTS, payload: newProduct })
        }
      })
      .finally(() => dispatch(removeLoading(entry)))
  }
}
