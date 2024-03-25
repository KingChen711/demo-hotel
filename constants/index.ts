import { SidebarLink } from '@/types'

export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: '/assets/icons/home.svg',
    route: '/',
    label: 'Home'
  },
  {
    imgURL: '/assets/icons/property.svg',
    route: '/actual-data',
    label: 'Actual Data'
  },
  {
    imgURL: '/assets/icons/reservation.svg',
    route: '/reservation-forecast',
    label: 'Reservation Forecast'
  },
  {
    imgURL: '/assets/icons/calendar.svg',
    route: '/period-detail',
    label: 'Period Detail'
  }
]
