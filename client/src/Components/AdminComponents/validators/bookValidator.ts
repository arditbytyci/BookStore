import { Book } from "../../../Models/Book";

export const validateBook = (book: Book): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!book?.title.trim()) errors.title = "Please fill the title field";
  if (book.price <= 0) errors.price = "Price must be greater than 0.";
  if (!book.description.trim())
    errors.description = "Please fill the description field.";

  if (!book.publishedDate)
    errors.publishedDate = "Please select a published date.";
  if (!book.authorID) errors.authorID = "Please select a valid author";
  if (!book.genreID) errors.genreID = "Please select a valid genre";
  if (!book.imageUrl) errors.imageUrl = "Please upload a valid image";

  return errors;
};
