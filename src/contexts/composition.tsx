'use strict'

import React, { createContext, useContext } from 'react'

import { TreeNode } from '../components/tree'

const compositionContext = createContext<{
  cache?: object
  elements?: TreeNode[]
  pageContent?: object
  projectRoot?: string
  quarantine?: boolean
  tree?: TreeNode

  getComponent?: (node) => React.ComponentType
  getContent?: (cp: ContentParams) => ContentResult
}>({
  getComponent: () => React.Fragment,
  getContent: () => null
})

export function useCompositionContext() {
  const {
    cache,
    projectRoot,
    quarantine,
    ...consumableAppContext
  } = useContext(compositionContext)
  return consumableAppContext
}

export function CompositionContext(props) {
  const { component: Component, render } = props
  const context = useCompositionContext()

  if (Component) {
    return <Component context={context} />
  } else if (render) {
    return render({ context })
  }
}

export default compositionContext
