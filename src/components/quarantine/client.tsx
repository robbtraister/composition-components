'use strict'

import React from 'react'

import Error from './error'

function clientQuarantine(Component) {
  return class QuarantineComponent extends React.Component<{}, { error: any }> {
    static displayName: string

    constructor(props) {
      super(props)
      this.state = { error: null }
    }

    componentDidCatch(error) {
      this.setState({ error })
    }

    render() {
      return this.state.error ? (
        <Error error={this.state.error} />
      ) : (
        <Component {...this.props} />
      )
    }
  }
}

export { clientQuarantine }
