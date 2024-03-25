export interface SidebarLink {
  imgURL: string
  route: string
  label: string
}

export type Property = {
  id: number
  code: string //unique
  clusterId: number

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
