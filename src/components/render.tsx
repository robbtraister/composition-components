'use strict'

import React from 'react'

export interface RenderProps<T> {
  children?: React.ReactNode
  component?: React.ComponentType<T>
  render?: (t: T) => React.ReactElement | React.ReactElement[] | null
}

export type RenderableProps<
  InputProps extends object,
  PassthroughProps extends object
> = InputProps & RenderProps<PassthroughProps>

export function render(props: RenderableProps<any, any>) {
  const { children, component: Component, render, ...passThroughProps } = props

  if (Component) {
    return <Component {...passThroughProps} />
  } else if (render) {
    return render(passThroughProps)
  } else if (children) {
    return []
      .concat(children || [])
      .map((Child, index) => <Child key={index} {...passThroughProps} />)
  }
}

export default render
