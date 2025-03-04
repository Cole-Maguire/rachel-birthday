"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent, TouchEvent, useRef, useState } from "react";

export default function Messages() {
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const router = useRouter();
  const popoverRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex grid h-dvh min-h-screen grid-flow-row gap-6 overflow-hidden p-8 font-[family-name:var(--bumble-font)]">
      <header className="flex w-full min-w-min shrink justify-between">
        <div>
          <Image
            className="dark:invert"
            src="/rachel-birthday/bumble-logo.png"
            alt="bumble logo"
            width={100}
            height={24}
            priority
          />
        </div>
        <span className="material-icons">tune</span>
      </header>
      <main className="bg-(--bumble-yellow-light) h-full w-full flex-1 overflow-scroll rounded-lg"></main>
      <footer className="flex flex-wrap items-center justify-evenly"></footer>
    </div>
  );
}
