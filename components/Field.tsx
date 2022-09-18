import React from "react";

type ContentProps = {
  label: string
}

const Field = ({ label, children }: React.PropsWithChildren<ContentProps>) => {
  return (
    <label className="block my-2">
      <span className="block test-sm text-gray-600">{label}</span>
      {children}
    </label>
  );
};

export default Field;