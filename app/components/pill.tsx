import { JSX } from "react";

export function Pill({
  caption,
  icon,
}: {
  caption: string;
  icon: string;
}): JSX.Element {
  return (
    <div className="bg-(--bumble-yellow-med) flex gap-1 rounded-full px-2 py-1 font-normal text-black">
      <span className="material-icons">{icon}</span>
      {caption}
    </div>
  );
}
