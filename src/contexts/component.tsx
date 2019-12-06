'use strict'

import React, { createContext, useContext } from 'react'

const componentContext = createContext<{
  type?: string
  id: any
  props?: object
  getContent?: (cp: ContentParams) => ContentResult
}>({
  type: null,
  id: null,
  props: {},

  getContent: () => null
})

function useComponentContext() {
  return useContext(componentContext)
}

function ComponentContext(props) {
  const { component: Component, render } = props
  const context = useComponentContext()

  if (Component) {
    return <Component context={context} />
  } else if (render) {
    return render({ context })
  }
}

export default componentContext
export { componentContext, ComponentContext, useComponentContext }
