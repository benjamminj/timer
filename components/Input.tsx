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
    <>
      <label className="label">
        {label}
        <input {...props} className="input" type={type} />
      </label>
      <style jsx>{`
        .label {
          display: flex;
          flex-direction: column;
        }

        .input {
          font-size: var(--font-size-h6);
          padding: var(--size-m);
          border: 2px solid #000;
          border-radius: var(--border-radius-m);
        }

        .input:focus {
          outline: none;
          box-shadow: 0 0 0 2px rebeccapurple;
        }
      `}</style>
    </>
  );
};
