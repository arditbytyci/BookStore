import { useEffect, useState } from "react";
import { Genre } from "../../../Models/Genre";

interface GenreModalProps {
  genre: Genre | null;
  onClose: () => void;
  onSave: (genre: Genre) => void;
}

const GenreModal: React.FC<GenreModalProps> = ({ genre, onClose, onSave }) => {
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);

  useEffect(() => {
    setSelectedGenre(genre);
  }, [genre]);

  const handleInputChange = (field: keyof Genre, value: any) => {
    if (selectedGenre) {
      setSelectedGenre({
        ...selectedGenre,
        [field]: value,
      });
    }
  };
  if (!selectedGenre) return null;

  const handleSubmit = () => {
    if (!selectedGenre.genreName.trim()) {
      alert("Genre name cannot be empty");
      return;
    }
    onSave(selectedGenre);
    onClose();
  };

  if (!genre) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h1 className="text-2xl">
          {selectedGenre.genreID === 0 ? "Add Genre" : "Edit Genre"}
        </h1>
        <form className="flex flex-col gap-4">
          <div className="form-control">
            <label className="label">Name</label>
            <input
              type="text"
              className="input input-bordered"
              value={selectedGenre.genreName}
              onChange={(e) => handleInputChange("genreName", e.target.value)}
            />
          </div>
        </form>
        <div className="modal-action">
          <button
            onClick={() => onSave(selectedGenre)}
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

export default GenreModal;
