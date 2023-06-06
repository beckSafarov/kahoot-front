import { useContext } from "react";
import {NewKahootContext} from '@/Context/NewKahootContext'
import { UserContext } from "@/Context/UserContext";


export const useNewKahootContext = () => useContext(NewKahootContext)
export const useUserContext = ()=>useContext(UserContext)
/**
 * /Users/begzodsafarov/Desktop/coding/work-projects/kahoot-front/src/Context/DiscoverKahootsContext/index.js
 * /Users/begzodsafarov/Desktop/coding/work-projects/kahoot-front/src/Context/NewKahootContext/index.js
 */