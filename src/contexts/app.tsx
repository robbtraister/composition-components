'use strict'

import React, { createContext, useContext } from 'react'

const appContext = createContext<{
  tree: object
  elements: object[]
  promises: any[]
  getContent?: (cp: ContentParams) => ContentResult
}>({
  tree: null,
  elements: [],
  promises: [],

  getContent: () => null
})

function useAppContext() {
  const { promises, ...consumableAppContext } = useContext(appContext)
  return consumableAppContext
}

function AppContext(props) {
  const { component: Component, render } = props
  const context = useAppContext()

  if (Component) {
    return <Component context={context} />
  } else if (render) {
    return render({ context })
  }
}

export default appContext
export { appContext, AppContext, useAppContext }
