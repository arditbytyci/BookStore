import { useEffect, useState } from "react";
import { Book } from "../../../Models/Book";






interface EditModalProps {
  book: Book | null;
  onClose: () => void;
  onSave: (book: Book) => void;
}

const EditModal: React.FC<EditModalProps> = ({ book, onClose, onSave }) => {
  const [editedBook, setEditedBook] = useState<Book | null>(null);

  useEffect(() => {
    setEditedBook(book);
  }, [book]);

  const handleInputChange = (field: keyof Book, value: any) => {
    if (editedBook) {
      setEditedBook({ ...editedBook, [field]: value });
    }
  };

  if (!editedBook) return null;

  const formattedDate = editedBook.publishedDate
    ? new Date(editedBook.publishedDate).toISOString().split("T")[0]
    : "";

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h2 className="font-bold text-lg">Edit Book</h2>
        <form>
          <div className="form-control">
            <label className="Image">Image</label>
            <input
              type="image"
              src={editedBook.imageUrl}
              className="w-[24px] h-[24px]"
              alt=""
            />
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
              </div>
              <div className="form-control">
                <label className="label">Genre</label>
                <input type="text" className="input input-bordered disabled" />
              </div>
            </div>
          </div>
        </form>
        <div className="modal-action">
          <button
            onClick={() => onSave(editedBook)}
            className="btn btn-success"
          >
            Save
          </button>
          <button onClick={onClose} className="btn btn-error">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
