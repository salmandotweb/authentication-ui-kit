"use server"

import { User } from '@/interfaces/user'
import { cookies } from 'next/headers'

const getCurrentUser = async () => {
   const cookieStore = cookies()

   const authToken = cookieStore.get('authToken')?.value

   if (!authToken) {
      return null
   }

   const response = await fetch(`${process.env.API_URL}/users/me`, {
      headers: {
         Authorization: `Bearer ${authToken}`
      }
   })

   if (!response.ok) {
      return null
   }

   const reqResponse = await response.json()

   return reqResponse.data as User
}

export { getCurrentUser }