import { IPhoto } from "./IPhoto";

export interface IPhotosState {
  photos: IPhoto[];
  page: number;
  query: string;
  isLoading: boolean;
}
