import { Intro } from "@/components/sections/Intro";
import { Who } from "@/components/sections/Who";
import { Curious } from "@/components/sections/Curious";
import { Strengths } from "@/components/sections/Strengths";
import { Journey } from "@/components/sections/Journey";
import { Vault } from "@/components/sections/Vault";
import { WhatsNext } from "@/components/sections/WhatsNext";
import { KeepExploring } from "@/components/sections/KeepExploring";
import { ChapterIndicator } from "@/components/ui/ChapterIndicator";
import { Grain } from "@/components/ui/Grain";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export default function App() {
  return (
    <div className="relative">
      <a
        href="#intro"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ember focus:px-4 focus:py-2 focus:font-display focus:text-sm focus:text-ink"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <ChapterIndicator />
      <Grain />
      <main>
        <Intro />
        <Who />
        <Curious />
        <Strengths />
        <Journey />
        <Vault />
        <WhatsNext />
        <KeepExploring />
      </main>
    </div>
  );
}
