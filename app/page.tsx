import Link from "next/link";
import { Suspense } from "react";
import { Hero3 } from "@/components/hero3";
import Header2 from "@/components/mvpblocks/header-2";
import Team4 from "@/components/mvpblocks/team-4";
import { elegantTeamMembers } from "@/components/mvpblocks/team-4";
import Footer from "@/components/footer";
import FeatureSteps from "@/components/mvpblocks/feature-2";
import ProjectSection from "@/components/uitripled/projectSection";
import TestimonialsGrid from "@/components/testimonials-grid";
export default function Home() {

  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <div className="flex-1 flex flex-col gap-20 pt-10 max-w-7xl lg:p-5">
          <main className="flex-1 flex flex-col gap-6 px-4">
            <Header2 />
            <Hero3 />
            <ProjectSection />
            <FeatureSteps/>
             
            <Team4 teamMembers={elegantTeamMembers} />
            <TestimonialsGrid />
            <Footer />
          </main>
        </div>

      </div>
    </main>
  );
}
