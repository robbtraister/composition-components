'use strict'

import { useContext, useState } from 'react'

import { render, RenderableProps } from './render'

import componentContext from '../contexts/component'
import rootContext from '../contexts/root'

import { ContentParams } from '../types'

export interface CachedPromise<V extends object = object> extends Promise<V> {
  value?: V
  expires?: number
}

export interface ContentStruct {
  content: any
}

export const getContentKey = ({ source, query }: ContentParams) =>
  JSON.stringify({ content: { source, query } })

export function useContent(params: ContentParams) {
  const key = getContentKey(params)

  const { cache = {} } = useContext(rootContext)
  const { getContent } = useContext(componentContext)

  /**
   * cache entry will always be some combination of the following (possibly both):
   * 1. a Promise
   * 2. an Object with `data` (and possibly, `expires`) property
   */

  const { value, expires } = cache[key] || {}
  const [content, setContent] = useState(value)

  if (!(key in cache) || expires < Date.now()) {
    const contentPromise: CachedPromise = Promise.resolve(getContent(params))

    cache[key] = Object.assign(
      contentPromise.then(value => {
        cache[key].value = value
        setContent(value)
        return value
      }),
      // preserve cached data until update is resolved
      { value },
      // preserve cached props provided by custom getContent implementation
      contentPromise
    )
  }

  return content
}

export function Content(props: RenderableProps<ContentParams, ContentStruct>) {
  const { source, query, filter, ...passThroughProps } = props
  const content = useContent({ source, query, filter })

  return render({ ...passThroughProps, content })
}

export default Content
