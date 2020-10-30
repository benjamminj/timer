import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button = ({
  children,
  type = "button",
  ...props
}: ButtonProps) => {
  return (
    <button type={type} {...props}>
      {children}
      <style jsx>
        {`
          button {
            font-size: var(--font-size-h4);
            padding: var(--size-m) var(--size-xl);
            border-radius: var(--border-radius-m);
            border: 2px solid black;
          }

          button:disabled {
            border-color: #555;
            background: #eee;
            color: #777;
            cursor: not-allowed;
          }

          button:hover {
            cursor: pointer;
          }

          button:focus {
            outline: none;
            box-shadow: 0 0 0 2px rebeccapurple;
          }
        `}
      </style>
    </button>
  );
};
