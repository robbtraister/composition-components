'use strict'

import React from 'react'
import { StaticRouter } from 'react-router'

import { Common } from './common'

import { TreeProps } from '../tree'

interface CompositionProps extends TreeProps {
  children?: React.ReactNode
  location?: string
  projectRoot?: string
  routerContext?: { url?: string }
}

export function Composition(props: CompositionProps) {
  const { children, location, routerContext = {}, ...contextValue } = props
  return (
    <StaticRouter location={location} context={routerContext}>
      <Common value={contextValue}>{children}</Common>
    </StaticRouter>
  )
}

export default Composition
