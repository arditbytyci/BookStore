import { useEffect, useState } from "react";
import { Genre } from "../../../Models/Genre";
import { validateGenre } from "../validators/genreValidator";
import toast from "react-hot-toast";

interface GenreModalProps {
  genre: Genre | null;
  genres: Genre[];
  onClose: () => void;
  onSave: (genre: Genre) => void;
}

const GenreModal: React.FC<GenreModalProps> = ({
  genre,
  genres,
  onClose,
  onSave,
}) => {
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setSelectedGenre(genre);
  }, [genre]);

  const handleInputChange = (field: keyof Genre, value: any) => {
    if (selectedGenre) {
      setSelectedGenre({
        ...selectedGenre,
        [field]: value,
      });
      setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    }
  };

  if (!selectedGenre) return null;

  const handleSubmit = () => {
    const validationErrors = validateGenre(selectedGenre);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fill out the field before submitting");
      return;
    }

    // Check if genre already exists
    const genreExists = genres.some(
      (g) =>
        g.genreName.toLowerCase() === selectedGenre.genreName.toLowerCase(),
    );

    if (genreExists) {
      toast.error("Genre already exists!");
      return;
    }

    onSave(selectedGenre);
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h1 className="text-2xl">
          {selectedGenre.genreID === 0 ? "Add Genre" : "Edit Genre"}
        </h1>
        <form className="flex flex-col gap-4">
          <div className="form-control">
            {errors.genreName && (
              <p className="text-red-500">{errors.genreName}</p>
            )}
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
            onClick={handleSubmit}
            className="btn bg-green-800 font-thin text-white hover:bg-transparent hover:text-black hover:border-green-800"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="btn bg-red-800 font-thin text-white hover:bg-transparent hover:text-black hover:border-red-800"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenreModal;
