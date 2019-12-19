'use strict'

import React from 'react'
import ReactDOM from 'react-dom/server'

import Error from './error'

import { TreeNode } from '../tree'

function ServerQuarantine({ children }: TreeNode) {
  try {
    const element = <>{children}</>
    ReactDOM.renderToString(element)
    return element
  } catch (error) {
    return <Error error={error} />
  }
}

export { ServerQuarantine }
