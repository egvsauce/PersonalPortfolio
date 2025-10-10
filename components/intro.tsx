"use client";
import { useRef, useEffect } from 'react';
import React from 'react';
import Image from 'next/image'
import { motion } from "framer-motion";
import Link from "next/link";
import { HiDownload } from "react-icons/hi";
import BubblesBackground from "@/components/bubblebackground";
import BubblesBackground2 from "@/components/bubblebackground2";
import BubblesBackground3 from "@/components/bubblesbackground3";
import { useActiveSectionContext } from '@/context/active-section-context';
import { useSectionInView } from '@/lib/hooks';
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { FaGithubSquare } from 'react-icons/fa';
export default function Intro() {
    const { ref } = useSectionInView("Home", 0.5);
    const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  
    return (
    <section ref={ref} id="home" className="scroll-mt-[100rem] flex flex-col-reverse items-center gap-10 max-w-6xl mx-auto w-full px-6 py-12 text-center
    md:flex-row md:items-center md:justify-between md:text-left md:px-16 lg:px-24 xl:px-40">
        {/*IMAGE*/}
        <div className="w-full md:w-auto"> 
            <div className="z-20 flex justify-center md:block relative">
                <motion.div
                    initial = {{opacity:0, scale:0}}
                    animate = {{opacity:1, scale:1}} 
                    transition={{
                        type:"tween",
                        duration:0.3,
                    }} 
                >
                <Image
                  src="/portrait.jpg"
                  width={200}
                  height={200}
                  alt="portrait"
                  quality={95}
                  priority
                  className="h-48 w-48 rounded-full object-cover border-[0.2rem] border-black shadow-xl md:h-56 md:w-56"
                />
                </motion.div>

                <motion.div
                    initial = {{opacity:0, scale:0}}
                    animate = {{opacity:1, scale:1}} 
                    transition={{
                        type:"spring",
                        stiffness:100,
                        damping:10,
                        delay:0.2
                    }}   
                    className="
                        absolute 
                        bottom-0 left-1/2 translate-x-12 translate-y-1
                        md:bottom-2 md:right-2 md:left-auto md:translate-x-0 md:translate-y-0
                        lg:bottom-3 lg:right-4
                    "
                    >
                    <span className="text-4xl md:text-5xl">
                        🫰
                    </span>
                </motion.div>
            </div>
        </div>
        <BubblesBackground2 />
        <BubblesBackground3 />
        <BubblesBackground />
        {/*INTRO TEXT*/}
        <section className="space-y-4 z-50">
            <motion.div
                initial={{opacity:0, x:-50}}
                animate={{opacity:1, x:0}}
                transition={{duration:0.5}}
                >
                <h1 className="text-base text-gray-600 md:text-lg"> 
                    Hello! I&apos;m
                </h1>
            </motion.div>
            <motion.div 
                initial={{opacity:0, x:-50}}
                animate={{opacity:1, x:0}}
                transition={{duration:0.4}}
                >
                <h1 className="text-4xl font-bold md:text-5xl"> 
                   Ethan Vasquez
                </h1>


                
            </motion.div>
            <motion.div
                initial={{opacity:0, x:-50}}
                animate={{opacity:1, x:0}}
                transition={{duration:0.4}}
                >
                <h1 className="text-lg italic text-gray-700 md:text-xl"> 
                    Software Engineer
                </h1>
            </motion.div>

                 {/*BUTTONS*/}
         <motion.div className="flex flex-col sm:flex-row items-center
         gap-3 text-lg font-medium"
                initial={{opacity:0, x:-50}}
                animate={{opacity:1, x:0}}
                transition={{
                delay:0.2}}
         >
            <Link href="#contact"
            className="group bg-gray-900 text-white px-7 
            py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 
            hover:bg-blue-300 hover:scale-110 duration-300 active:scale-105 transition"
            onClick={() => {
                setActiveSection("Contact");
                setTimeOfLastClick(Date.now());
            }}
            >
            Let&apos;s Connect! <BsArrowRight className="opacity-70 group-hover:translate-x-2 transition" />{" "}
            </Link>

            <a className="group bg-white-900 px-7 
                py-3 flex items-center gap-2 rounded-full hover:text-white hover:bg-blue-950  
                hover:scale-105 transition active:scale-110 focus:scale-105 duration-300 border border-black/10" href="/CV.pdf" download={true}>
                Resume <HiDownload className="group-hover:translate-y-1 transition"/>
            </a>
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

         </motion.div>
        </section>

    </section>
  )
}
