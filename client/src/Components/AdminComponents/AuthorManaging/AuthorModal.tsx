/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Author } from "../../../Models/Author";
import { validateAuthor } from "../validators/authorValidator";
import toast from "react-hot-toast";

interface AuthorModalProps {
  author: Author | null;
  authors: Author[]; // Add authors prop to check for duplicates
  onSave: (author: Author) => void;
  onClose: () => void;
}

const AuthorModal: React.FC<AuthorModalProps> = ({
  author,
  authors,
  onClose,
  onSave,
}) => {
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setSelectedAuthor(author);
  }, [author]);

  if (!selectedAuthor) return null;

  const handleInputChange = (field: keyof Author, value: any) => {
    if (selectedAuthor) {
      setSelectedAuthor({ ...selectedAuthor, [field]: value });
      setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    }
  };

  const handleSubmit = () => {
    const validationErrors = validateAuthor(selectedAuthor);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fill out the fields before submitting");
      return;
    }

    // Check if author already exists
    const authorExists = authors.some(
      (a) => a.name.toLowerCase() === selectedAuthor.name.toLowerCase(),
    );

    if (authorExists) {
      toast.error("Author already exists!");
      return;
    }

    onSave(selectedAuthor);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setSelectedAuthor((prev) => ({
          ...prev!,
          imageUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const formattedDate = selectedAuthor.birthDate
    ? new Date(selectedAuthor.birthDate).toISOString().split("T")[0]
    : "";

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h1 className="text-2xl">
          {selectedAuthor.authorID === 0 ? "Add Author" : "Edit Author"}
        </h1>
        <form className="flex flex-col gap-4">
          <div className="form-control mt-2">
            <label className="Image mb-1">Image</label>
            {errors.imageUrl && (
              <p className="text-red-500">{errors.imageUrl}</p>
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
          <div className="form-control w-fit">
            <label className="label">Name</label>
            {errors.name && <p className="text-red-500">{errors.name}</p>}
            <input
              type="text"
              className="input input-bordered"
              value={selectedAuthor.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">Bio</label>
            {errors.bio && <p className="text-red-500">{errors.bio}</p>}
            <textarea
              value={selectedAuthor.bio}
              className="textarea textarea-bordered"
              onChange={(e) => handleInputChange("bio", e.target.value)}
            ></textarea>
          </div>
          <div className="form-control w-fit">
            <label className="label">Date of birth</label>
            {errors.birthDate && (
              <p className="text-red-500">{errors.birthDate}</p>
            )}
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

export default AuthorModal;
