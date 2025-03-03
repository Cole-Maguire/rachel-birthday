"use client";

import Image from "next/image";
import { useState, useRef, MouseEvent, TouchEvent } from "react";
import { Pill } from "./components/pill";

export default function Home() {
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);

  const handleDragStart = (e: MouseEvent | TouchEvent) => {
    setIsDragging(true);
    startXRef.current = "touches" in e ? e.touches[0].clientX : e.clientX;
  };

  const handleDragMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    const currentX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const diff = currentX - startXRef.current;
    if (Math.abs(diff) > 40) setOffset(diff); // prevent slightly diagonal scrolling from cauysing issues
  };

  const swipeLeft = () => {
    alert("Are you sure about that?");
  };

  const swipeRight = () => {
    console.debug('show "its a match! popup');
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (Math.abs(offset) > 200) {
      // Swipe threshold
      const direction = offset > 0 ? "right" : "left";
      console.log(`Swiped ${direction}`);
      if (direction === "left") {
        swipeLeft();
      } else {
        swipeRight();
      }
    }
    setOffset(0);
  };

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
      <main
        className="bg-(--bumble-yellow-light) h-full w-full flex-1 overflow-scroll rounded-lg"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        style={{
          transform: `translateX(${offset * 1.5}px) rotate(${offset / 500}rad)`,
        }}
      >
        <div className="h-vh min-h-min w-full flex-1 flex-col items-center gap-8 rounded-lg font-medium transition-transform sm:items-start">
          <div>
            <Image
              src="/rachel-birthday/blurred-main.png"
              alt="My face"
              width={0}
              height={0}
              sizes="100vw"
              className="h-full w-full overflow-hidden rounded-t-lg object-cover"
              priority
            />
            <div className="relative -mt-24 mb-4 px-4 text-white">
              <div className="text-lg font-bold">Cole Maguire, 28</div>
              <div>He/Him</div>
              <div>Software Developer</div>
            </div>
          </div>

          <div className="p-4">
            <div className="text-[var(--bumble-background-text)]">About me</div>
            I&apos;m just a boy looking for a very special girl on her birthday.
            Do you think you could help me?
            <div className="text-[var(--bumble-background-text)]">
              My basics
              <div className="flex flex-wrap gap-1 py-2">
                <Pill caption="Active-ish" icon="fitness_center" />
                <Pill caption="Man" icon="man" />
                <Pill caption="Short King" icon="straighten" />
                <Pill caption="On very special occasions" icon="wine_bar" />
                <Pill caption="Absolutely not" icon="stroller" />
                <Pill caption="Too many" icon="directions_bike" />
                <Pill caption="Very obsessive" icon="train" />
              </div>
            </div>
          </div>
          <Image
            src="/rachel-birthday/back-fall.jpg"
            alt="My face"
            width={0}
            height={0}
            sizes="100vw"
            className="h-full w-full overflow-hidden object-cover" // optional
            priority
          />
          <div className="p-4">
            PS: I think that means you should swipe right
          </div>
          <Image
            src="/rachel-birthday/my-face.jpg"
            alt="My face"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full overflow-hidden object-cover" // optional
            priority
          />
        </div>
      </main>
      <footer className="flex flex-wrap items-center justify-evenly">
        <button
          className="flex h-[70px] w-[70px] items-center justify-center rounded-full text-[var(--bumble-background-text)] shadow-2xl active:bg-gray-200"
          onClick={swipeLeft}
        >
          <span className="material-icons text-6xl! select-none">close</span>
        </button>
        <button
          className="flex h-[70px] w-[70px] items-center justify-center rounded-full text-[var(--bumble-yellow)] shadow-2xl active:bg-gray-200"
          onClick={swipeRight}
        >
          <span className="material-icons text-6xl! select-none">favorite</span>
        </button>
      </footer>
    </div>
  );
}
