"use client";

import SectionHeading from "./section-heading"
import React, { useRef, useEffect } from 'react'
import { projectsData } from "@/lib/data"
import Project from "./project";
import { useSectionInView } from '@/lib/hooks';

export default function Projects() {
    const { ref } = useSectionInView("Projects", 0.5);

  return (
    <section ref={ref} id="projects" className="scroll-mt-28 mb-28">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-gray-500">
          My Recent Projects
        </p>
        <SectionHeading>Portfolio
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
