const BookDetails: React.FC = () => {
  return (
    <div className="card">
      <div className="flex items-center">
        <img
          src="/path/to/book-cover.jpg"
          alt="Harry Potter"
          className="w-32 h-48 mr-6"
        />
        <div>
          <h1 className="text-2xl font-bold">
            Harry Potter: Half-Blood Prince
          </h1>
          <p className="text-gray-600 mt-2">
            Get ready to uncover the dark secrets and betrayals in the book. A
            thrilling adventure awaits you.
          </p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
            Start Reading
          </button>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold">Description</h2>
        <p className="text-gray-600 mt-2">
          The story takes place during Harry's sixth year at Hogwarts School of
          Witchcraft and Wizardry, where he discovers more about Lord
          Voldemort's past and the prophecy that foretells his defeat.
        </p>
      </div>
    </div>
  );
};

export default BookDetails;
