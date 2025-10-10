import React from "react";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { FaGithubSquare } from 'react-icons/fa';
export default function Footer() {
  return (
    <footer className="mb-25 px-4 text-center text-black">
      <div className="flex pb-5 justify-center flex-col sm:flex-row items-center
         gap-3 text-lg font-medium">
            <a className="bg-white-900 p-4 text-gray-600 flex items-center gap-2 rounded-full 
            hover:text-white hover:scale-105 focus:scale-105 hover:bg-blue-950 active:scale-110 
            transition duration-300
            border border-black/10" href="https://linkedin.com/in/ethan-vasquez-se" target="_blank">
                <BsLinkedin />
            </a>
            <a className="bg-white-900 p-4 text-gray-600 flex items-center gap-2 
            text-[1.2rem] rounded-full active:scale-105 hover:text-white hover:bg-blue-950 
            transition hover:scale-110 focus:scale-110 duration-300 border border-black/10"
            href="https://github.com/egvsauce" target="_blank">
                <FaGithubSquare />
            </a>
      </div>

      <small className="mb-2 block text-xs">
        &copy; 2025 Ethan Vasquez. All rights reserved.
      </small>


    </footer>
  );
}