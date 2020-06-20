'use strict'

import React from 'react'

import { render } from '../render'

import { useRootContext } from '../../contexts/root'

export interface TitleProps {
  title: string
}

const DefaultTitle = ({ title }: { title: string }) => <title>{title}</title>

export const Title = props => {
  const { title } = useRootContext()
  return render({
    // default implementation; can be overridden
    children: DefaultTitle,
    title,
    ...props
  })
}

export default Title
