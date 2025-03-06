import Image from "next/image";
import { Dispatch, JSX, SetStateAction } from "react";

type ImageMessageProps = { setTextStep: Dispatch<SetStateAction<number>> };
export function ImageMessage({ setTextStep }: ImageMessageProps): JSX.Element {
  return (
    <>
      <button popoverTarget="helloPopover">
        <Image
          src="/rachel-birthday/sugar_dealt.png"
          alt="Brownies_blurred"
          width={230}
          height={230}
          className="object-cover blur"
        />
      </button>
      <button
        onClick={() => {
          setTextStep((prev) => (prev == 7 ? prev + 1 : prev));
        }}
        popover="auto"
        id="helloPopover"
        popoverTarget="helloPopover"
        popoverTargetAction="hide"
        className="align-center h-full bg-transparent backdrop-blur-md"
      >
        <Image
          src="/rachel-birthday/sugar_dealt.png"
          alt="Brownies"
          width={400}
          height={150}
          className="object-cover"
        />
      </button>
    </>
  );
}
