'use strict'

/* global expect, test */

const f = require('../src')

test('simple test', async () => {
  expect(await f()).toBe(3)
})
