import React from "react";
import { motion } from "framer-motion";
import img from "../img/bookshelf.jpg";
import { useNavigate } from "react-router-dom";

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-button-color  text-white p-6 rounded-3xl">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        <div>
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-28 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Discover Your Next Adventure
          </motion.h1>
          <motion.p
            className="text-lg text-white md:text-xl mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Dive into a world of stories, knowledge, and imagination. Find your
            perfect book today.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button
              className=" bg-button-color border-white border  text-white font-thin  px-6 py-3 rounded-lg hover:"
              onClick={() => navigate("/Books")}
            >
              Browse Books
            </button>
          </motion.div>
        </div>

        <motion.div
          className="relative ml-36"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img
            src={img}
            alt="Bookshelf"
            className="w-[300px] h-[400px] rounded-2xl "
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
