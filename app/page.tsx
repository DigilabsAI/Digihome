import { DeployButton } from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import { Hero3 } from "@/components/hero3";
import Header2 from "@/components/mvpblocks/header-2";
import ContentSection from "@/components/content-1";
import Team4 from "@/components/mvpblocks/team-4";
import { elegantTeamMembers } from "@/components/mvpblocks/team-4";
import { Community1 } from "@/components/community1";
import Footer from "@/components/footer";
import Testimonials from "@/components/testimonials";
export default function Home() {
  //TODO: Enable Theme Switcher
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <div className="flex-1 flex flex-col gap-20 pt-10 max-w-7xl lg:p-5">
          <main className="flex-1 flex flex-col gap-6 px-4">
            <Header2 />
            <Hero3 />
            <ThemeSwitcher />
            {/* <ContentSection /> */}
            {/* <Testimonials /> */}  
            <Team4 teamMembers={elegantTeamMembers} />
            <Community1 />
            <Footer />
          </main>
        </div>
        
        {/*   <ThemeSwitcher /> */}
      </div>
    </main>
  );
}
