import React from 'react'
import Navbar from '../Landing/components/Navbar'
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import Image from 'next/image'
import * as Yup from 'yup'
import StyledLink from '../common/StyledLink'

type SignUpTypes = {
  username: string
  email: string
  password: string
}
type FormFieldTypes = {
  name: string
  type: string
  label: string
}
const authOptions = [
  { label: 'Google', image: '/images/google.svg.png' },
  { label: 'Microsoft', image: '/images/microsoft.png' },
]

const formFields = [
  { name: 'username', type: 'text', label: 'Username' },
  { name: 'email', type: 'email', label: 'Email address' },
  { name: 'password', type: 'password', label: 'Password' },
]

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(6, 'Too Short')
    .min(32, 'Too Long')
    .required('Please enter your username'),
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Please enter your email'),
  password: Yup.string()
    .min(6, 'Too Short')
    .max(32, 'Too Long!')
    .required('Please enter your password'),
})

const SignUp = () => {
  const handleSubmit = (values: SignUpTypes, onSubmitProps: any) => {
    console.log(values)
    onSubmitProps?.resetForm()
    onSubmitProps?.setSubmitting(false)
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  })
  return (
    <>
      <Navbar />
      <Box pt='100px' bg='#F2F2F2' height='100vh'>
        <Center>
          <Box width='400px' bg='white' px='20px' py='20px' boxShadow='md'>
            <Text fontSize='30px' textAlign='center' fontWeight='700' mb='20px'>
              Sign up
            </Text>
            <form
              onSubmit={formik.handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
            >
              {formFields.map((field: FormFieldTypes, i: number) => (
                <FormControl key={i}>
                  <FormLabel>{field.label}</FormLabel>
                  <Input
                    name={field.name}
                    type={field.type}
                    value={
                      formik.values[field.name as keyof typeof formik.values]
                    }
                    onChange={formik.handleChange}
                  />
                </FormControl>
              ))}
              <Button type='submit' w='full' colorScheme='blue' mt='20px'>
                Submit
              </Button>
              <Text textAlign='center' size='sm' color='#808080'>
                Already have an account?{' '}
                <StyledLink as='span' href='/auth/login'>
                  Log in
                </StyledLink>
              </Text>
              <hr />
              <VStack spacing='10px'>
                {authOptions.map((option, i: number) => (
                  <Button
                    position='relative'
                    key={i}
                    variant='outline'
                    colorScheme='white'
                    w='full'
                  >
                    <Box position='absolute' left='10px'>
                      <Image
                        height={20}
                        width={20}
                        alt={option.label}
                        src={option.image}
                      />
                    </Box>
                    <span>Continue with {option.label}</span>
                  </Button>
                ))}
              </VStack>
            </form>
          </Box>
        </Center>
      </Box>
    </>
  )
}

export default SignUp