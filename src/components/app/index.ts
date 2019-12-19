'use strict'

import { ClientApp } from './client'
import { ServerApp } from './server'

import { isClient } from '../../utils'

export const App = isClient ? ClientApp : ServerApp

export default App
