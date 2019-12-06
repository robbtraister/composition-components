'use strict'

/* global expect, test */

import React from 'react'
import { render } from '@testing-library/react'

import MyComponent from '../src'

test('simple test', async () => {
  const { asFragment } = render(<MyComponent />)
  expect(asFragment()).toMatchSnapshot()
})
