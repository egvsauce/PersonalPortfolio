"use client"
import React from 'react'
import SectionHeading from './section-heading'
import {motion} from "framer-motion";

export default function About() {
  return (
    <motion.section className="mb-28 max-w-4xl mx-auto
        text-center leading-8 sm:mb-40"
        initial={{opacity:0, y:100}}
        animate={{opacity:1,y:0}}
        transition={{delay:0.175}}>
        <SectionHeading>
            About Me
        </SectionHeading>
        <p>
            love pussy n shi
        </p>
        <p>
            oh ye pussy da shit
        </p>
    </motion.section>
  );
}
