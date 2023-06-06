
export type UserTypes = {
  email: string, 
  first_name: string,
  last_name: string,
  games: []
  id: string, 
  language: string,
  username: string | null
}

export type GameTypes = {
  cover_image: string, 
  created_at: string,
  id: number, 
  title: string,
  type: 'private'
}

export type KahootTypes = {
  title: string,
  id: number,
  coverImage: string, 
  cover_image: string, 
  type: 'public' | 'private',
  created_at: string
}