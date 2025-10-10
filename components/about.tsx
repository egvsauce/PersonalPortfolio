"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
// import Image from "next/image"; // if you add an illustration

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      id="about"
      className="mx-auto mb-28 max-w-6xl px-6 sm:mb-40"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
    >

      {/* Top label + title */}
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
          My background
        </p>
        <SectionHeading>About Me</SectionHeading>
      </div>

      {/* Content area */}
      <div className="mt-8 grid gap-10 md:grid-cols-2 md:items-start">
        {/* Illustration / avatar slot (optional) */}
        <div className="hidden md:block">
          {/* Example placeholder panel. Replace with Image if desired */}
          {/* <Image src="/about-illustration.png" alt="" width={600} height={480} className="rounded-2xl shadow-xl" /> */}
          <div className="h-64 rounded-2xl bg-gradient-to-br from-purple-500/20 to-sky-400/20 shadow-inner ring-1 ring-white/20 backdrop-blur-sm" />
        </div>

        {/* Text */}
        <div className="space-y-6 text-left grid gap-6 bg-[#640008]/70 rounded-3xl ring-3 ring-black/5">
          <p className="text-gray-200 leading-relaxed rounded-xl p-5">
            Hello! I&apos;m{" "}
            <span className="font-semibold">Ethan Vasquez</span>, a Computer
            Science student and software engineer focused building clean,
            efficient, and reliable products. I have hands-on
            experience with{" "}
            <span className="rounded px-1 bg-gradient-to-r from-fuchsia-500/15 to-purple-500/15 text-purple-700 dark:text-purple-300">
              full-stack development
            </span>
            ,{" "}
            <span className="rounded px-1 bg-gradient-to-r from-sky-500/15 to-cyan-500/15 text-sky-700 dark:text-sky-300">
              UI engineering
            </span>
            , and{" "}
            <span className="rounded px-1 bg-gradient-to-r from-amber-500/15 to-yellow-500/15 text-amber-700 dark:text-amber-300">
              agile workflows
            </span>
            .
          </p>
          <p className="text-gray-200 leading-relaxed rounded-xl p-5 -mt-8">
      I&apos;m passionate about learning new technologies and optimizing how data moves through systems. Courses like Data Structures & Algorithms and Theoretical Computer Science strengthened my interest in state management and system efficiency.
          </p>
        </div>
      </div>

      {/* Cards row (Education + Skills) */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {/* Education Card */}
        <div className="rounded-3xl bg-[#26285A]/70 text-gray-200 p-8 shadow-md border border-white/10">
          <h3 className="flex items-center gap-3 text-xl font-semibold mb-4">
            <span className="text-pink-400">🎓</span>
            Education
          </h3>
          <div className="space-y-1 text-gray-300">
            <div className="flex gap-1">
              <p>Computer Science</p>
              <p className="translate-y-[5px] text-xs italic">(Software Engineering)</p>
            </div>
            <p>Arizona State University</p>
            <p>Society of Hispanic Professional Engineers</p>
            <p>Grad: May 2026</p>
            <p>GPA: 3.6 / 4.0</p>
          </div>
        </div>

        {/* Skills Card */}
        <div className="rounded-3xl bg-[#26285A]/70 text-gray-200 p-8 shadow-md border border-white/10">
          <h3 className="flex items-center gap-3 text-xl font-semibold mb-4">
            <span className="text-pink-400">💻</span>
            Skills
          </h3>
          <ul className="space-y-2 text-gray-300">
            <li>Object-Oriented Programming</li>
            <li>Full-Stack Development</li>
            <li>Web Development</li>
            <li>DevOps</li>
          </ul>
        </div>
      </div>
    </motion.section>
  );
}
