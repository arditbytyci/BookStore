/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Book } from "../../../Models/Book";
import { Author } from "../../../Models/Author";
import { Genre } from "../../../Models/Genre";
import toast from "react-hot-toast";
import { validateBook } from "../validators/bookValidator";

import axiosClient from "../../../api/axiosClient";

interface BookModalProps {
  book: Book | null;
  authors: Author[];
  genres: Genre[];
  onClose: () => void;
  onSave: (book: Book) => void;
}

const BookModal: React.FC<BookModalProps> = ({
  book,
  authors,
  genres,
  onClose,
  onSave,
}) => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErorrs] = useState<Record<string, string>>({});

  useEffect(() => {
    setSelectedBook(
      book || {
        bookID: 0,
        title: "",
        price: 0,
        description: "",
        publishedDate: "",
        authorID: authors[0]?.authorID || 0,
        genreID: genres[0]?.genreID || 0,
        authorName: "",
        genreName: "",
        imageUrl: "",
      }
    );
  }, [book, authors, genres]);

  const handleSubmit = () => {
    if (!selectedBook) {
      toast.error("No book selected to save.");
      return;
    }
    const validationErrors = validateBook(selectedBook);
    if (Object.keys(validationErrors).length > 0) {
      setErorrs(validationErrors);
      toast.error("Please fix the validation errors before submitting.");
      return;
    }

    onSave(selectedBook);
    toast.success("Book saved successfully!");
  };

  const handleInputChange = (field: keyof Book, value: any) => {
    if (selectedBook) {
      setSelectedBook({ ...selectedBook, [field]: value });
      setErorrs((prevErrors) => ({ ...prevErrors, [field]: "" }));
    }
  };
  if (!selectedBook) return null;

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file");
        return;
      }

      // Optional: Validate file size (e.g., limit to 5MB)
      const maxSizeInMB = 5;
      if (file.size > maxSizeInMB * 1024 * 1024) {
        toast.error(`File size should not exceed ${maxSizeInMB}MB`);
        return;
      }

      // Create a FormData object
      const formData = new FormData();
      formData.append("file", file);

      try {
        // Upload the image to your backend API using axiosClient
        const response = await axiosClient.post("/upload/image", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Required for file uploads
          },
        });

        const imageUrl = response.data.imageUrl; // Get the Cloudinary URL from the response
        setImagePreview(imageUrl); // Set image preview
        setSelectedBook((prev) => ({
          ...prev!,
          imageUrl: imageUrl, // Save Cloudinary URL
        }));
        toast.success("Image uploaded successfully!");
      } catch (error) {
        toast.error("Failed to upload image");
        console.error(error);
      }
    }
  };

  const formattedDate = selectedBook.publishedDate
    ? new Date(selectedBook.publishedDate).toISOString().split("T")[0]
    : "";

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h1 className="text-2xl">
          {book?.bookID === 0 ? "Add Book" : "Edit Book"}
        </h1>
        <form className="flex flex-col gap-4">
          <div className="form-control mt-2">
            <label className="Image mb-4">Image</label>
            {errors.imageUrl && (
              <p className="text-red-500 mb-2">{errors.imageUrl}</p>
            )}
            <input
              type="file"
              accept="image/*"
              alt=""
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="image preview"
                className="w-[100px] h-[100px]"
              />
            )}
          </div>
          <div className="form-control">
            <label className="label">Title</label>
            {errors.title && <p className="text-red-500">{errors.title}</p>}
            <input
              type="text"
              value={selectedBook.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">Price (€)</label>
            {errors.price && <p className="text-red-500">{errors.price}</p>}
            <input
              type="number"
              value={selectedBook.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">Description</label>
            {errors.description && (
              <p className="text-red-500">{errors.description}</p>
            )}
            <input
              type="text"
              value={selectedBook.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="input input-bordered textarea"
            />
            <div className="form-control">
              <label className="label">Published date</label>
              {errors.publishedDate && (
                <p className="text-red-500">{errors.publishedDate}</p>
              )}
              <input
                type="date"
                value={formattedDate}
                onChange={(e) =>
                  handleInputChange("publishedDate", e.target.value)
                }
                className="input input-bordered"
              />
              <div className="form-control">
                <label className="label">Author</label>
                {errors.authorID && (
                  <p className="text-red-500">{errors.authorID}</p>
                )}
                <select
                  value={selectedBook.authorID}
                  onChange={(e) =>
                    handleInputChange("authorID", parseInt(e.target.value))
                  }
                  className="select select-bordered"
                >
                  <option value="" disabled>
                    Select author
                  </option>
                  {authors.map((a) => (
                    <option key={a.authorID} value={a.authorID}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control">
                <label className="label">Genre</label>
                {errors.genreID && (
                  <p className="text-red-500">{errors.genreID}</p>
                )}
                <select
                  value={selectedBook.genreID}
                  onChange={(e) =>
                    handleInputChange("genreID", parseInt(e.target.value))
                  }
                  className="select select-bordered"
                >
                  {genres.map((g) => (
                    <option key={g.genreID} value={g.genreID}>
                      {g.genreName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </form>
        <div className="modal-action">
          <button onClick={handleSubmit} className="btn btn-success text-white">
            Save
          </button>
          <button onClick={onClose} className="btn btn-error text-white">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
