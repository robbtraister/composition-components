'use strict'

import React, { useEffect, useState } from 'react'
import { BrowserRouter, useLocation } from 'react-router'

import { Common } from './common'

import { TreeNode, TreeProps } from '../tree'

interface Resolution {
  tree: TreeNode
  pageContent: object
}

interface ClientCompositionProps extends TreeProps {
  resolve?: (String) => Promise<{ tree: TreeNode; pageContent: object }>
  'single-page'?: boolean
}

function LocationWatcher(props: ClientCompositionProps) {
  const { 'single-page': singlePage, resolve, ...contextValue } = props

  const [{ tree, pageContent }, setPage] = useState<Resolution>({
    tree: props.tree,
    pageContent: props.pageContent
  })
  const location = useLocation()

  let isInitialized = false
  useEffect(() => {
    let doUpdate = true

    const awaitResolve = async () => {
      const page = await resolve(location.pathname)
      doUpdate && setPage(page)
    }
    isInitialized && awaitResolve()
    isInitialized = true

    return () => {
      doUpdate = false
    }
  }, [location])

  return (
    <Common
      value={{
        ...contextValue,
        tree,
        pageContent
      }}
    />
  )
}

export function ClientComposition(props: ClientCompositionProps) {
  const { 'single-page': singlePage, resolve } = props

  const forceRefresh = !singlePage || !resolve

  return (
    <BrowserRouter forceRefresh={forceRefresh}>
      <LocationWatcher {...props} />
    </BrowserRouter>
  )
}

export default ClientComposition
