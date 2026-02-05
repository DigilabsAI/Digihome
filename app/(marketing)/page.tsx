import { Hero3 } from "@/components/blocks/hero3";
import Team4 from "@/components/blocks/team-4";
import Footer from "@/components/blocks/footer";
import FeatureSteps from "@/components/blocks/feature-2";
import ProjectSection from "@/components/blocks/projectSection";
import TestimonialsGrid from "@/components/blocks/testimonials-grid";
import CTA2 from "@/components/blocks/cta-2";
import {
  title,
  subtitle,
  departments,
  heading,
  description,
  reviews,
  workflow,
  footerSections,
  projects,
  elegantTeamMembers,
  totalClients,
  totalProjects,
  TESTIMONIALS
} from "@/public/constants";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <section className="bg-background">
        <div className="max-w-7xl mx-auto px-4 lg:px-5">
          <Hero3
            heading={heading}
            description={description}
            reviews={reviews}
            totalClients={totalClients}
            totalProjects={totalProjects}
          />
        </div>
      </section>

      <section className="bg-secondary py-10">
        <div className="max-w-7xl mx-auto px-4 lg:px-5">
          <FeatureSteps workflow={workflow} />
          <ProjectSection projects={projects} />
        </div>
      </section>

      <section className="bg-background">
        <div className="max-w-7xl mx-auto px-4 lg:px-5">
          <Team4
            title={title}
            subtitle={subtitle}
            teamMembers={elegantTeamMembers}
            departments={departments}
          />
        </div>
      </section>

      <section className="bg-secondary py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-5">
          <TestimonialsGrid testimonials={TESTIMONIALS}/>
          <CTA2 />
        </div>
      </section>

      <section className="bg-background">
        <div className="max-w-7xl mx-auto px-4 lg:px-5">
          <Footer FooterData={footerSections} />
        </div>
      </section>
    </main>
  );
}
