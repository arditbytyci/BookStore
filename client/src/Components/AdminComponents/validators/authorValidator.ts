import { Author } from "../../../Models/Author";

export const validateAuthor = (author: Author): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!author.name.trim()) errors.name = "Please fill the name field";
  if (!author.bio.trim()) errors.bio = "Please fill the bio field";
  if (!author.birthDate) errors.birthDate = "Please select a valid date";
  if (!author.imageUrl) errors.imageUrl = "Please upload a valid file";

  return errors;
};
