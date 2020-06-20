export interface NodeProps {
  id: string
  type: string
  props?: object
  customContent?: object
  children?: object
  Component?: React.ComponentType
}

export interface ContentParams {
  source: string
  query: object
  filter?: object
}

export type ContentFetcher = (params: ContentParams) => object | Promise<object>
