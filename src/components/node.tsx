'use strict'

import debugModule from 'debug'
import React, { memo, useContext } from 'react'

import { getContentKey } from './content'
import { Quarantine } from './quarantine'

import componentContext from '../contexts/component'
import rootContext from '../contexts/root'
import { NodeProps, ContentParams } from '../types'

const debug = debugModule('composition:components:node')

export const Node = memo(function Node(node: NodeProps) {
  const {
    props = {},
    children = [],
    customContent = {},
    type,
    id,
    Component
  } = node

  const { getContent, format } = useContext(rootContext)

  debug('rendering component:', {
    format,
    type,
    id,
    Component,
    props
  })

  const getComponentContent = async (params: ContentParams) => {
    const data = await getContent(params)
    const key = getContentKey(params)
    return Object.assign({}, data, customContent[key])
  }

  const componentContextValue = { ...node, getContent: getComponentContent }

  return (
    Component && (
      <componentContext.Provider value={componentContextValue}>
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
