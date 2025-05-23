import { Book } from "./Book";

export interface Author {
  authorID: number;
  name: string;
  bio: string;
  birthDate: string;
  imageUrl: string;
  books: Book[];
}
