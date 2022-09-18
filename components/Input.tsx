import React, { ChangeEventHandler } from "react";

type ContentProps = {
  type: string,
  value: string,
  required?: boolean,
  onChange: ChangeEventHandler<HTMLInputElement>,
}

const Input: React.FC<ContentProps> = ({ type, value, required = false, onChange }) => {
  return (
    <input
      type={type}
      value={value}
      required={required}
      onChange={onChange}
      className="border rounded py-1 px-3 w-80" />
  );
};

export default Input;