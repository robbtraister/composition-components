'use strict'

import React from 'react'

import { Tree, TreeProps } from '../tree'

import compositionContext from '../../contexts/composition'

function descendants({ children }) {
  const childArray = [].concat(children || [])
  return childArray.concat(...childArray.map(descendants))
}

export interface CompositionProps extends TreeProps {
  appName?: string
  appStyles?: string
  siteStyles?: string
}

export function Common({
  children,
  value
}: {
  children?: React.ReactNode
  value: CompositionProps
}) {
  return (
    <compositionContext.Provider
      value={{
        ...value,
        elements: descendants({ children: value.tree })
      }}>
      {children || <Tree />}
    </compositionContext.Provider>
  )
}
