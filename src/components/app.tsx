'use strict'

import PropTypes from 'prop-types'
import React from 'react'

import withQuarantine from './quarantine'
import appContext from '../contexts/app'
import componentContext from '../contexts/component'

const isClient = typeof process === 'undefined'

const identity = x => x

function descendants({ children }) {
  const childArray = [].concat(children || [])
  return childArray.concat(...childArray.map(descendants))
}

function App({
  node,
  promises = [],
  quarantine = isClient,
  Root = React.Fragment,
  getComponent,
  getContent
}) {
  const wrapComponent = quarantine ? withQuarantine : identity

  const componentCache = {}
  function getCachedComponent(node) {
    const { type } = node
    if (!componentCache[type]) {
      componentCache[type] = wrapComponent(getComponent(type))
    }
    return componentCache[type]
  }

  const contentCache = {}
  function getCachedContent(contentParams: ContentParams) {
    const { source, query, filter } = contentParams
    const key = JSON.stringify({ source, query, filter })
    if (!contentCache[key]) {
      const contentEntry = (contentCache[key] = {
        cached: undefined,
        fetched: getContent(contentParams).then(content => {
          contentEntry.cached = content
          return content
        })
      })
      promises.push(contentEntry.fetched)
    }
    return contentCache[key]
  }

  function Node(node) {
    const Component = getCachedComponent(node)
    const { props = {} } = node
    const { children = [] } = props

    const componentContextValue = { ...node, getContent: getCachedContent }

    return (
      <componentContext.Provider value={componentContextValue}>
        <Component {...props}>
          {[].concat(children || []).map(child => (
            <Node key={child.id} {...child} />
          ))}
        </Component>
      </componentContext.Provider>
    )
  }
  Node.propTypes = {
    children: PropTypes.node
  }

  const appContextValue = {
    tree: node,
    elements: descendants({ children: node }),
    promises,
    getContent: getCachedContent
  }

  return (
    <appContext.Provider value={appContextValue}>
      <Root>
        <Node {...node} />
      </Root>
    </appContext.Provider>
  )
}

App.propTypes = {
  node: PropTypes.shape({
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    props: PropTypes.object
  }),
  promises: PropTypes.array,
  quarantine: PropTypes.bool,
  Root: PropTypes.elementType,
  getComponent: PropTypes.func,
  getContent: PropTypes.func
}

export default App
export { App }
