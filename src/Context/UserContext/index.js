import { createContext, useReducer } from "react";
const initialState = {
  userInfo:{
    id: "",
    email: "",
    firstName: "",
    lastName: "",
  },
  kahoots: [],
  setData: (x)=>void 0,
  addKahoot: (x)=>void 0,
  deleteKahoot: (x)=>void 0,
}

export const UserContext = createContext(initialState)

const UserReducer = (state, action) => {
  switch (action.type) {
    case 'setData':
      return { ...state, ...action.payload }
    case 'addNewKahoot':
      const updatedKahoots = [...state.kahoots, action.payload.newKahoot]
      return {...state, kahoots: updatedKahoots}
    case 'deleteKahoot':
      const filteredKahoots = state.kahoots.filter(kahoot=>kahoot.id === action.payload.id)
      return { ...state, kahoots: filteredKahoots }
    default:
      return state
  }
}

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState)

  const setData = (data) => {
    dispatch({ type: 'setData', payload: data })
  }

  const addKahoot = (newKahoot) => {
    dispatch({ type: 'addNewKahoot', payload: { newKahoot } })
  }
  const deleteKahoot = (id) => {
    dispatch({ type: 'deleteKahoot', id})
  }

  return (
    <UserContext.Provider value={{ ...state, setData, addKahoot, deleteKahoot}}>
      {children}
    </UserContext.Provider>
  )
}
