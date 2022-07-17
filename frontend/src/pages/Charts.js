import React, { useEffect,useState } from 'react'
import Sidercontent from '../components/Sidercontents'
import Topnav from '../components/Topnav'
import {Icon,Dialog,Collapse,Checkbox,Divider} from '@blueprintjs/core'
import {useGlobalContextHook}  from '../hooks/useGlobalContextHook'
import Loading from '../components/Loading'
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';


function Charts() {
  const {lifeData,dispatch} = useGlobalContextHook() 
  const [limit,setLimit] = useState(1)
  const [show,hide] = useState(false)
  const [select,setSelect] = useState("countryName")
  const [graphData,setGraphData] = useState([])
  const [countryData,setCountryData] = useState([])
  const [open,close] = useState(false)
  const [keywords,setKeywords] = useState("")



  useEffect(()=>{
       const getLifeData = async()=>{
        const response = await fetch('http://localhost:4000/api/life/country/62d42af7e3e0c2d38a33e466')
        const json = await response.json()
           if(response.ok) {
                setCountryData(json)
           } 
           if(!response.ok) {
                hide(true)
                 console.log(json.error)
           }
       }
       getLifeData()
  },[dispatch,limit])

  const searchFn = async(e) =>{
          close(true); setKeywords(e)
          dispatch({type:'RESET_DATA'})
          const response = await fetch(`http://localhost:4000/api/life/search?filterType=${select}&keyword=${e}`)
          const json = await response.json()
          if(response.ok) {
            dispatch({type:'SET_DATA',payload:json})
            } 
            if(!response.ok) {
            hide(true)
            console.log(json.error)
       }


  }
 useEffect(()=>{
    if(countryData === undefined || countryData.length <= 0) {} else{
        let graphArry= []
        countryData[0].values.map((value,i )=>{
               graphArry.push({
                   "y":value,"x":"199"+i
               })        
        })

        let dataObj = []
        for(let i=0;i <=10;i++){
            dataObj.push({
                'id':i,
                'data':graphArry
           })
        }
           setGraphData(dataObj)
    }
  
 },[countryData])

useEffect(()=>{
    if(keywords === "" || keywords.length === 0){
         close(false)
    } else {close(true)}
},[keywords])

const fetchCountry = async(id)=>{

    close(false)
    const response = await fetch('http://localhost:4000/api/life/country/'+id)
    const json = await response.json()
       if(response.ok) {
            setCountryData(json)
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
                 </div>
                 {open ?
                    <Collapse isOpen={open} onClose={()=>close(prev=>!prev)} canOutsideClickClose={true}>
                        <div className="popover-name">
                           {lifeData === undefined || lifeData.length <= 0 ? <div/> : 
                            lifeData.map(life=>(
                                  <div style={{margin:10}}>
                                    <Checkbox checked={false}  label={life.countryName}  onClick={()=>fetchCountry(life._id)}/>
                                  </div>
                            ))}
                        </div>
                    </Collapse>
                          : null}

           {countryData === undefined? <div /> : 
            countryData.length <= 0 ? <Loading /> :
            <div className="table" style={{height:'80vh'}} >
               <Line
                    style={{margin:20}}
                    datasetIdKey='id'
                    data={{
                        labels: countryData[0].years,
                        datasets:[{
                                id: 1,
                                label:`${countryData[0].countryName} (${countryData[0].countryCode})`,
                                data: countryData[0].values,
                                borderColor: 'rgb(75, 192, 192)',
                                tension: 0.1
                         },
                        ],
                    }}
                        />
                   
                   </div> 
             }
                   
             </div>
             <Dialog isOpen={show} canOutsideClickClose={true} onClose={()=>hide(prev=>!prev)}>
                 <div>Failed to fetch lfie expectancy</div>
             </Dialog>
    </div>
  )
}

export default Charts