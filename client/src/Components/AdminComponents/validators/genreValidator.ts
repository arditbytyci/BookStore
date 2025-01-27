import { Genre } from "../../../Models/Genre";

export const validateGenre = (genre: Genre): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!genre.genreName.trim())
    errors.genreName = "Please fill out the genre name field";

  return errors;
};
