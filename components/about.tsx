"use client";

import React, { useEffect } from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from '@/lib/hooks';

export default function About() {
const { ref } = useSectionInView("About");

  return (
    <motion.section ref={ref} className="mb-28 max-w-4xl mx-auto
        text-center leading-8 sm:mb-40 scroll-mt-18"
        initial={{opacity:0, y:100}}
        animate={{opacity:1,y:0}}
        transition={{delay:0.175}}
        id="about"
        >
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
