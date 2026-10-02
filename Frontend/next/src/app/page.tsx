import { About } from "@/components/About";
import { AiWorkflow } from "@/components/AiWorkflow";
import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Stack } from "@/components/Stack";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="relative z-10 border-t border-[var(--line)] bg-[rgba(5,8,20,0.88)] backdrop-blur-md">
        <About />
        <Education />
        <Stack />
        <Projects />
        <AiWorkflow />
        <Contact />
      </div>
    </main>
  );
}
