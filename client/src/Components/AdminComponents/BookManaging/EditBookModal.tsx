import { useEffect, useState } from "react";
import { Book } from "../../../Models/Book";
import { Author } from "../../../Models/Author";
import { Genre } from "../../../Models/Genre";

interface EditBookModalProps {
  book: Book | null;
  authors: Author[];
  genres: Genre[];
  onClose: () => void;
  onSave: (book: Book) => void;
}

const EditBookModal: React.FC<EditBookModalProps> = ({
  book,
  authors,
  genres,
  onClose,
  onSave,
}) => {
  const [editedBook, setEditedBook] = useState<Book | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    setEditedBook(book);
  }, [book]);

  const handleInputChange = (field: keyof Book, value: any) => {
    if (editedBook) {
      setEditedBook({ ...editedBook, [field]: value });
    }
  };
  if (!editedBook) return null;

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setEditedBook((prev) => ({
          ...prev!,
          imageUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const formattedDate = editedBook.publishedDate
    ? new Date(editedBook.publishedDate).toISOString().split("T")[0]
    : "";

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h1 className="text-2xl">Edit Book</h1>
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
              value={editedBook.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">Price (€)</label>
            <input
              type="number"
              value={editedBook.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">Description</label>
            <input
              type="text"
              value={editedBook.description}
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
                  value={editedBook.authorID}
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
                  value={editedBook.genreID}
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
            onClick={() => onSave(editedBook)}
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

export default EditBookModal;
