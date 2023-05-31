import { createContext, useReducer } from "react";
import { v4 } from 'uuid'
const initialState = {
  title: "",
  description: "",
  visibility: "",
  coverImage: "",
  slides: [],
  activeSlide: 0,
  setData: (x) => void 0,
  setActiveSlide: (x) => void 0,
  addSlide: (x) => void 0,
  addBasicSlide: (x) => void 0,
  updateSlide: (x) => void 0,
  deleteSlide: () => void 0
}

export const NewKahootContext = createContext(initialState)

const NewKahootReducer = (state, action) => {
  switch (action.type) {
    case 'setData':
      return { ...state, ...action.payload }
    case 'addSlide':
      return { ...state, slides: [...state.slides, action.payload] }
    case 'setActiveSlide':
      return { ...state, activeSlide: action.payload }
    case 'updateSlide':
      const slides = state.slides
      const { updates } = action.payload
      console.log(updates)
      const updatedSlides = slides.map((slide) => {
        return slide.id === state.activeSlide ? { ...slide, ...updates } : slide
      })
      console.log(updatedSlides)
      return { ...state, slides: updatedSlides }
    case 'deleteSlide':
      const filtered = state.slides.filter(slide => slide.id !== state.activeSlide)
      const slideIndex = state.slides.findIndex(currSlide => currSlide.id === state.activeSlide)
      const nextSlide = state.slides[slideIndex + 1] || state.slides[slideIndex - 1]
      return { ...state, activeSlide: nextSlide.id, slides: filtered }
    default:
      return state
  }
}

const basicSlide = {
  title: '',
  image: '/images/kahoot-bg-placeholder.png',
  seconds: 10,
  options: ['a', 'b', 'c', 'd'].map((letter) => ({
    id: letter,
    text: '',
    isTrue: false,
  }))
}

export const NewKahootProvider = ({ children }) => {
  const [state, dispatch] = useReducer(NewKahootReducer, initialState)

  const setData = (data) => {
    dispatch({ type: 'setData', payload: data })
  }
  const setActiveSlide = (id) => {
    dispatch({ type: 'setActiveSlide', payload: id })
  }

  const addBasicSlide = () => {
    const id = v4()
    dispatch({ type: 'addSlide', payload: { ...basicSlide, id } })
    dispatch({ type: 'setActiveSlide', payload: id })
  }
  const addSlide = (data) => {
    const id = v4()
    dispatch({ type: 'addSlide', payload: { ...data, id } })
    dispatch({ type: 'setActiveSlide', payload: id })
  }
  const updateSlide = (updates) => {
    dispatch({ type: 'updateSlide', payload: { updates } })
  }
  const deleteSlide = () => {
    dispatch({ type: 'deleteSlide' })
  }

  return (
    <NewKahootContext.Provider value={{ ...state, setData, addSlide, addBasicSlide, updateSlide, deleteSlide, setActiveSlide }}>
      {children}
    </NewKahootContext.Provider>
  )
}
