export interface NodeProps {
  id: string
  type: string
  props?: object
  children?: object
  Component?: React.ComponentType
}

export type ContentFetcher = (ContentParams) => object
