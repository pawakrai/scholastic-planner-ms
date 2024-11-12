import React, { ButtonHTMLAttributes, JSXElementConstructor } from "react";
import cn from "classnames";
import s from "./Button.module.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
  spinnerClassName?: string;
  active?: boolean;
  type?: "submit" | "reset" | "button";
  Component?: string | JSXElementConstructor<any>;
  width?: string | number;
  loading?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  icon?: React.ReactNode;
}

export const MainButton = ({
  children,
  spinnerClassName,
  className,
  loading = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        s.rootMainButton,
        `${className ? className : "min-w-main-button"}`
      )}
    >
      {loading ? (
        <svg
          className={`mr-3 h-5 w-5 text-white ml-8 animate-spinloading ${spinnerClassName}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        children
      )}
    </button>
  );
};
