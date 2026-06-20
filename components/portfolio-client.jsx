"use client";
import { useEffect, useRef, useState } from "react";
import { paletteForProgress } from "@/lib/day-cycle";
import { CONTENT } from "@/lib/content";
import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/sections/hero";
import { CurrentlyBrewing } from "@/components/sections/currently-brewing";
import { Routine } from "@/components/sections/routine";
import { Projects } from "@/components/sections/projects";
import { MindMap } from "@/components/sections/mind-map";
import { Roadmap } from "@/components/sections/roadmap";
import { GeekMode } from "@/components/sections/geek-mode";
import { ContactFooter } from "@/components/sections/contact-footer";
import { PhaseIndicator } from "@/components/phase-indicator";
import { StarField } from "@/components/star-field";
import { BackgroundElements } from "@/components/background-elements";
import { WhatsAppButton } from "@/components/whatsapp-button";

const INITIAL = paletteForProgress(0);
const SECTION_IDS = ["home", "current", "routine", "mindmap", "projects", "roadmap", "geek", "contact"];

export function PortfolioClient() {
  const [palette, setPalette] = useState(INITIAL);
  const [lang, setLang] = useState("tr");
  const [languageReady, setLanguageReady] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const frame = useRef(null);

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-language");
    if (saved === "tr" || saved === "en") {
      setLang(saved);
    }
    setLanguageReady(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    if (languageReady) {
      window.localStorage.setItem("portfolio-language", lang);
    }
  }, [lang, languageReady]);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      setPalette(paletteForProgress(progress));
      frame.current = null;
    };
    const onScroll = () => {
      if (frame.current !== null) return;
      frame.current = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, []);



  useEffect(() => {
    const pickActiveSection = () => {
      const anchorLine = window.innerHeight * 0.38;
      let current = SECTION_IDS[0];

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= anchorLine && rect.bottom > anchorLine) {
          current = id;
          break;
        }
        if (rect.top <= anchorLine) current = id;
      }

      setActiveSection(current);
    };

    pickActiveSection();
    window.addEventListener("scroll", pickActiveSection, { passive: true });
    window.addEventListener("resize", pickActiveSection);
    return () => {
      window.removeEventListener("scroll", pickActiveSection);
      window.removeEventListener("resize", pickActiveSection);
    };
  }, []);

  const content = CONTENT[lang];

  return (
    <div
      style={{
        backgroundColor: palette.background,
        color: palette.foreground,
        transition: "background-color 1.15s cubic-bezier(0.16, 1, 0.3, 1), color 0.85s ease",
      }}
      className="relative min-h-screen overflow-hidden"
    >
      <StarField visible={palette.isNight} />
      <BackgroundElements palette={palette} />
      <SiteNav
        palette={palette}
        labels={content.nav}
        lang={lang}
        onLanguageToggle={() => setLang((current) => (current === "tr" ? "en" : "tr"))}
        activeSection={activeSection}
      />
      <PhaseIndicator palette={palette} label={content.phaseLabels[palette.phase]} />
      <WhatsAppButton palette={palette} content={content.whatsapp} />

      <main key={lang} className="language-switch relative z-10">
        <Hero palette={palette} content={content.hero} />
        <CurrentlyBrewing palette={palette} content={content.current} />
        <Routine palette={palette} content={content.routine} />
        <MindMap palette={palette} content={content.mindMap} />
        <Projects palette={palette} content={content.projects} />
        <Roadmap palette={palette} content={content.roadmap} />
        <GeekMode palette={palette} content={content.geek} />
        <ContactFooter palette={palette} content={content.contact} />
      </main>
    </div>
  );
}
