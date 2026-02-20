export interface IPhoto {
  id: string;
  urls: { regular: string };
  user: { name: string } | null;
  author: string | null;
  width: number;
  height: number;
}
