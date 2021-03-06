'use strict'

import path from 'path'

import React from 'react'

import { render, RenderProps } from '../render'
import { useResource } from '../resource'

import { useRootContext } from '../../contexts/root'

export const StyledComponents = 'composition:styled-components'

const placeholder = `<${StyledComponents}></${StyledComponents}>`

export interface StylesProps extends RenderProps<{}> {
  amp?: boolean
  inline?: boolean
}

export const useStyles = () => {
  const { appStyles = 'app', formatStyles = 'site' } = useRootContext()
  const formatStylesContent = useResource({
    name: path.join('build', 'dist', `${formatStyles}.css`)
  })
  const appStylesContent = useResource({
    name: path.join('build', 'dist', `${appStyles}.css`)
  })

  return `${formatStylesContent || ''}${appStylesContent || ''}${placeholder}`
}

const StyleTag = ({ styles, ...props }: { styles: string }) => (
  <style {...props} dangerouslySetInnerHTML={{ __html: styles }} />
)

const InlineStyles = ({ amp, ...props }) => {
  const styles = useStyles()

  return render({
    // default implementation; can be overridden
    children: StyleTag,
    ...props,
    'amp-custom': amp ? '' : null,
    styles
  })
}

const StyleLink = props => <link {...props} rel="stylesheet" type="text/css" />

const LinkStyles = props => {
  const { appStyles = 'app', formatStyles = 'site' } = useRootContext()

  return (
    <>
      <StyleLink
        id="composition-format-styles"
        {...props}
        href={`/dist/${formatStyles}.css`}
      />
      <StyleLink
        id="composition-app-styles"
        {...props}
        href={`/dist/${appStyles}.css`}
      />
      <style>
        <StyledComponents />
      </style>
    </>
  )
}

export const Styles = ({
  amp = false,
  inline,
  ...passThroughProps
}: StylesProps) => {
  if (amp && inline === false) {
    throw new Error('`amp` implies that `inline` is true')
  }
  return amp || inline ? (
    <InlineStyles {...passThroughProps} amp={amp} />
  ) : (
    <LinkStyles {...passThroughProps} />
  )
}

export default Styles
