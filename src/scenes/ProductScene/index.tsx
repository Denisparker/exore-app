/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import c from 'classnames'
import s from './style.module.sass'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import deleteProduct from 'store/actions/deleteProduct'
import { useRouter } from 'next/router'

const ProductScene: React.FC = () => {
  const { query } = useRouter()

  useEffect(() => {}, [query])

  const dispatch = useDispatch()

  const serverProducts = useSelector(
    ({ serverProducts }: StateValue) => serverProducts
  )
  const products = useSelector(({ localProducts: products }: StateValue) => products)
  const user = useSelector(({ user }: StateValue) => user)

  const data =
    serverProducts.find((i) => i.id == query.id) ||
    products.find((i) => i.id == query.id) ||
    null


  return (
    <div>
      <div className={s.header}>
        <Link href='/products'>
          <a>
            <Button
              height='3rem'
              width='10rem'
              borderRadius='0'
              transition='.5s'
              _focus={{
                boxShadow: '0px .2rem 0px 0px #00C8A0;',
              }}
            >
              Back
            </Button>
          </a>
        </Link>{user && <>
        <Link href={`${query.id}/edit`}><a>
        <Button
          height='3rem'
          width='10rem'
          borderRadius='0'
          transition='.5s'
          _focus={{
            boxShadow: '0px .2rem 0px 0px #00C8A0;',
          }}
        >
          Edit
        </Button>
        </a></Link>
        <Link href='/products'>
          <a>
            <Button
              height='3rem'
              width='10rem'
              borderRadius='0'
              transition='.5s'
              _focus={{
                boxShadow: '0px .2rem 0px 0px #00C8A0;',
              }}
              color='red.400'
              onClick={() => data && dispatch(deleteProduct(data.id))}
            >
              Delete
            </Button>
          </a>
        </Link> </>}
      </div>
      <div className={s.content}>
        <div className={c(s.CurrentProduct)}>
          <div className={c(s.image, 'p-1 m-05')}>
            <img src={data?.image} alt='img' />
          </div>
          <div className={c(s.productFeature, 'p-1')}>
            <div className='font-w-600 font-s-large'>{data?.title}</div>
            <div className='font-w-600 font-s-large'>
              Category: {data?.category}
            </div>
            <div className='font-w-400 font-s-small scroll-x'>
              {data?.description}
            </div>
            <div className='text-r font-w-600 font-s-large'>{data?.price}$</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductScene
