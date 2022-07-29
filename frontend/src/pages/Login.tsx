import React, { useContext } from 'react'
import Head from 'next/head'

import { GetServerSideProps } from 'next'

import { parseCookies } from 'nookies'

import { Button, Flex, Stack } from '@chakra-ui/react'
import { AuthContext } from '../contexts/AuthContext'
import { Input } from '../components/Form/input'
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast, { Toaster } from 'react-hot-toast'

interface ISignInFormData {
  email: string
  password: string
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('Usuário obrigatório'),
  password: yup.string().required('Senha obrigatória'),
})

export default function Home() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  })
  const { errors } = formState
  const { SignIn } = useContext(AuthContext)

  const handleSignIn: SubmitHandler<ISignInFormData> = async (values) => {
    toast.promise(SignIn(values.email.toUpperCase(), values.password), {
      loading: 'Entrando...',
      success: <b>Sucesso</b>,
      error: <b>Usuário ou senha incorretos!</b>,
    })
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <Toaster position="bottom-center" reverseOrder={false} />
      <Flex h="80vh" align="center" justify="center">
        <Flex
          as="form"
          w="100%"
          maxWidth={360}
          p="8"
          border="1px"
          borderColor="gray.200"
          borderRadius={8}
          flexDir="column"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Stack spacing={4}>
            <Input
              error={errors.email}
              {...register('email')}
              name="email"
              label="Usuário"
            />
            <Input
              error={errors.password}
              {...register('password')}
              name="password"
              label="Senha"
              type="password"
            />
          </Stack>

          <Button
            type="submit"
            marginTop={6}
            size="lg"
            colorScheme="green"
            isLoading={formState.isSubmitting}
          >
            Entrar
          </Button>
        </Flex>
      </Flex>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = parseCookies(ctx)

  if (token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
