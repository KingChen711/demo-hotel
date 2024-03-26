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

export type TotalCountAndSale = {
  total_actual: CountAndSale
  adults_actual: CountAndSale
  children_actual: CountAndSale
}

export type CountAndSale = {
  count: number
  percentage_count: number
  sales: number
  percentage_sales: number
}

export type RecordMeals = {
  [key: string]: {
    room: string
    guest_names: string
    package_code: string
    count: number
    pax: string
    remark: string
  }
}

export type RecordTimeInDay = {
  rowId?: string
  total: TotalCountAndSale
  records: RecordMeals
}

export type ReportDetail = {
  rowId?: string
  report_date: string
  total: TotalCountAndSale
  outlet: [
    {
      rowId?: string
      outlet_code: string
      outlet_name: string
      total: TotalCountAndSale
      breakfast: RecordTimeInDay
      lunch: RecordTimeInDay
      dinner: RecordTimeInDay
    }
  ]
}
