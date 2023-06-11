
export const getPixabayImageRequest = (query:string):string => {
  return `https://pixabay.com/api/?key=${process.env.NEXT_PUBLIC_PIXABAY_KEY}&q=${query}&image_type=photo&safesearch=true`
}

export const getHost = () => {
  const host = process.env.NEXT_PUBLIC_PRODUCTION_HOST
  return host ? host.replace('https://', '') : undefined
}

export const getToken = () => localStorage.getItem('token')