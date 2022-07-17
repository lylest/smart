import React,{useState} from 'react'
import {Icon,Drawer,DrawerSize,Position} from '@blueprintjs/core'
import Sidercontents from './Sidercontents'

function Topnav() {
    const [open,close] = useState()

  return (
   <div>
    <div className="topnav">
        <h2>Smart Africa</h2>
        <div className="menu-icon-right" onClick={()=>close(prev=>!prev)}> <Icon icon="menu"  color="#f8f8f8" /></div>
    </div>

    <Drawer isOpen={open} 
            title="Book infomation"
            size={DrawerSize.STANDARD}
            canOutsideClickClose={true} onClose={()=>close(prev=>!prev)}>

        <Sidercontents />
        </Drawer>
   </div> 
    
  )
}

export default Topnav