
export const getPixabayImageRequest = (query:string):string => {
  return `https://pixabay.com/api/?key=${process.env.NEXT_PUBLIC_PIXABAY_KEY}&q=${query}&image_type=photo&safesearch=true`
}
export const getToken = () => localStorage.getItem('token')