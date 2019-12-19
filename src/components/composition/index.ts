'use strict'

import { ClientComposition } from './client'
import { ServerComposition } from './server'

import { isClient } from '../../utils'

export const Composition = isClient ? ClientComposition : ServerComposition

export default Composition
