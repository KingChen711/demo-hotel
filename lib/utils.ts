import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import queryString from 'query-string'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type UrlQueryParams = {
  params: string
  key: string
  value: string | null
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const query = queryString.parse(params)

  query[key] = value

  return queryString.stringifyUrl(
    {
      url: window.location.pathname,
      query
    },
    { skipNull: true }
  )
}

export function getCookieValue(key: string) {
  // Split all cookies into an array
  const cookiesArray = document.cookie.split(';')

  // Iterate through the array to find the cookie with the given name
  for (let i = 0; i < cookiesArray.length; i++) {
    let cookie = cookiesArray[i].trim()

    // Check if the cookie starts with the provided name
    if (cookie.indexOf(key + '=') === 0) {
      // Return the value of the cookie
      return cookie.substring(key.length + 1, cookie.length)
    }
  }

  // If the cookie with the given name is not found, return null
  return null
}
