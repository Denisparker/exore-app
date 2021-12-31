/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import c from 'classnames'
import s from './style.module.sass'
import Link from 'next/link'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Textarea,
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import addProduct from 'store/actions/addProduct'
import { useRouter } from 'next/router'
import updateProduct from 'store/actions/updateProduct'

const CreateProduct: React.FC = () => {
  const { query } = useRouter()

  useEffect(() => {}, [query])

  const serverProducts = useSelector(
    ({ serverProducts }: StateValue) => serverProducts
  )
  const products = useSelector(
    ({ localProducts: products }: StateValue) => products
  )

  const data =
    serverProducts.find((i) => i?.id == query.id) ||
    products.find((i) => i?.id == query.id) ||
    null

  const dispatch = useDispatch()

  const [newProduct, setNewProduct] = useState({
    title: data ? data.title : '',
    category: data ? data.category : '',
    description: data ? data.description : '',
    price: data ? data.price : '',
    image: data
      ? data.image
      : 'https://kartinkin.net/uploads/posts/2021-07/1626896416_24-kartinkin-com-p-minimalistichnie-arti-lyudei-art-krasivo-25.png',
    id: data ? data.id : '0',
    public: false,
  })

  const handleClick = () => {
    if (query.id === '0') {
      if (
        newProduct.title !== '' ||
        newProduct.price !== '' ||
        newProduct.category !== ''
      ) {
        dispatch(addProduct(newProduct))
      }
    } else {
      dispatch(updateProduct(newProduct))
    }
  }

  return (
    <div>
      <div className={s.header}>
        <div>
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
          </Link>
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
                onClick={() => {
                  if (
                    !newProduct.title ||
                    !newProduct.price ||
                    !newProduct.category
                  ) {
                    alert('Данные заполнены некорректно')
                  } else {
                    alert('Успешно сохранено')
                  }
                  handleClick()
                }}
              >
                Done
              </Button>
            </a>
          </Link>
        </div>
        <div>
          <FormControl
            display='flex'
            alignItems='center'
            width='100%'
            paddingRight='1rem'
            color='white'
          >
            <FormLabel htmlFor='email-alerts' mb='0'>
              To publich
            </FormLabel>
            <Switch
              id='email-alerts'
              onChange={() =>
                setNewProduct({ ...newProduct, public: !newProduct.public })
              }
            />
          </FormControl>
        </div>
      </div>
      <div className={s.content}>
        <div className={c(s.CurrentProduct)}>
          <div className={c(s.image, 'p-1 m-05')}>
            <img src={data ? data.image : newProduct.image} alt='img' />
          </div>
          <div className={c(s.productFeature, 'p-1')}>
            <div className='font-w-600 font-s-large'>
              <Input
                value={newProduct.title}
                placeholder='Title'
                focusBorderColor='#cdced4'
                onChange={(e) =>
                  setNewProduct({ ...newProduct, title: e.target.value })
                }
              ></Input>
            </div>
            <div className='font-w-600 font-s-large'>
              Category:
              <Input
                marginTop='.2rem'
                marginLeft='.5rem'
                width='70%'
                focusBorderColor='#cdced4'
                value={newProduct.category}
                placeholder='Category'
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
              ></Input>
            </div>
            <div
              className={c(s.description, 'font-w-400 font-s-small scroll-x')}
            >
              <Textarea
                className={s.textArea}
                marginTop='.2rem'
                height='90%'
                resize='none'
                value={newProduct.description}
                placeholder='Description'
                focusBorderColor='#cdced4'
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
              />
            </div>
            <div className='text-r font-w-600 font-s-large'>
              <Input
                type='number'
                width='30%'
                focusBorderColor='#cdced4'
                value={newProduct.price}
                placeholder='0.0'
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              ></Input>
              $
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateProduct
