import { createContext,useReducer } from "react";

export const  GlobalContexts = createContext()

export const updateGlobalContextReducer = (state,action)=>{
    
        switch(action.type){
             case 'SET_DATA':
                return {
                    lifeData:action.payload,
                }
             case 'RESET_DATA':
                return {
                    lifeData:[]    
                }   
             default: 
                return state  
        }
}

export const  GlobalContextProvider =({children})=>{
       const [state, dispatch] = useReducer(updateGlobalContextReducer,{
                  lifeData:[]
       })
       
       return (
        <GlobalContexts.Provider value={{...state,dispatch}}>
             {children}
        </GlobalContexts.Provider>
       )
}
