import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button = ({
  children,
  type = "button",
  // eslint-disable-next-line
  className,
  disabled,
  ...props
}: ButtonProps) => {
  if (disabled) {
    return (
      <button
        className="w-full text-8 py-4 px-8 rounded-2xl text-gray-500 border-gray-400 border-2  bg-gray-200 cursor-not-allowed"
        type={type}
        disabled
        {...props}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      className="w-full text-xl text-gray-900 py-4 px-8 rounded-2xl border-gray-900 border-2 hover:bg-gray-900 hover:text-white focus:shadow-outline focus:outline-none disabled:bg-gray-600"
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};
