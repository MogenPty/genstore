import type { RefObject } from "react";

export const useDropdownPosition = (
  ref: RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement>
) => {
  const getDropdownPosition = () => {
    if (!ref.current) return { top: 0, left: 0 };

    const dropdownWidth = 240; // w-60 / 15rem / 240px
    const rect = ref.current.getBoundingClientRect();

    let dropdownLeft = rect.left + window.scrollX;
    const dropdownTop = rect.bottom + window.scrollY;

    if (dropdownLeft + dropdownWidth > window.innerWidth) {
      dropdownLeft = rect.right + window.scrollX - dropdownWidth; // Align to the right edge

      // If the dropdown exceeds the viewport width, adjust its position
      if (dropdownLeft < 0)
        dropdownLeft = window.innerWidth - dropdownWidth - 16; // 16px for padding
    }

    // If the dropdown exceeds the viewport width, adjust its position
    if (dropdownLeft < 0) dropdownLeft = 16; // 16px for padding

    return {
      top: dropdownTop,
      left: dropdownLeft,
    };
  };

  return { getDropdownPosition };
};
