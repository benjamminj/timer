import Link from "next/link";
import { ReactNode } from "react";
import { Color } from "../lib/getRandomColor";
import { ArrowLeftIcon } from "./ArrowLeftIcon";

interface HeaderProps {
  children?: ReactNode;
  backLink?: string;
  color: Color;
}

export const Header = ({ children, backLink, color }: HeaderProps) => {
  return (
    <header
      className={`sticky top-0 z-10 w-full bg-${color}-100 justify-between items-center p-4 grid grid-cols-3 text-2xl shadow-sm`}
    >
      {backLink && (
        <Link href={backLink}>
          <a className="text-xl text-gray-700 w-8 h-8">
            <ArrowLeftIcon aria-hidden="true" />
            <span className="sr-only">Back</span>
          </a>
        </Link>
      )}

      {children && <span className="text-center">{children}</span>}
    </header>
  );
};
