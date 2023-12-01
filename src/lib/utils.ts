import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatPhoneNumberInput = (input: string) => {
  const cleaned = ("" + input).replace(/\D/g, "");

  const part1 = cleaned.slice(0, 3);
  const part2 = cleaned.slice(3, 7);
  const part3 = cleaned.slice(7, 11);

  if (cleaned.length > 7) {
    return `${part1}-${part2}-${part3}`;
  } else if (cleaned.length > 3) {
    return `${part1}-${part2}`;
  } else {
    return part1;
  }
};
