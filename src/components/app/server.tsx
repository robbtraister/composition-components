'use strict'

import React from 'react'

import Tree from '../tree'
import { useCompositionContext } from '../../contexts'

const polyfills = {
  assign: '(window.Object&&window.Object.assign)',
  fetch: 'window.fetch',
  includes: 'Array.prototype.includes',
  map: 'window.Map',
  promise: 'window.Promise',
  set: 'window.Set'
}

interface ScriptProps {
  name: string
}

const Script = ({ name }: ScriptProps) => (
  <script type="text/javascript" src={`/dist/${name}.js`} defer />
)

interface ServerAppProps {
  id?: string
  static?: boolean
  'single-page'?: boolean
}

export function App(props: ServerAppProps) {
  const { appName = 'app' } = useCompositionContext()
  const {
    id = 'composition-app',
    static: isStatic = false,
    'single-page': singlePage = false
  } = props

  if (isStatic && singlePage) {
    throw new Error('`static` and `single-page` props are mutually-exclusive')
  }

  return (
    <>
      {!isStatic && (
        <>
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `if(!(${Object.values(polyfills).join(
                '&&'
              )}))document.write('<script type="text/javascript" src="/dist/polyfills.js" defer=""><\\/script>');`
            }}
          />
          <Script name="runtime" />
          <Script name="engine" />
          <Script name={appName} />
        </>
      )}
      <div id={id}>
        <Tree />
      </div>
      {!isStatic && (
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `window.__DATA__=${JSON.stringify({ id, singlePage })}`
          }}
        />
      )}
    </>
  )
}

export default App
