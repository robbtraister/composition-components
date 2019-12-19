'use strict'

import { ClientQuarantine } from './client'
import { ServerQuarantine } from './server'

import { isClient } from '../../utils'

export const Quarantine = isClient ? ClientQuarantine : ServerQuarantine

export default Quarantine
