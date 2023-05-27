import { useContext } from "react";
import {NewKahootContext} from '@/Context/NewKahootContext'

export const useNewKahootContext = ()=>{
  return useContext(NewKahootContext)
}