'use strict'

import React from 'react'
import ReactDOM from 'react-dom/server'

import Error from './error'

function serverQuarantine(Component): React.FunctionComponent {
  return props => {
    try {
      const element = <Component {...props} />
      ReactDOM.renderToString(element)
      return element
    } catch (error) {
      return <Error error={error} />
    }
  }
}

export { serverQuarantine }
