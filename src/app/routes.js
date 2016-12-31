import React from 'react'
import { Route, IndexRoute } from 'react-router'

import Homepage from 'pages/Homepage'

export default function getRoutes () {
  return (
    <IndexRoute component={Homepage} />
  )
}
