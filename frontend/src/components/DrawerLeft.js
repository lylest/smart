import React from 'react'
import {Drawer,DrawerSize,Position} from '@blueprintjs/core'
import {Sidercontents} from './Sidercontents'

export default function DrawerLeft() {
  return (
    <Drawer isOpen={open} 
    title="Menu"
    size={DrawerSize.STANDARD}
    Position={Position.LEFT_BOTTOM}
    canOutsideClickClose={true} onClose={()=>close(prev=>!prev)}>

        <Sidercontents />
        </Drawer>
  )
}
