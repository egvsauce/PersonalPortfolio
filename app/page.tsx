import Intro from "@/components/intro";
import SectionDivider from "@/components/section-divider";
import About from "@/components/about";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <main className="">
      <Intro />
      <SectionDivider />
      <About />
      <Projects /> 
      <Skills />
      <Contact />
      <div className="pb-40">
      </div>
    </main>
  )
}
