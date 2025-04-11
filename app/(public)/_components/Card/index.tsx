"use client";

import Image from "next/image";
import { motion } from "framer-motion";


const Card = ({ title, description, imageUrl, delay = 0 }: any) => {
  return (
    <motion.div className="bg-white rounded-xl shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Image
        src={imageUrl}
        alt={title}
        width={800}
        height={400}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p>{description}</p>
      </div>
    </motion.div>
  );
};

export default Card;