import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DATA } from "@/consts";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function findOgImageById(id: string) {
  return DATA.find((item) => item.id === id);
}
