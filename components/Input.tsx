import { DetailedHTMLProps, InputHTMLAttributes } from "react";

type InputElementProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type InputProps = {
  label: string;
} & InputElementProps;

export const Input = ({ type = "text", label, ...props }: InputProps) => {
  return (
    <label className="flex flex-col">
      {label}
      <input
        {...props}
        className="text-6 p-4 border-2 border-gray-600 rounded-2xl focus:shadow-outline focus:outline-none"
        type={type}
      />
    </label>
  );
};
