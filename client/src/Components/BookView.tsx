// import { useEffect, useState } from "react";
// import { Book } from "../Models/Book";
// import axiosClient from "../axiosClient";

// const BookView = () => {
//   const [bookData, setBookData] = useState<Book[]>([]);
//   const [, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const fetchBooks = async () => {
//     try {
//       const res = await axiosClient.get("/book");
//       setBookData(res.data);
//     } catch (error) {
//       setError("Failed to fetch books");
//     }
//   };

//   return (
//     <div className="bg-custom-gradient-bg min-h-full flex flex-col items-start">
//       <table className="table">
//         {/* head */}
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Title</th>
//             <th>Price</th>
//             <th>Published Date</th>
//             <th>Author</th>
//             <th>Genre</th>
//           </tr>
//         </thead>
//         <tbody>
//           {/* row 1 */}
//           {bookData.map((b, i) => (
//             <tr key={i}>
//               <th>{b.bookID}</th>
//               <th>{b.title}</th>
//               <th>{b.price}</th>
//               <th>{b.publishedDate}</th>
//               <th>{b.authorName}</th>
//               <th>{b.genreName}</th>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default BookView;

const BookView: React.FC = () => {
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

export default BookView;
