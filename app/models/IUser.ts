import { IFavorites } from "./IFavorites"

export interface IUser  {
  id: number
  email: string
  password: string
  favorites?: IFavorites[]  
}