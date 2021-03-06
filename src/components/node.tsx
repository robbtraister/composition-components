'use strict'

import debugModule from 'debug'
import React, { memo, useContext } from 'react'

import { Quarantine } from './quarantine'

import componentContext from '../contexts/component'
import rootContext from '../contexts/root'
import { NodeProps } from '../types'

const debug = debugModule('composition:components:node')

export const Node = memo(function Node(node: NodeProps) {
  const { props = {}, children = [], type, id, Component } = node

  const { format } = useContext(rootContext)

  debug('rendering component:', {
    format,
    type,
    id,
    Component,
    props
  })

  return (
    Component && (
      <componentContext.Provider value={node}>
        <Quarantine>
          <Component {...props}>
            {[]
              .concat(children || [])
              .filter(({ Component }) => Component)
              .map((child, index) => (
                <Node key={child.id || index} {...child} />
              ))}
          </Component>
        </Quarantine>
      </componentContext.Provider>
    )
  )
})

export default Node
