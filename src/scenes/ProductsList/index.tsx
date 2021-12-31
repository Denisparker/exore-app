/* eslint-disable react-hooks/exhaustive-deps */
import React, { FormEvent, useState } from 'react'
import c from 'classnames'
import s from './style.module.sass'
import ProductCard from './components/ProductCard'
import { useSelector } from 'react-redux'
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Switch,
} from '@chakra-ui/react'
import Link from 'next/link'

const ProductsList: React.FC = () => {
  ///
  const [filtredPost, setFiltredPost] = useState(false)

  const loading = useSelector(({ loadings }: StateValue) =>
    loadings.includes('getProducts')
  )

  const [tab, setTab] = useState('server')

  const serverProducts = useSelector(
    ({ serverProducts }: StateValue) => serverProducts
  )
  const localProducts = useSelector(
    ({ localProducts }: StateValue) => localProducts
  )

  const products = tab === 'server' ? serverProducts : localProducts

  const [searchQuery, setSearchQuery] = useState('')

  const [viewCount, setViewCount] = useState(9)
  const [currentPage, setCurrentPage] = useState(1)

  const handlerChange = (e: any) => {
    if (currentPage !== 1) {
      setCurrentPage(1)
    }
    setSearchQuery(e.target.value)
  }

  const productsBySearch = searchQuery
    ? products.filter(
        (i) =>
          i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          i.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          i.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products

  const getFilteredProducts = () => {
    let list = productsBySearch
    if (filtredPost) {
      return list.filter((i) => i.public)
    } else {
      return list.slice(
        currentPage * viewCount - viewCount,
        viewCount * currentPage
      )
    }
  }

  return (
    <div className={s.Block}>
      <div className={s.header}>
        <div>
          <Link href='/'>
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
          <Button
            height='3rem'
            width='10rem'
            borderRadius='0'
            transition='.5s'
            _focus={{
              boxShadow: '0px .2rem 0px 0px #00C8A0;',
            }}
            onClick={() => setTab('server')}
          >
            Server Products
          </Button>
          <Button
            height='3rem'
            width='10rem'
            borderRadius='0'
            transition='.5s'
            _focus={{
              boxShadow: '0px .2rem 0px 0px #00C8A0;',
            }}
            onClick={() => setTab('products')}
          >
            User Products
          </Button>
        </div>
        <div className={s.search}>
          <Input
            placeholder='Search'
            width='100%'
            height='100%'
            borderRadius='0'
            borderColor='#716D79'
            focusBorderColor='none'
            color='white'
            onChange={(e) => handlerChange(e)}
          />
          {products === localProducts && (
            <FormControl
              display='flex'
              alignItems='center'
              width='100%'
              color='white'
            >
              <FormLabel htmlFor='email-alerts' mb='0'>
                Filter by publication
              </FormLabel>
              <Switch
                id='email-alerts'
                onChange={() => setFiltredPost(!filtredPost)}
              />
            </FormControl>
          )}
        </div>
      </div>

      <div className={c(s.ProductsList)}>
        {loading ? (
          <div className={s.loading}>
            <p>Loading...</p>
          </div>
        ) : (
          <div className={s.layout}>
            {getFilteredProducts().map((i) => (
              <ProductCard data={i} key={i.id} />
            ))}
            {products === localProducts && <ProductCard />}
          </div>
        )}
      </div>
      {products.length !== 0 && (
        <div className={s.footer}>
          <div className={s.count}>
            <Button
              colorScheme='blackAlpha'
              height='3rem'
              value={9}
              borderRadius='0'
              transition='.5s'
              _focus={{
                boxShadow: '0',
              }}
              onClick={() => {
                setCurrentPage(1)
                setViewCount(9)
              }}
            >
              9 продуктов
            </Button>
            <Button
              colorScheme='blackAlpha'
              height='3rem'
              value={18}
              borderRadius='0'
              transition='.5s'
              _focus={{
                boxShadow: '0',
              }}
              onClick={() => {
                setCurrentPage(1)
                setViewCount(18)
              }}
            >
              18 продуктов
            </Button>
            <Button
              colorScheme='blackAlpha'
              height='3rem'
              value={27}
              borderRadius='0'
              transition='.5s'
              _focus={{
                boxShadow: '0',
              }}
              onClick={() => {
                setCurrentPage(1)
                setViewCount(27)
              }}
            >
              27 продуктов
            </Button>
          </div>
          <div className={s.pages}>
            {Array.from(
              Array(Math.ceil(productsBySearch.length / viewCount)).keys()
            ).map((i) => (
              <Button
                colorScheme='blackAlpha'
                height='3rem'
                value={8}
                borderRadius='0'
                transition='.5s'
                _focus={{
                  boxShadow: '0',
                }}
                key={i}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductsList
