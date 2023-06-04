import { useContext } from "react";
import {NewKahootContext} from '@/Context/NewKahootContext'
import { UserContext } from "@/Context/UserContext";

export const useNewKahootContext = () => useContext(NewKahootContext)


export const useUserContext = ()=>useContext(UserContext)