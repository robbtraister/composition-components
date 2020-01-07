'use strict'

/* global expect, test */

import React from 'react'
import { renderToString } from 'react-dom/server'

import App from '../../src/components/app'
import Composition from '../../src/components/composition'
import Styles from '../../src/components/styles'
import { TreeNode } from '../../src/components/tree'

import { useComponentContext } from '../../src/contexts/component'

const x = 3
function Fail() {
  if (x === 3) {
    throw new Error('fail')
  }
  return <React.Fragment />
}

function Success({ children }: { children: React.ElementType }) {
  const { id, type } = useComponentContext()
  return (
    <div data-type={type} data-id={id}>
      {children}
    </div>
  )
}

function getComponent({ type }: TreeNode): React.ComponentType {
  return type === 'fail' ? Fail : Success
}

const tree = {
  type: 'div',
  id: 'abc',
  children: [
    {
      type: 'fail',
      id: 'def',
      children: [
        {
          type: 'div',
          id: 'ghi'
        }
      ]
    },
    {
      type: 'div',
      id: 'xyz'
    }
  ]
}

test('Page Component', () => {
  const html = renderToString(
    <Composition
      getComponent={getComponent}
      tree={tree}
      output="default"
      quarantine>
      <html>
        <head>
          <title>test</title>
          <Styles />
        </head>
        <body>
          <App single-page />
        </body>
      </html>
    </Composition>
  )
  expect(html).toMatchSnapshot()
})

test('Inline Styles', () => {
  const html = renderToString(
    <Composition
      getComponent={getComponent}
      tree={tree}
      projectRoot=""
      output="default"
      quarantine>
      <html>
        <head>
          <title>test</title>
          <Styles inline />
        </head>
        <body>
          <App single-page />
        </body>
      </html>
    </Composition>
  )
  expect(html).toMatchSnapshot()
})