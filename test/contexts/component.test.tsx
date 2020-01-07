'use strict'

/* global describe, expect, test */

import PropTypes from 'prop-types'
import React from 'react'
import { render } from '@testing-library/react'

import Composition from '../../src/components/composition'
import {
  ComponentContext,
  useComponentContext
} from '../../src/contexts/component'

function Display({ context }) {
  return <div>{context.id}</div>
}

Display.propTypes = {
  context: PropTypes.shape({
    id: PropTypes.string
  })
}

const ContextChildren = () => {
  return <ComponentContext>{Display}</ComponentContext>
}

const ContextComponent = () => {
  return <ComponentContext component={Display} />
}

const ContextHook = () => {
  const context = useComponentContext()
  return <Display context={context} />
}

const ContextRender = () => {
  return <ComponentContext render={Display} />
}

function getComponent({ type }) {
  switch (type) {
    case 'context-children':
      return ContextChildren
    case 'context-component':
      return ContextComponent
    case 'context-hook':
      return ContextHook
    case 'context-render':
      return ContextRender
  }
}

const tree = {
  id: 'abc'
}

function testContextComponent(componentType) {
  return render(
    <Composition
      getComponent={getComponent}
      tree={{ ...tree, type: componentType }}
    />
  )
}

describe('Context', () => {
  test('Context Children', async () => {
    const { asFragment } = testContextComponent('context-children')
    expect(asFragment()).toMatchSnapshot()
  })

  test('Context Component', async () => {
    const { asFragment } = testContextComponent('context-component')
    expect(asFragment()).toMatchSnapshot()
  })

  test('Context Hook', async () => {
    const { asFragment } = testContextComponent('context-hook')
    expect(asFragment()).toMatchSnapshot()
  })

  test('Context Render', async () => {
    const { asFragment } = testContextComponent('context-render')
    expect(asFragment()).toMatchSnapshot()
  })
})