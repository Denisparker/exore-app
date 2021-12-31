import React, { useEffect } from 'react'
import c from 'classnames'
import s from './style.module.sass'
import getProducts from 'store/actions/getProducts'
import { useDispatch } from 'react-redux'

const Page: React.FC = ({ children }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts('server'))
  }, [])

  return (
    <div className={c(s.Page)}>
      <div>{children}</div>
    </div>
  )
}

export default Page
