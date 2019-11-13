'use strict'

import cookieParser from 'cookie-parser'
import csurf from 'csurf'
import express from 'express'

import api from './api'
import assets from './assets'
import auth from './auth'
import render from './render'

export default function router (options: Options) {
  const router = express()

  router.use(assets(options))

  router.use(cookieParser())

  // don't serve under '/auth' because we need to run authorization on all endpoints
  router.use(auth(options))

  router.use('/api',
    csurf({ cookie: true }),
    api(options)
  )

  // reserved paths that should not be rendered
  router.use(
    ['/api', '/gql'],
    (req, res, next) => { res.sendStatus(404) }
  )

  router.use(render(options))

  return router
}
