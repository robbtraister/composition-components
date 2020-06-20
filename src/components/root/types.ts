import { ContentFetcher, NodeProps } from '../../types'
import { Resolution, TreeProps } from '../tree'

export type Resolver = (string) => Promise<Resolution>
export type ResourceFetcher = (name: string, encoding?: string) => any

export interface CommonRootProps extends TreeProps {
  appName?: string
  appStyles?: string
  cache?: object
  elements?: NodeProps[]
  format?: string
  formatStyles?: string
  location?: string

  getContent?: ContentFetcher
  getResource?: ResourceFetcher
}

export interface ClientRootProps extends CommonRootProps {
  forceRefresh?: boolean
  resolve?: Resolver
  'single-page'?: boolean
}

export interface ServerRootProps extends CommonRootProps {
  children?: React.ReactNode
  routerContext?: { url?: string }
}

export type RootProps = ClientRootProps | ServerRootProps
