'use server'

import { User } from '@/types'
import { cookies } from 'next/headers'
import { TLoginSchema } from '../schemas/auth'

export const whoAmI = async (token: string): Promise<User | null> => {
  if (token !== 'fakeToken') {
    return null
  }

  const user: User = {
    name: 'Trần Trương Văn',
    avatarUrl:
      'https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-6/338573851_702481094900552_4552716029295561758_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=okteEziIPCIAX_J5D_U&_nc_ht=scontent.fsgn8-3.fna&oh=00_AfCloY8B1ketVIIHTwos20cjDKNdSc3U9Dy0LN6sX6zdOg&oe=6606F3EE',
    username: 'trantruongvan'
  }

  return await new Promise((resolve) => {
    setTimeout(() => {
      return resolve(user)
    }, 300)
  }) //fake fetching
}

export const login = async ({ email, password }: TLoginSchema) => {
  //fake validate login
  if (email !== 'demohotel@gmail.com' || password !== 'Password1@') {
    throw new Error('Wrong email and/or password!')
  }

  const token = 'fakeToken'
  const cookieStore = cookies()
  cookieStore.set('auth-token', token)

  return token
}

export const logout = async () => {
  const cookieStore = cookies()
  cookieStore.delete('auth-token')
}
