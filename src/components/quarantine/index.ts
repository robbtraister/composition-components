'use strict'

import { clientQuarantine } from './client'
import { serverQuarantine } from './server'

const whichQuarantine =
  typeof process === 'undefined' ? clientQuarantine : serverQuarantine

function withQuarantine(Component) {
  const QuarantinedComponent = whichQuarantine(Component)

  for (const key in Component) {
    QuarantinedComponent[key] = Component[key]
  }
  QuarantinedComponent.displayName = `Quarantine(${Component.displayName ||
    Component.name})`

  return QuarantinedComponent
}

export default withQuarantine
