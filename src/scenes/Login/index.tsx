import React, { useState } from 'react'
import c from 'classnames'
import s from './style.module.sass'

import { Button, Input } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import login from 'store/actions/login'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Login: React.FC = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const user = useSelector(({ user }: StateValue) => user)
  const [localUser, setUser] = useState({
    name: '',
    password: '',
  })

  const onFinish = () => router.push('/products')
  const handleClick = () => {
    dispatch(login(localUser, onFinish))
  }

  return (
    <div className={s.Block}>
      <div className={s.LoginBlock}>
        <div className={c(s.inputs)}>
          <Input
            placeholder='Email'
            width='80%'
            _focus={{
              boxShadow: '0 0 1px 2px #00C8A0, 0 1px 1px rgba(0, 0, 0, .15)',
            }}
            onChange={(e) => setUser({ ...localUser, name: e.target.value })}
          ></Input>
          <Input
            margin='1rem'
            placeholder='Password'
            width='80%'
            _focus={{
              boxShadow: '0 0 1px 2px #00C8A0, 0 1px 1px rgba(0, 0, 0, .15)',
            }}
            onChange={(e) =>
              setUser({ ...localUser, password: e.target.value })
            }
          ></Input>
        </div>
        <div className={c(s.buttons)}>
              <Button
                width='15rem'
                borderRadius='0.185rem'
                _focus={{
                  boxShadow:
                    '0 0 1px 2px #00C8A0, 0 1px 1px rgba(0, 0, 0, .15)',
                }}
                onClick={() => handleClick()}
              >
                Войти
              </Button>
          <Link href='/products'>
            <a>
              <Button
                margin='1rem'
                width='15rem'
                borderRadius='0.185rem'
                _focus={{
                  boxShadow:
                    '0 0 1px 2px #00C8A0, 0 1px 1px rgba(0, 0, 0, .15)',
                }}
              >
                Продолжить как гость
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
