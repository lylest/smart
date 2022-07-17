import React from 'react'
import {Spinner} from '@blueprintjs/core'
function Loading() {
  return (
    <div className="loading-wrapper">
        <div className="loading-div">
        <Spinner  size={30} intent="primary" />
        </div>
    </div>
  )
}

export default Loading