"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Message, MessageProps } from "../components/message";

export default function Messages() {
  const [textStep, setTextStep] = useState(0);
  const [messages, setMessages] = useState<MessageProps[]>([
    {
      message: "Hi there!",
      direction: "received",
      readWait: 1000,
      typeWait: 1000,
    },
    {
      message:
        "So it looks like it's your birthday, huh? Well in that case, I hope you have an incredible birthday in a (not-so) far-off land!",
      direction: "received",
      readWait: 100,
      typeWait: 2500,
    },
    {
      message:
        "and, if it's not too forward for a guy you've clearly just swiped right on 30 seconds ago, then I want to say that I love you very much.",
      direction: "received",
      readWait: 300,
      typeWait: 3000,
    },
    {
      message:
        "but also, I brought presents! First, I'm going to send an image (and I promise it isn't the kind of image people usually send on dating apps)",
      direction: "received",
      readWait: 50,
      typeWait: 1500,
    },
    {
      message: "<SUGAR_DEALER_IMAGE>",
      direction: "received",
      readWait: 0,
      typeWait: 0,
    },
    {
      message:
        "Then, I wanted to make sure you could sleep at night while you're on holiday, so I managed to track down what I think might be an old favourite (I've got a higher quality version hiding away at home as well)",
      direction: "received",
      readWait: 100,
      typeWait: 1500,
    },
    {
      message: "<AUDIO>",
      direction: "received",
      readWait: 0,
      typeWait: 0,
    },
    {
      message: "Finally, I want you to look behind you",
      direction: "received",
      readWait: 100,
      typeWait: 800,
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  const onTextSubmit = () => {
    console.debug(textStep);
    if (inputRef.current) {
      const sentMessage = inputRef.current.value;
      setMessages((prev) => {
        const newPrev = [...prev]; // because of reacts state nonsense
        newPrev.splice(textStep, 0, {
          message: sentMessage,
          direction: "sent",
        });
        console.debug(newPrev);
        return newPrev;
      });
      inputRef.current.value = "";
      setTextStep((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const scriptWait = (expectedStep: number): void => {
      if (textStep == expectedStep) {
        const wait = messages
          .slice(expectedStep - 1, expectedStep + 1)
          .reduce<number>(
            (total, message) =>
              total +
              (message.direction === "received"
                ? message.readWait + message.typeWait
                : 0),
            0,
          );

        setTimeout(() => {
          setTextStep((prev) => prev + 1);
        }, wait);
      }
    };

    //janky af scripting
    scriptWait(1);
    scriptWait(2);
    scriptWait(3);
    scriptWait(4);
    scriptWait(5);
    scriptWait(6); // todo -replace with script on image open

    scriptWait(7);
    scriptWait(8);
  }, [textStep, messages]);

  return (
    <div className="flex h-dvh min-h-screen grid-flow-row flex-col overflow-hidden font-[family-name:var(--bumble-font)]">
      <header className="flex h-[50px] w-full min-w-min shrink items-center justify-between p-8">
        <div className="flex items-center gap-2">
          <div className="material-icons text-[var(--bumble-background-text)]">
            arrow_back_ios
          </div>
          <Image
            src="/rachel-birthday/my-face.jpg"
            alt="My face"
            width={40}
            height={40}
            sizes="100vw"
            className="border-3 overflow-hidden rounded-full border-white object-cover"
            priority
          />
          <h2 className="text-xl font-bold">Cole Maguire</h2>
        </div>
        <div className="flex items-center gap-2 text-[var(--bumble-background-text)]">
          <span className="material-icons">videocam</span>
          <span className="material-icons">more_vert</span>
        </div>
      </header>
      <main className="border-y-1 font-l flex h-full w-full flex-1 flex-col gap-4 overflow-scroll border-gray-400 p-8 font-medium">
        {textStep > 0 &&
          messages
            .slice(0, textStep + 1)
            .map((message, i) => (
              <Message
                key={i}
                direction={message.direction}
                message={message.message}
                readWait={"readWait" in message ? message.readWait : 0}
                typeWait={"typeWait" in message ? message.typeWait : 0}
              />
            ))}
      </main>
      <footer className="flex h-[70px] flex-wrap items-center justify-evenly">
        <div className="flex w-full items-center gap-2 p-4">
          <input
            type="text"
            placeholder={
              textStep === 0 ? "Be the one to send the first message!" : "Aa"
            }
            className="grow rounded-full border border-gray-200 p-2"
            ref={inputRef}
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                onTextSubmit();
              }
            }}
          />
          <button onClick={onTextSubmit}>
            <span className="material-icons text-[var(--bumble-background-text)]">
              send
            </span>
          </button>
        </div>
      </footer>
    </div>
  );
}
