'use client';

import { motion, useScroll } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { scrollYProgress } = useScroll()

  return (
    <>
      <motion.div
        id="scroll-indicator"
        style={{
          scaleX: scrollYProgress,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 10,
          originX: 0,
          backgroundColor: "#f59e0b"
        }}
      />
      <section className="h-screen">
        <div className="container mx-auto px-5 h-full">
          <div className="pt-8 mb-8">
            <h1 className="font-bold text-5xl">Portfolio</h1>
          </div>
          
          <div className="px-5">
            <div className="text-end">
              <h2 className="font-bold text-4xl mb-8">About Me</h2>
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
              <div className="text-lg space-y-2">
                <p>Name: 安野巧真</p>
                <p>Birthday: 2004年11月18日</p>
                <p>Hobby: お菓子作り</p>
                <p>Favorite Food: オムライス</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="h-screen flex items-center justify-center">
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
            <div className="bg-pink-100 backdrop-blur-sm rounded-lg p-6">
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
    </>
  );
}