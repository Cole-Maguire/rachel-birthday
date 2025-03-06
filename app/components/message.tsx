import { JSX, useEffect, useState } from "react";

export type MessageProps =
  | {
      message: JSX.Element | string;
      direction: "sent";
    }
  | {
      message: JSX.Element | string;
      direction: "received";
      readWait: number;
      typeWait: number;
    };

export function Message(props: MessageProps): JSX.Element {
  const { message, direction } = props;
  const styles =
    direction === "sent"
      ? "bg-(--bumble-yellow) w-3/4 self-end rounded-xl rounded-br-none p-3 pop"
      : "bg-gray-200  w-3/4 self-start rounded-xl rounded-bl-none p-3 pop";

  const [stage, setStage] = useState<0 | 1 | 2>(
    direction === "received" ? 0 : 2,
  );

  useEffect(() => {
    if (direction === "received") {
      setTimeout(() => {
        setStage(1);
      }, props.readWait);

      setTimeout(() => {
        setStage(2);
      }, props.readWait + props.typeWait);
    }
    // only run at init
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return stage === 0 ? (
    <></>
  ) : stage === 1 ? (
    <div className={styles}>
      <div className="flex h-[30px] w-full grow items-center justify-center gap-3">
        <span className="dot one"></span>
        <span className="dot two"></span>
        <span className="dot three"></span>
      </div>
    </div>
  ) : (
    <div className={styles}>
      <h2>{message}</h2>
    </div>
  );
}
