'use client';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  gsap.registerPlugin(useGSAP)
  

  useGSAP(() => {
    gsap.set('.aboutme', { x: '100vw' });
    gsap.to('.aboutme', { x: -1200, duration: 1 })
    gsap.set('.icon', { x: '100vw' });
    gsap.to('.icon', { x: 0, duration: 2 })
    gsap.set('.aboutmebody', { x: '100vw' });
    gsap.to('.aboutmebody', { x: 0, duration: 3 })
  })

 
  return (
    <div className="mx-auto my-5 container">
      <h1 className="font-bold text-5xl">Portfolio</h1>
      <section className="text-end">
        <h2 className="aboutme font-bold text-4xl">About me</h2>
        <div className="icon flex flex-col items-end gap-2">
          <Link href={"https://github.com/GigaOwO"}>
            <Image
              src={"/github-mark.svg"}
              width={40}
              height={40}
              alt="GitHub Icon" 
            />
          </Link>
          <div className="bg-amber-500 w-3xl h-2"></div>
        </div>
        <div className="aboutmebody">
          <p>Name: 安野巧真</p>
          <p>Birthday: 2004年11月18日</p>
          <p>Hobby: お菓子作り</p>
          <p>Favorite Food: オムライス</p>
        </div>
      </section>
      <section>
        <h2 className="">Skill</h2>
        <div>
          <p>Coding</p>
          <p>Frontend: HTML CSS Javascript Typescript Next.js</p>
          <p>Backend: Javascript PHP Laravel Python Django</p>
        </div>
        <div>
          <p>Management</p>
          <p>チーム開発のリーダー経験があります。</p>
        </div>
        <div>
          <p>Tool</p>
          <p>Git GitHub Notion Figma</p>
        </div>
      </section>
    </div>
  );
}
