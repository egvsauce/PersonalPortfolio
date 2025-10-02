import SectionHeading from "./section-heading"
import React, { useRef } from 'react'
import Image from "next/image";
import { projectsData } from "@/lib/data"
import { useScroll } from "framer-motion";
import Project from "./project";
export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-18">
        <SectionHeading>My Projects
            </SectionHeading>
            <div className= "flex flex-col items-center">
                {projectsData.map((project, index) => (
                    <React.Fragment key={index}>
                        <Project {...project}/>
                    </React.Fragment>
                ))}
            </div>
    </section>
  );
}
