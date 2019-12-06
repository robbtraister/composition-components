'use strict'

/* global expect, test */

import PropTypes from 'prop-types'
import React from 'react'
import { render } from '@testing-library/react'

import App from '../../src/components/app'
import { useComponentContext } from '../../src/contexts/component'

function Fail(props) {
  throw new Error('fail')
}

function Success({ children }) {
  const { id, type } = useComponentContext()
  return (
    <div data-type={type} data-id={id}>
      {children}
    </div>
  )
}

Success.propTypes = {
  children: PropTypes.node
}

function getComponent(type) {
  return type === 'fail' ? Fail : Success
}

const node = {
  type: 'div',
  id: 'abc',
  props: {
    children: [
      {
        type: 'fail',
        id: 'def',
        props: {
          children: [
            {
              type: 'div',
              id: 'ghi'
            }
          ]
        }
      },
      {
        type: 'div',
        id: 'xyz'
      }
    ]
  }
}

test('Quarantine Component', () => {
  const { asFragment } = render(
    <App getComponent={getComponent} node={node} quarantine />
  )
  expect(asFragment()).toMatchSnapshot()
})
