/* eslint-disable @typescript-eslint/no-unused-vars */
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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newGenreName, setNewGenreName] = useState<string>("");
  const [newAuthor, setNewAuthor] = useState<Partial<Author>>({
    name: "",
    bio: "",
    birthDate: "",
    imageUrl: "",
  });
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState<boolean>(false);

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
      },
    );
  }, [book, authors, genres]);

  const handleSubmit = async () => {
    if (!selectedBook) {
      toast.error("No book selected to save.");
      return;
    }

    if (newGenreName) {
      const genreExists = genres.some(
        (g) => g.genreName.toLowerCase() === newGenreName.toLowerCase(),
      );

      if (genreExists) {
        toast.error("Genre already exists!");
        return;
      }

      try {
        const newGenre = await axiosClient.post("/genre", {
          genreName: newGenreName,
        });
        selectedBook.genreID = newGenre.data.genreID;
      } catch (error) {
        toast.error("Failed to create new genre");
        return;
      }
    }

    const validationErrors = validateBook(selectedBook);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the validation errors before submitting.");
      return;
    }

    onSave(selectedBook);
    toast.success("Book saved successfully!");
  };

  const handleInputChange = (field: keyof Book, value: any) => {
    if (selectedBook) {
      setSelectedBook({ ...selectedBook, [field]: value });
      setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file");
        return;
      }

      const maxSizeInMB = 5;
      if (file.size > maxSizeInMB * 1024 * 1024) {
        toast.error(`File size should not exceed ${maxSizeInMB}MB`);
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axiosClient.post("/upload/image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const imageUrl = response.data.imageUrl;
        setImagePreview(imageUrl);
        setSelectedBook((prev) => ({
          ...prev!,
          imageUrl: imageUrl,
        }));
        toast.success("Image uploaded successfully!");
      } catch (error) {
        toast.error("Failed to upload image");
        console.error(error);
      }
    }
  };

  const handleAuthorSubmit = async () => {
    if (!newAuthor.name) {
      toast.error("Author name is required!");
      return;
    }

    // Check for duplicate author
    const authorExists = authors.some(
      (a) => a.name.toLowerCase() === newAuthor.name!.toLowerCase(),
    );

    if (authorExists) {
      toast.error("Author already exists!");
      return;
    }

    try {
      const newAuthorResponse = await axiosClient.post("/author", newAuthor);
      setSelectedBook((prev) => ({
        ...prev!,
        authorID: newAuthorResponse.data.authorID,
      }));
      setIsAuthorModalOpen(false);
      toast.success("Author created successfully!");
    } catch (error) {
      toast.error("Failed to create new author");
      console.error(error);
    }
  };

  const formattedDate = selectedBook?.publishedDate
    ? new Date(selectedBook.publishedDate).toISOString().split("T")[0]
    : "";

  return (
    <div className="modal modal-open transition-all duration-300 border border-black">
      <div className="modal-box max-w-4xl">
        <h1 className="text-2xl">
          {book?.bookID === 0 ? "Add Book" : "Edit Book"}
        </h1>
        <form className="flex flex-col ">
          <div className="form-control mt-2">
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
                className="w-[100px] h-[120px] object-contain my-4"
              />
            )}
          </div>
          <div className="form-control w-fit">
            <label className="label">Title</label>
            {errors.title && <p className="text-red-500">{errors.title}</p>}
            <input
              type="text"
              value={selectedBook?.title || ""}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="input input-bordered"
            />
          </div>
          <div className="form-control w-fit">
            <label className="label">Price (€)</label>
            {errors.price && <p className="text-red-500">{errors.price}</p>}
            <input
              type="number"
              value={selectedBook?.price || 0}
              onChange={(e) => handleInputChange("price", e.target.value)}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">Book Description</label>
            {errors.description && (
              <p className="text-red-500">{errors.description}</p>
            )}
            <textarea
              value={selectedBook?.description || ""}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="textarea textarea-bordered"
            />
          </div>
          <div className="form-control w-fit">
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
          </div>
          <div className="form-control flex flex-row items-end justify-start gap-20">
            <div>
              <label className="label">Author</label>

              {errors.authorID && (
                <p className="text-red-500">{errors.authorID}</p>
              )}
              <select
                value={selectedBook?.authorID}
                onChange={(e) =>
                  handleInputChange("authorID", parseInt(e.target.value))
                }
                className="select select-bordered w-fit"
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
            <button
              type="button"
              onClick={() => setIsAuthorModalOpen(true)}
              className="btn btn-md text-white font-thin w-fit bg-slate-900 hover:bg-transparent hover:border-slate-900 hover:text-black"
            >
              Create New Author
            </button>
          </div>
          <div className="form-control w-fit flex flex-row justify-center items-end gap-20">
            <div>
              <label className="label">Genre</label>
              {errors.genreID && (
                <p className="text-red-500">{errors.genreID}</p>
              )}
              <select
                value={selectedBook?.genreID || 0}
                onChange={(e) =>
                  handleInputChange("genreID", parseInt(e.target.value))
                }
                className="select select-bordered"
              >
                <option value="" disabled>
                  Select genre
                </option>
                {genres.map((g) => (
                  <option key={g.genreID} value={g.genreID}>
                    {g.genreName}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="text"
              value={newGenreName}
              onChange={(e) => setNewGenreName(e.target.value)}
              className="input input-bordered"
              placeholder="Or enter a new genre"
            />
          </div>
        </form>
        <div className="modal-action">
          <button
            onClick={handleSubmit}
            className="btn bg-green-800 font-thin text-white  hover:bg-transparent hover:text-black hover:border-green-800"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="btn bg-red-800 font-thin text-white  hover:bg-transparent hover:text-black hover:border-red-800"
          >
            Cancel
          </button>
        </div>
      </div>

      {isAuthorModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h1 className="text-2xl">Create New Author</h1>
            <form className="flex flex-col gap-4">
              <div className="form-control">
                <label className="label">Author Name</label>
                <input
                  type="text"
                  value={newAuthor.name}
                  onChange={(e) =>
                    setNewAuthor({ ...newAuthor, name: e.target.value })
                  }
                  className="input input-bordered w-fit"
                />
              </div>
              <div className="form-control">
                <label className="label">Author Description</label>
                <textarea
                  value={newAuthor.bio}
                  onChange={(e) =>
                    setNewAuthor({ ...newAuthor, bio: e.target.value })
                  }
                  className="textarea textarea-bordered"
                />
              </div>
              <div className="form-control w-fit">
                <label className="label">Author Birthdate</label>
                <input
                  type="date"
                  value={newAuthor.birthDate}
                  onChange={(e) =>
                    setNewAuthor({ ...newAuthor, birthDate: e.target.value })
                  }
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">Author Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      const formData = new FormData();
                      formData.append("file", file);
                      try {
                        const response = await axiosClient.post(
                          "/upload/image",
                          formData,
                          {
                            headers: {
                              "Content-Type": "multipart/form-data",
                            },
                          },
                        );
                        setNewAuthor({
                          ...newAuthor,
                          imageUrl: response.data.imageUrl,
                        });
                        toast.success("Author image uploaded successfully!");
                      } catch (error) {
                        toast.error("Failed to upload author image");
                        console.error(error);
                      }
                    }
                  }}
                />
              </div>
            </form>
            <div className="modal-action">
              <button
                onClick={handleAuthorSubmit}
                className="btn bg-green-800 font-thin text-white  hover:bg-transparent hover:text-black hover:border-green-800"
              >
                Save
              </button>
              <button
                onClick={() => setIsAuthorModalOpen(false)}
                className="btn bg-red-800 font-thin text-white hover:bg-transparent hover:text-black hover:border-red-800"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookModal;
