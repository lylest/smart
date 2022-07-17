import React, { useEffect,useState } from 'react'
import Sidercontent from '../components/Sidercontents'
import Topnav from '../components/Topnav'
import {Icon,Dialog,Button} from '@blueprintjs/core'
import {useGlobalContextHook}  from '../hooks/useGlobalContextHook'
import Loading from '../components/Loading'
import ReactCountryFlag from "react-country-flag"

function Home() {
  const {lifeData,dispatch} = useGlobalContextHook() 
  const [limit,setLimit] = useState(15)
  const [show,hide] = useState(false)
  const [select,setSelect] = useState("countryName")


  useEffect(()=>{
       const getLifeData = async()=>{
        const response = await fetch(process.env.REACT_APP_SITE_URL+'/api/life?limit='+limit)
        const json = await response.json()
           if(response.ok) {
                dispatch({type:'SET_DATA',payload:json})
           } 
           if(!response.ok) {
                hide(true)
                 console.log(json.error)
           }
       }
       getLifeData()
  },[dispatch,limit])

  const searchFn = async(e) =>{
          dispatch({type:'RESET_DATA'})
          const response = await fetch(`${process.env.REACT_APP_SITE_URL}/api/life/search?filterType=${select}&keyword=${e}`)
          const json = await response.json()
          if(response.ok) {
            dispatch({type:'SET_DATA',payload:json})
            } 
            if(!response.ok) {
            hide(true)
            console.log(json.error)
       }

  }

 const filterFn = async(filter)=>{
        dispatch({type:'RESET_DATA'})
        const response = await fetch(`${process.env.REACT_APP_SITE_URL}/api/life/filter?criteria=${filter}`)
        const json = await response.json()

        if(response.ok) {
          dispatch({type:'SET_DATA',payload:json})
          } 

          if(!response.ok) {
          hide(true)
          console.log(json.error)
}
 }
  return (
    <div className="main-wrapper">
      <Topnav />
             <div className="sider">
                    <Sidercontent />
             </div>
             <div className="section">
                 <div className="search-bar">
                  <div onClick={()=>searchFn()}><Icon icon="search" color="#666" /></div>
                    <input type="text"  onChange={(e)=>searchFn(e.target.value)} placeholder="Search country" />
                        <select onClick={(e)=>setSelect(e.target.value)}>
                           <option value="countryName">Country name</option>
                           <option value="countryCode">Country code</option>
                        </select>

                        <select onClick={(e)=>filterFn(e.target.value)}>
                           <option value="highest">Highest life expectancy</option>
                           <option value="lowest">Lowest life expectancy</option>
                        </select>

                 </div>

           {lifeData === undefined? <div /> : 
            lifeData.length <= 0 ? <Loading /> :
            <div className="table">
                        <div className="table-header">
                            <div className="country-name" id="country-name">COUNTRY NAME </div>
                            <div className="country-code" id="country-code">CODE </div>
                            <div className="country-code" id="country-code">AVERAGE </div>
                                   <div className="years-row">                                      {                             
                                          lifeData[0].years.map((value,i)=>(
                                            <div className="year-cell" key={i} id="year-cell">{value}</div>
                                          ))
                                          }
                                       </div>   
                           </div> 
                           {lifeData.map((data,i)=>(               
                                  <div className="table-row" key={data._id}>
                                          <div className="country-name">
                                          <ReactCountryFlag 
                                              title={data.countryName}
                                              countryCode={data.countryCode.slice(0, -1)} svg style={{margin:6}} />{data.countryName}</div>
                                          <div className="country-code">{data.countryCode}</div>
                                          <div className="country-code">{data.average.toFixed(2)}</div>
                                      <div className="years-row">
                                          {data.values.map((value,i)=>(
                                             <div className="year-cell" key={i}>{Number(value).toFixed(2)}</div>
                                          ))}

                                      </div>                             
                                  </div>
                                ))
                              }
                      <div className="table-footer">
                          <div className="footer-title">Showing <strong> {lifeData.length} Countries</strong> </div>
                            <div className="footer-next">
                                <div onClick={()=>setLimit(prev=> prev <= 15 ? 15 : prev -15)}>Prev</div>
                            </div>  
                            <div className="footer-next">
                                <div onClick={()=>setLimit(prev=> prev + 15)}>Next</div>
                            </div>                        
                          </div>
                   </div> 
             }
                   
             </div>
             <Dialog isOpen={show} canOutsideClickClose={true} onClose={()=>hide(prev=>!prev)}>
                 <div>Failed to fetch lfie expectancy</div>
             </Dialog>
    </div>
  )
}

export default Home