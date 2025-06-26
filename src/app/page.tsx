'use client';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // useGSAP自体はregisterPlugin不要なのでgsap, ScrollTrigger, ScrollToPluginのみ登録
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  useGSAP(() => {
    const panels = gsap.utils.toArray<HTMLElement>(".panel");
    let scrollTween: gsap.core.Tween | null = null;
    let observer: { disable: () => void; enable: () => void } | null = null;

    if ((ScrollTrigger as unknown as { isTouch: number }).isTouch === 1) {
      observer = (ScrollTrigger as unknown as { normalizeScroll: (b: boolean) => { disable: () => void; enable: () => void } }).normalizeScroll(true);
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (scrollTween) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    };

    document.addEventListener("touchstart", handleTouchStart, {
      capture: true,
      passive: false
    });

    function goToSection(i: number) {
      scrollTween = gsap.to(window, {
        scrollTo: { y: i * window.innerHeight, autoKill: false },
        onStart: () => {
          if (!observer) return;
          observer.disable();
          observer.enable();
        },
        duration: 1,
        onComplete: () => { scrollTween = null; },
        overwrite: true
      });
    }

    panels.forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        start: "top bottom",
        end: "+=199%",
        onToggle: (self: ScrollTrigger) => (self.isActive && !scrollTween && goToSection(i))
      });
    });

    ScrollTrigger.create({
      start: 0,
      end: "max",
      snap: 1 / (panels.length - 1)
    });

    gsap.set('.aboutme', { x: '100vw' });
    gsap.to('.aboutme', { x: -1200, duration: 1 });
    gsap.set('.icon', { x: '100vw' });
    gsap.to('.icon', { x: 0, duration: 2 });
    gsap.set('.aboutmebody', { x: '100vw' });
    gsap.to('.aboutmebody', { x: 0, duration: 3 });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="scroll-container">
      <section className="panel about-me-section h-screen">
        <div className="container mx-auto px-5 h-full">
          <div className="pt-8 mb-8">
            <h1 className="font-bold text-5xl">Portfolio</h1>
          </div>
          
          <div className="px-5">
            <div className="text-end">
              <h2 className="aboutme font-bold text-4xl mb-8">About Me</h2>
              <div className="icon flex flex-col items-end gap-2 mb-8">
                <Link href={"https://github.com/GigaOwO"} className="hover:scale-110 transition-transform">
                  <Image
                    src={"/github-mark.svg"}
                    width={40}
                    height={40}
                    alt="GitHub Icon"
                    className="filter"
                  />
                </Link>
                <div className="bg-amber-500 w-32 h-2 rounded"></div>
              </div>
              <div className="aboutmebody text-lg space-y-2">
                <p>Name: 安野巧真</p>
                <p>Birthday: 2004年11月18日</p>
                <p>Hobby: お菓子作り</p>
                <p>Favorite Food: オムライス</p>
              </div>
            </div>
          </div>
          
          <div className="scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="animate-bounce text-center">
              <p className="text-sm mb-2">Scroll Down</p>
              <div className="arrow-down">
                <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="panel h-screen flex items-center justify-center">
        <div className="container mx-auto px-5">
          <h2 className="font-bold text-4xl mb-8 text-center">Skills</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-100 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-bold text-xl mb-4">Coding</h3>
              <div className="space-y-2">
                <p><span className="font-semibold">Frontend:</span> HTML, CSS, JavaScript, TypeScript, Next.js</p>
                <p><span className="font-semibold">Backend:</span> JavaScript, PHP, Laravel, Python, Django</p>
              </div>
            </div>
            <div className="bg-amber-100 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-bold text-xl mb-4">Management</h3>
              <p>チーム開発のリーダー経験があります。</p>
            </div>
            <div className="bg-emerald-100 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-bold text-xl mb-4">Tools</h3>
              <p>Git, GitHub, Notion, Figma</p>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
        
        .panel {
          position: relative;
          will-change: transform;
          min-height: 100vh;
        }
        
        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
        }
        
        .scroll-container {
          height: auto;
        }
      `}</style>
    </div>
  );
}