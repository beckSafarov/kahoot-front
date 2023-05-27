import { createContext, useReducer } from "react";

const initialState = {
  title: "",
  description: "",
  visibility: "",
  coverImage: "",
  slides: [],
  setData: (x)=> void 0,
  addSlide: (x)=> void 0,
}

export const NewKahootContext = createContext(initialState)

const NewKahootReducer = (state, action) => {
  switch (action.type) {
    case 'setData':
      return { ...state, ...action.payload }
    case 'addSlide':
      return { ...state, slides: [...state.slides, action.payload] }
    default:
      return state
  }
}

export const NewKahootProvider = ({children}) => {
  const [state, dispatch] = useReducer(NewKahootReducer, initialState)

  const setData = (data) => {
    dispatch({ type: 'setData', payload: data })
  }
  const addSlide = (data) => {
    dispatch({ type: 'setData', payload: data })
  }

  return (
    <NewKahootContext.Provider value={{ ...state, setData, addSlide }}>
      {children}
    </NewKahootContext.Provider>
  )
}
