import React from 'react'
import logo from '../img/logo.svg'
import {Menu,MenuItem,Icon} from '@blueprintjs/core'
import {useNavigate} from 'react-router-dom'

function Sidercontent() {
  const navigate = useNavigate()
  return (
    <div className="sider-content-wrapper">
             <h2>Smart Africa</h2>
            
        <Menu className="menu" >
            <MenuItem  onClick={()=>navigate('/Home')}icon="grid-view" text=" Dashboard"  className="menu-item"/>
            <MenuItem  onClick={()=>navigate('/Charts')}icon=" grouped-bar-chart" text=" Charts"  className="menu-item"/>
        </Menu>

      
    </div>
  )
}

export default Sidercontent