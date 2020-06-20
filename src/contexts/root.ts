'use strict'

import { createContext, useContext } from 'react'

import { render, RenderableProps } from '../components/render'
import { RootProps } from '../components/root/types'

const rootContext = createContext<RootProps>({})

export function useRootContext() {
  const {
    cache,
    getComponent,
    getContent,
    getResource,
    ...consumableContext
  } = useContext(rootContext)
  return consumableContext
}

export function RootContext(props: RenderableProps<{}, RootProps>) {
  const context = useRootContext()
  return render({ ...props, ...context })
}

export default rootContext
