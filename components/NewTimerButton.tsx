import Link from "next/link";
import { PlusIcon } from "./PlusIcon";

export const NewTimerButton = () => {
  return (
    <Link href="/new">
      <a className="fixed z-10 bottom-6 right-6 w-24 h-24 flex justify-center items-center border-2 border-black rounded-full bg-black shadow-md hover:scale-105 transform-gpu transition-transform">
        <PlusIcon aria-hidden="true" className="w-12 h-12 text-white" />
        <span className="sr-only">New</span>
      </a>
    </Link>
  );
};
