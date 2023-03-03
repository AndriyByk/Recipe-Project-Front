import {ICommentAuthor} from "./ICommentAuthor";

export interface IComment {
  id: number,
  message: string,
  date: string
  author: ICommentAuthor
}
