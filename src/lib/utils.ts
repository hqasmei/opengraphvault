import { ReadonlyURLSearchParams } from 'next/navigation';

import { DATA } from '@/consts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function findOgImageById(id: string) {
  return DATA.find((item) => item.id === id);
}

export function getAllUniqueTags() {
  const uniqueTags = new Set();

  DATA.forEach((item) => {
    const { tags } = item.metadata;
    tags.forEach((tag) => {
      uniqueTags.add(tag);
    });
  });

  return Array.from(uniqueTags);
}

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams,
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
};
