import SignUp from '@/modules/Auth/Signup'
import PageHead from '@/modules/common/PageHead'
import React from 'react'

const signup = () => {
  return (
    <>
      <PageHead title='Sign up' />
      <SignUp />
    </>
  )
}

export default signup
