// Landing page — composes all sections in brief order with 60s revalidation for waitlist count.
import { Nav } from "@/components/sections/Nav";
import { CategoryExamples } from "@/components/sections/CategoryExamples";
import { Footer } from "@/components/sections/Footer";
import { FoundingCohort } from "@/components/sections/FoundingCohort";
import { Gap } from "@/components/sections/Gap";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { StoreMockup } from "@/components/sections/StoreMockup";
import { WaitlistForm } from "@/components/sections/WaitlistForm";

export const revalidate = 60;

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Gap />
        <CategoryExamples />
        <HowItWorks />
        <StoreMockup />
        <FoundingCohort />
        <WaitlistForm />
        <Footer />
      </main>
    </>
  );
}
