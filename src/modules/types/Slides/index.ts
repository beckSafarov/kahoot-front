export type SlideOptionTypes = {
  id: string
  text: string
}
export type SlideValueTypes = {
  title: string
  image: string
  options: Array<SlideOptionTypes>
  correctOption: string,
  seconds?: Number
}

export type OptionTypes = {
  [id: string]: string
  color: string
  shape: string
}