'use strict'

import { ClientStyles } from './client'
import { ServerStyles } from './server'

import { isClient } from '../../utils'

export const Styles = isClient ? ClientStyles : ServerStyles

export default Styles
