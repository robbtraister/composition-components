'use strict'

import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

import React, { useContext } from 'react'

import compositionContext from '../../contexts/composition'

const readFile = promisify(fs.readFile.bind(fs))

const StyledComponents = 'styled-components'

interface StylesProps {
  inline?: boolean
}
interface StyleProps {
  name: string
}

const cachedFiles = {}
function getCachedFile(filePath) {
  cachedFiles[filePath] = cachedFiles[filePath] || readFile(filePath)
  return cachedFiles[filePath]
}

export const ServerStyles = ({ inline, ...props }: StylesProps) => {
  const { cache = {}, projectRoot } = useContext(compositionContext)

  const Style = inline
    ? function Style({ name }: StyleProps) {
        const key = JSON.stringify({ styles: name })
        if (key in cache) {
          return cache[key]
        }
        cache[key] = getCachedFile(
          path.join(projectRoot, 'build', 'dist', `${name}.css`)
        )
          .then(data => {
            cache[key] = (
              <style {...props} dangerouslySetInnerHTML={{ __html: data }} />
            )
          })
          .catch(() => {
            cache[key] = null
          })
        return null
      }
    : function Style({ name }: StyleProps) {
        return <link {...props} href={`/dist/${name}.css`} rel="stylesheet" />
      }

  return (
    <>
      <Style name="site" />
      <Style name="app" />
      <StyledComponents />
    </>
  )
}

export default ServerStyles
