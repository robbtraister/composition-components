'use strict'

import { createContext, useContext } from 'react'

import { render, RenderableProps } from '../components/render'
import { NodeProps } from '../types'

const componentContext = createContext<NodeProps>({
  type: null,
  id: null,
  props: {}
})

export function useComponentContext() {
  const { customContent, ...consumableContext } = useContext(componentContext)
  return consumableContext
}

export function ComponentContext(props: RenderableProps<{}, NodeProps>) {
  const context = useComponentContext()
  return render({ ...props, ...context })
}

export default componentContext
