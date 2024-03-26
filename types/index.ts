export interface SidebarLink {
  imgURL: string
  route: string
  label: string
}

export type Property = {
  id: number
  code: string //unique
  name: string
  totalRoomInHotel: number
  roomRevenue: number
  fnbRevenue: number
  otherRevenue: number
  occ: number
  adr: number
  hotelRoom: number
  availableRoom: number
  clusterId: number
  revenue: {
    occupiedRoom: number
    groupRoom: number
    transientRoom: number
  }

  //navigate
  cluster: Cluster
}

export type Cluster = {
  id: number
  name: string

  //navigate
  properties: Property[]
}

export type User = {
  username: string
  name: string
  avatarUrl: string
}

export type ReservationForecastData = { date: string; totalOcc: number; arrRooms: number; depRooms: number }[]
export type RevenueBarChartData = {
  name: string
  occupiedRoom: number
  groupRoom: number
  transientRoom: number
}[]
