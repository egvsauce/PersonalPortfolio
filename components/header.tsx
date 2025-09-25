"use client";
import React from 'react'
import { motion } from "framer-motion";
import {links} from "@/lib/data";
import Link from 'next/link';

export default function Header() {
    return (
    <header className="z-[999] relative">
        <motion.div className="fixed bottom-0 left-1/2 -translate-x-1/2 h-[4.5rem] w-full
        rounded-none border border-gray-200 border-opacity-40 bg-gray-300/20
        shadow-lg shadow-black/[0.04] backdrop-blur-[1rem]
        sm:bottom-6 sm:h-[3.25rem] sm:w-[36rem] sm:rounded-full"
            initial={{y:100, opacity:0}}
            animate={{y:0, opacity:1}}
        ></motion.div>

        <nav 
            className="flex fixed bottom-[0.75rem] left-1/2 -translate-x-1/2 h-12 w-full max-w-[36rem] px-4 py-2
        sm:bottom-[1.7rem] sm:h-[initial] sm:px-0 sm:py-0">

            <ul className="flex w-full flex-wrap items-center justify-center gap-2 text-sm font-medium text-gray-500
            sm:flex-nowrap sm:gap-5">
                {links.map(link => 
                    <motion.li className="flex items-center justify-center" 
                    key={link.hash}
                    initial={{y:100, opacity:0}}
                    animate={{y:0, opacity:1}}
                    >
                        <Link className="flex w-full items-center
                        justify-center px-3 py-3 hover:text-gray-950 transition" href={link.hash}>
                        {
                            link.name
                        }
                        </Link>
                    </motion.li>
                )}
            </ul>
        </nav>
    </header>
    );
}
