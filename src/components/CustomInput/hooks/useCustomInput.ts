import React, { useState } from "react";

type Props = {
  onKeyDownProp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  preventEnterSubmit: boolean;
  typeProp?: string;
};

export function useCustomInput({
  preventEnterSubmit,
  onKeyDownProp,
  typeProp,
}: Props) {
  const [type, setType] = useState(typeProp);

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (preventEnterSubmit && event.key === "Enter") {
      event.preventDefault();
      if (onKeyDownProp) onKeyDownProp(event);
    }
  }

  function handleShowPassword() {
    setType(type === "password" ? "text" : "password");
  }

  return { onKeyDown, type, handleShowPassword };
}
