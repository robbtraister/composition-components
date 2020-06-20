'use strict'

import React from 'react'
import { StaticRouter } from 'react-router'

import { CommonRoot } from './common'
import { ServerRootProps } from './types'

export function Root(props: ServerRootProps) {
  const { children, routerContext = {}, ...contextValue } = props
  return (
    <StaticRouter location={props.location} context={routerContext}>
      <CommonRoot value={contextValue}>{children}</CommonRoot>
    </StaticRouter>
  )
}

export default Root
