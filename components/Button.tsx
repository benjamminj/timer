import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { Color } from "../lib/getRandomColor";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { tag?: keyof HTMLElementTagNameMap; color?: Color };

export const Button = ({
  children,
  type = "button",
  className,
  disabled,
  tag = "button",
  color = "gray",
  ...props
}: ButtonProps) => {
  return React.createElement(
    tag,
    {
      className: `
        w-full py-4 px-8 rounded-2xl
        text-xl text-${color}-900 
        border-2 border-${color}-200
        bg-${color}-100 
        transition-colors
        focus:shadow-outline hover:text-white focus:outline-none 
        disabled:bg-${color}-300 disabled:border-${color}-300 disabled:bg-transparent disabled:text-${color}-700 disabled:cursor-not-allowed 
        hover:bg-${color}-700 hover:border-${color}-700 
        ${className || ""}
      `,
      disabled,
      type,
      ...props,
    },
    children
  );
};
