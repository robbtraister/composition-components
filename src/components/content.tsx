'use strict'

import React, { useEffect, useState } from 'react'
import { useComponentContext } from '../contexts/component'

function useContent(props: ContentParams) {
  const { getContent } = useComponentContext()
  const { cached, fetched } = getContent(props)
  const [content, setContent] = useState(cached)

  useEffect(() => {
    let doUpdate = true
    const awaitFetch = async () => {
      const updated = await fetched
      doUpdate && setContent(updated)
    }
    fetched && awaitFetch()

    return () => {
      doUpdate = false
    }
  }, [fetched])

  return content
}

function Content(props: ContentComponentParams) {
  const { component: Component, render, ...contentProps } = props
  const content = useContent(contentProps)

  if (Component) {
    return <Component content={content} />
  } else if (render) {
    return render({ content })
  }
}

export default Content
export { Content, useContent }
