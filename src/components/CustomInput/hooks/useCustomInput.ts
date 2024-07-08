import React from "react";

type Props = {
  onKeyDownProp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  preventEnterSubmit: boolean;
};

export function useCustomInput({ preventEnterSubmit, onKeyDownProp }: Props) {
  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (preventEnterSubmit && event.key === "Enter") {
      event.preventDefault();
      if (onKeyDownProp) onKeyDownProp(event);
    }
  }

  return { onKeyDown };
}
