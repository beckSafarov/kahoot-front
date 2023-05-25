import Login from '@/modules/Auth/Login'
import PageHead from '@/modules/common/PageHead'
import React from 'react'

const login = () => {
  return (
    <>
      <PageHead title='Login'/>
      <Login />
    </>
  )
}

export default login