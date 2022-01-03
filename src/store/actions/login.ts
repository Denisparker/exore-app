import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { addLoading, removeError, removeLoading } from '.'
import { SET_USER } from './types'

export default function login(
  user: { name: string; password: string },
  onFinish: () => void
): ThunkAction<Promise<void>, StateValue, unknown, AnyAction> {
  return async (dispatch) => {
    const entry = 'login'

    dispatch(removeError(entry))
    dispatch(addLoading(entry))

    setTimeout(() => {
      if ((user.name !== 'Admin', user.password !== '123')) {
        alert('Данного пользователя не существует')
      } else {
        dispatch({ type: SET_USER, payload: user })
        onFinish()
      }
    })

    dispatch(removeLoading(entry))
  }
}
