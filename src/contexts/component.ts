'use strict'

import { createContext, useContext } from 'react'

import { render, RenderableProps } from '../components/render'
import { ContentFetcher, NodeProps } from '../types'

export type ComponentProps = NodeProps & { getContent: ContentFetcher }

const componentContext = createContext<ComponentProps>({
  type: null,
  id: null,
  props: {},

  getContent: () => null
})

export function useComponentContext() {
  const { getContent, ...consumableContext } = useContext(componentContext)
  return consumableContext
}

export function ComponentContext(props: RenderableProps<{}, NodeProps>) {
  const context = useComponentContext()
  return render({ ...props, ...context })
}

export default componentContext
