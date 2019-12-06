interface ContentParams {
  source: string
  query: object
  filter?: object
}

interface ContentComponentParams extends ContentParams {
  component?: React.ComponentType<{ content: any }>
  render?: Function
}

interface ContentResult {
  cached: object
  fetched: Promise<object>
}
