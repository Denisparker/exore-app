/* eslint-disable @next/next/no-img-element */
import React from 'react'
import c from 'classnames'
import s from './style.module.sass'
import Link from 'next/link'
import { useDispatch } from 'react-redux'

interface I {
  data?: {
    title: string
    price: string
    image: string
    id: string
  }
}

const ProductCard: React.FC<I> = ({ data }) => {
  const dispatch = useDispatch()

  return (
    <div className={c(s.Product, 'mv-1 p-1')}>
      {data ? (
        <Link href={`/products/${data.id}`}>
          <a>
            <div className={s.image}>
              <img src={data.image} alt='img' />
            </div>
            <div className={c(s.inform, 'pv-1 ph-1')}>
              <div className={c(s.title, 'limit-string-1')}>{data.title}</div>
              <div className={s.price}>{data.price}$</div>
            </div>
          </a>
        </Link>
      ) : (
        <Link href='products/0/edit'>
          <a>
            <div className={s.create}>+</div>
          </a>
        </Link>
      )}
    </div>
  )
}

export default ProductCard
