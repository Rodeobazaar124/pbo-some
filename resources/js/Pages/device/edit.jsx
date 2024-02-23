import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React from 'react'

const editAC = ({ auth, oneGadget }) => {
  return (
    <AuthenticatedLayout user={auth.user}>

    </AuthenticatedLayout>
  )
}

export default editAC
