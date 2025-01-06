"use client"

import { signOut } from '@/lib/utils/auth/auth'
import React from 'react'

const SignoutButton = () => {
  return (
      <button className="border m-4 p-4 rounded-xl" onClick={() => signOut()}>
        Sign out
      </button>
  )
}

export default SignoutButton