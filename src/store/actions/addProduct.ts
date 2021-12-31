import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { addLoading, removeError, removeLoading } from '.'
import { SET_PRODUCTS } from './types'

export default function addProduct(data: {
  title: string
  category: string
  description: string
  price: string
  image: string
  id: string
  public?: boolean
}): ThunkAction<Promise<void>, StateValue, unknown, AnyAction> {
  return async (dispatch, getState) => {
    const entry = 'getProducts'

    dispatch(removeError(entry))
    dispatch(addLoading(entry))

    fetch('https://fakestoreapi.com/products', {
      method: 'POST',
      body: JSON.stringify({
        title: data.title,
        price: data.price,
        description: data.description,
        image: data.image,
        category: data.category,
        post: false
      }),
    })
      .then((res) => res.json()).catch((err) => err)
      .then((product) => {
        const prevState = getState().localProducts
        let newId
        if (prevState.length !== 0) {
          newId = prevState[prevState.length - 1].id + 1
        } else {
          newId = product.id
        }
        localStorage.setItem(
          'products',
          JSON.stringify([...prevState, { ...data, id: newId }])
        )
        dispatch({
          type: SET_PRODUCTS,
          payload: [...prevState, { ...data, id: newId }],
        })
      })
      .finally(() => dispatch(removeLoading(entry)))
  }
}
