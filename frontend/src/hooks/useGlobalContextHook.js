import { useContext } from "react";
import { GlobalContexts } from "../context/GlobalContext";

export const useGlobalContextHook =()=>{
       const globalContext = useContext(GlobalContexts)
       if(!globalContext) {
        throw Error ("GlobalContext  must be used inside global context provider")
       }

       return globalContext
}