'use strict'

/* global describe, expect, test */

import PropTypes from 'prop-types'
import React from 'react'
import { render } from '@testing-library/react'

import App from '../../src/components/app'
import { Content, useContent } from '../../src/components/content'

function Display({ content }) {
  return <div>{content}</div>
}

Display.propTypes = {
  content: PropTypes.string
}

function ContentComponent(props) {
  return <Content {...props} component={Display} />
}

function ContentHook(props) {
  const content = useContent(props)
  return <Display content={content} />
}

function ContentRender(props) {
  return <Content {...props} render={Display} />
}

function getComponent(type) {
  switch (type) {
    case 'content-hook':
      return ContentHook
    case 'content-component':
      return ContentComponent
    case 'content-render':
      return ContentRender
  }
}

async function getContent({ source, query }) {
  return `${source}: ${query.data}`
}

const node = {
  id: 'abc',
  props: {
    source: 'source',
    query: { data: 'data' }
  }
}

async function testContentComponent(componentType) {
  const promises = []
  const result = render(
    <App
      getComponent={getComponent}
      getContent={getContent}
      node={{ ...node, type: componentType }}
      promises={promises}
    />
  )

  await Promise.all(promises)
  return result
}

describe('Content', () => {
  test('Content Component', async () => {
    const { asFragment } = await testContentComponent('content-component')
    expect(asFragment()).toMatchSnapshot()
  })

  test('Content Hook', async () => {
    const { asFragment } = await testContentComponent('content-hook')
    expect(asFragment()).toMatchSnapshot()
  })

  test('Content Render', async () => {
    const { asFragment } = await testContentComponent('content-render')
    expect(asFragment()).toMatchSnapshot()
  })
})
