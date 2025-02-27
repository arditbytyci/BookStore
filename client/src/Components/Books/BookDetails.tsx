import { useEffect, useState } from "react";
import { Book } from "../../Models/Book";
import axiosClient from "../../api/axiosClient";
import { useParams } from "react-router-dom";
import img from "../../../public/images/harrypotter.jpg";
import bookmarkIcon from "../../assets/bookmark.png";

const BookDetails: React.FC = () => {
  const [book, setBook] = useState<Book>();
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    if (id) fetchBookById(id);
  }, [id]);

  const fetchBookById = async (id: number | string): Promise<void> => {
    try {
      const response = await axiosClient.get(`/book/${id}`);

      setBook(response.data);
      console.log(book?.authorName);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.log(`failed to fetch book with ${id}`, error);
    }
  };

  return (
    <div className="h-screen w-[190vh] absolute overflow-y-scroll">
      <div className="flex flex-row justify-evenly w-full h-[40%] ">
        <div className="w-[320px] h-[390px] absolute z-10 flex flex-col items-center left-28 top-0 shadow-2xl ">
          <img src={img} alt="" className=" w-[320px] h-[390px] shadow-xl" />
        </div>
        <div className="flex flex-col justify-between absolute items-start left-[50%] h-[50%] z-10 top-5">
          <h1 className=" text-4xl w-[60%] px-3">
            Harry Potter: Half Blood Prince
          </h1>
          <h3 className="text-lg px-3">J.K Rowling</h3>
          <div className="w-full  flex flex-row justify-between border-b-[1px] border-[#d5d2d5] pb-5">
            <button className="btn bg-zinc-950 text-white">Order Now</button>
            <button className="">
              <img src={bookmarkIcon} alt="" className=" w-9 h-9" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center w-full  right-5 h-full relative z-5 bg-[#F8F6EA] shadow-2xl">
        <div className="w-[50%] relative bottom-36 p-10">
          <h1 className="font-semibold text-md my-3">Description</h1>
          <p className="text-sm">
            The book was published in the United Kingdom by Bloomsbury and in
            the United States by Scholastic on 16 July 2005, as well as in
            several other countries. It sold almost seven million copies in the
            first 24 hours after its release,[1] a record eventually broken by
            its sequel, Harry Potter and the Deathly Hallows.[2] There were many
            controversies before and after it was published, including the
            right-to-read copies delivered before the release date in Canada.
            Reception to the novel was generally positive, and it won several
            awards and honours, including the 2006 British Book of the Year
            award.
          </p>
        </div>

        <div className="relative bottom-[6.4rem] p-6 w-[50%] h-inherit">
          <div className="w-[60%]">
            <h1 className="font-semibold text-md py-5">Editors</h1>
            <p className="text-sm">
              J.K Rowling(author), Christopher Reath, Alena Gestabon, Steve Korg
            </p>
          </div>
          <div className="w-[60%]">
            <h1 className="font-semibold text-md py-5">Language</h1>
            <p className="text-sm">Standard English (USA & UK)</p>
          </div>
          <div className="">
            <h1 className="font-semibold text-md py-5">Paperback</h1>
            <p className="text-sm pb-2">
              paper textured, full colour, 345 pages
            </p>
            <p className="text-sm">ISBN: 967 3 321223 455 B</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
