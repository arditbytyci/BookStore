import React from "react";
import { motion } from "framer-motion";
import img from "../img/bookshelf.jpg";

const Test: React.FC = () => {
  return (
    <section className="relative bg-button-color  text-white p-6 rounded-3xl">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        {/* Text Content */}
        <div>
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Discover Your Next Adventure
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-6"
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
            <button className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-100">
              Browse Books
            </button>
          </motion.div>
        </div>

        {/* Image Content */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <img
            src={img}
            alt="Bookshelf"
            className="w-[300px] h-[350px] rounded-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Test;
