import React, { ButtonHTMLAttributes, MouseEventHandler } from "react";

interface ContentProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  clickHandler: MouseEventHandler<HTMLButtonElement>
}

const Button = ({ type, clickHandler, children }: React.PropsWithChildren<ContentProps>) => {
  return (
    <button
      type={type}
      onClick={clickHandler}
      className="bg-green-800 text-gray-200 rounded px-4 py-2 my-2 hover:bg-green-700 " >
      {children}
    </button>
  );
};

export default Button;