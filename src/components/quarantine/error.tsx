'use strict'

import PropTypes from 'prop-types'
import React from 'react'

import { useComponentContext } from '../../contexts/component'

function Error(props) {
  const { id, type } = useComponentContext()
  const { error = {} } = props
  return (
    <div
      data-error-component={type}
      data-error-id={id}
      data-error-message={error.message || error}
    />
  )
}

Error.propTypes = {
  error: PropTypes.object.isRequired
}

export default Error
