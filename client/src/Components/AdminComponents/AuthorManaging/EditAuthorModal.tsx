import { useEffect, useState } from "react";
import { Author } from "../../../Models/Author";

interface EditAuthorModalProps {
  author: Author | null;
  onSave: (author: Author) => void;
  onClose: () => void;
}

const EditAuthorModal: React.FC<EditAuthorModalProps> = ({
  author,
  onClose,
  onSave,
}) => {
  const [editedAuthor, setEditedAuthor] = useState<Author | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    setEditedAuthor(author);
  }, [author]);

  if (!editedAuthor) return null;

  const handleInputChange = (field: keyof Author, value: any) => {
    if (editedAuthor) {
      setEditedAuthor({ ...editedAuthor, [field]: value });
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setEditedAuthor((prev) => ({
          ...prev!,
          imageUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const formattedDate = editedAuthor.birthDate
    ? new Date(editedAuthor.birthDate).toISOString().split("T")[0]
    : "";

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h1 className="text-2xl">Edit Author</h1>
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
            <label className="label">Name</label>
            <input
              type="text"
              className="input input-bordered"
              value={editedAuthor.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">Bio</label>
            <textarea
              value={editedAuthor.bio}
              className="textarea textarea-bordered"
              onChange={(e) => handleInputChange("bio", e.target.value)}
            ></textarea>
          </div>
          <div className="form-control">
            <label className="label">Date of birth</label>
            <input
              type="date"
              value={formattedDate}
              className="input input-bordered"
              onChange={(e) => handleInputChange("birthDate", e.target.value)}
            />
          </div>
        </form>
        <div className="modal-action">
          <button
            onClick={() => onSave(editedAuthor)}
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

export default EditAuthorModal;
