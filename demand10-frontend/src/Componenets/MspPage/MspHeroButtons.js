"use client";
import React from "react";
import Link from "next/link";

const MspHeroButtons = ({ onOpenForm }) => {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-4">
      <Link
        href="/managed-service-providers"
        className="bg-white text-[#265ba3] font-bold py-3.5 px-7 rounded-md transition duration-300 hover:bg-gray-100 shadow-md"
      >
        Explore Directory
      </Link>
      <button
        onClick={onOpenForm}
        className="bg-gray-900 text-white font-bold py-3.5 px-7 rounded-md transition duration-300 hover:bg-gray-800 shadow-md cursor-pointer"
      >
        Request Data Sample
      </button>
      <button
        onClick={onOpenForm}
        className="bg-[#f7931e] hover:opacity-90 text-white font-semibold py-3.5 px-7 rounded-md transition duration-300 cursor-pointer"
      >
        Talk to Sales
      </button>
    </div>
  );
};

export default MspHeroButtons;
