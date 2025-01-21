import { useEffect, useState } from "react";
import { Book } from "../../../Models/Book";
import { Author } from "../../../Models/Author";
import { Genre } from "../../../Models/Genre";

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

  const handleInputChange = (field: keyof Book, value: any) => {
    if (selectedBook) {
      setSelectedBook({ ...selectedBook, [field]: value });
    }
  };
  if (!selectedBook) return null;

  const handleSubmit = () => {
    if (!selectedBook.title.trim()) {
      alert("Title cannot be empty");
      return;
    }
    if (!selectedBook.price || selectedBook.price <= 0) {
      alert("Price must be greater than 0");
      return;
    }
    onSave(selectedBook);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please upload a valid image file");
        return;
      }

      // Optional: Validate file size (e.g., limit to 5MB)
      const maxSizeInMB = 5;
      if (file.size > maxSizeInMB * 1024 * 1024) {
        alert(`File size should not exceed ${maxSizeInMB}MB`);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setSelectedBook((prev) => ({
          ...prev!,
          imageUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
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
            <input
              type="text"
              value={selectedBook.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">Price (€)</label>
            <input
              type="number"
              value={selectedBook.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">Description</label>
            <input
              type="text"
              value={selectedBook.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="input input-bordered textarea"
            />
            <div className="form-control">
              <label className="label">Published date</label>
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
                <select
                  value={selectedBook.authorID}
                  onChange={(e) =>
                    handleInputChange("authorID", parseInt(e.target.value))
                  }
                  className="select select-bordered"
                >
                  {authors.map((a) => (
                    <option key={a.authorID} value={a.authorID}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control">
                <label className="label">Genre</label>
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
          <button
            onClick={() => onSave(selectedBook)}
            className="btn btn-success text-white"
          >
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
