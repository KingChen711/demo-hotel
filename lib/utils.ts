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

export function formatNumber(num: number) {
  return Number(num.toFixed(2)).toLocaleString('en-US')
}
