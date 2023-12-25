import { ReactNode } from 'react'

export interface MenuPathProps {
  id?: number
  name: string
  type: 'item' | 'group' | 'collapse'
  path?: string
  children?: MenuPathProps[]
  icon?: ReactNode
}

export const listMenuRoutes: MenuPathProps[] = [
  {
    name: "Assign API's Feature For Internal System",
    path: '/assign-api-feature-management',
    type: 'item',
  },
  {
    name: "API's Feature Management",
    path: '/api-feature-management',
    type: 'item',
  },
  {
    name: 'Outbound Third Party Authen Config',
    path: '/outbound-management',
    type: 'item',
  },
  {
    name: "Third Party's API Management",
    path: '/third-party-management',
    type: 'item',
  },
  {
    name: 'Decode Management',
    path: '/decode-management',
    type: 'item',
  },
  {
    name: 'Format Management',
    path: '/format-management',
    type: 'item',
  },
  {
    name: 'Action Log',
    type: 'collapse',
    children: [
      { name: 'Action Log Process', path: '/action-log-process', type: 'item' },
      { name: 'Action Log History', path: '/action-log-history', type: 'item' },
    ],
  },
  {
    name: 'Report',
    type: 'collapse',
    children: [
      {
        name: 'Summary Compare Request Report',
        path: '/time-compare-report',
        type: 'item',
      },
      {
        name: 'Summary Report',
        path: '/total-summary-report',
        type: 'item',
      },
    ]
  },
]
