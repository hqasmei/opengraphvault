'use client';

import React, { useCallback, useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import Modal from '@/components/modal';
import ModalContent from '@/components/modal-content';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import useMediaQuery from '@/hooks/use-media-query';
import {
  capitalizeFirstLetter,
  createUrl,
  getAllUniqueTags,
  getUniqueValues,
} from '@/lib/utils';
import withTheme from '@/theme';
import { Drawer, Select, Space } from 'antd';
import { ArrowLeftToLine, ChevronUp, ListFilter, SearchX } from 'lucide-react';

import { DATA } from '../consts';
import { Separator } from './ui/separator';

type AccordionStates = {
  [key: string]: boolean;
};

export default function Grid() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);
  const [openAccordions, setOpenAccordions] = useState<AccordionStates>({
    themesAccordion: true,
  });

  const [theme, setTheme] = useState(searchParams.get('theme'));
  const [primaryColor, setPrimaryColor] = useState(
    searchParams.get('primaryColor'),
  );
  const [secondaryColors, setSecondaryColors] = useState<string[]>([]);
  // const tags = getAllUniqueTags();

  // console.log(tags);

  const { isMobile } = useMediaQuery();

  const toggleAccordion = (accordionKey: string) => {
    setOpenAccordions((prevState) => ({
      ...prevState,
      [accordionKey]: !prevState[accordionKey],
    }));
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleThemeChange = (value: string) => {
    router.push(pathname + `?` + createQueryString('theme', value));
    setTheme(value);
  };

  const handlePrimaryColorChange = (value: string) => {
    router.push(pathname + `?` + createQueryString('primaryColor', value));
    setPrimaryColor(value);
  };

  const handlSecondaryColorsChange = (values: string[]) => {
    const queryParams = values.map(
      (color) => `secondaryColors=${encodeURIComponent(color)}`,
    );
    const queryString = queryParams.join('&');
    router.push(pathname + `?` + queryString);
    setSecondaryColors(values);
  };

  const filteredData = DATA.filter((item) => {
    // If the theme is 'all' or undefined, include all items
    const themeFilter =
      !theme ||
      theme === 'all' ||
      (item.metadata.filters &&
        item.metadata.filters.some(
          (filter) => filter.name === 'theme' && filter.value === theme,
        ));

    // If the primaryColor is 'all' or undefined, include all items
    const primaryColorFilter =
      !primaryColor ||
      primaryColor === 'all' ||
      (item.metadata.filters &&
        item.metadata.filters.some(
          (filter) =>
            filter.name === 'primaryColor' && filter.value === primaryColor,
        ));

    const secondaryColorsFilter =
      !secondaryColors ||
      secondaryColors.length === 0 ||
      (item.metadata.filters &&
        item.metadata.filters.some((filter) => {
          if (filter.name === 'secondaryColors') {
            const filterValue = filter.value as string[];
            return Array.isArray(filterValue)
              ? filterValue.some((color) =>
                  secondaryColors.includes(color as string),
                )
              : secondaryColors.includes(filterValue as string);
          }
          return false;
        }));

    return themeFilter && primaryColorFilter && secondaryColorsFilter;
  });

  return (
    <div className="relative w-full h-screen">
      {!open && (
        <>
          <div className="flex flex-col space-y-4 md:space-y-6 items-start w-full">
            <div className="flex w-full justify-start border-b items-center  h-16  px-4 md:px-8">
              <button
                onClick={() => {
                  setOpen(true);
                }}
                className="flex flex-row space-x-2 w-full md:px-3 md:w-auto rounded-lg border items-center justify-center p-1 hover:bg-secondary duration-200 cursor-pointer"
              >
                <ListFilter size={18} />
                <span>Filter</span>
              </button>
            </div>
          </div>
          <div className="text-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-24 px-4 md:px-8 mt-8">
            {filteredData.map((item, idx) => {
              return (
                <div key={idx} className="flex flex-col space-y-2">
                  <Link
                    href={`?ogImageId=${item.id}`}
                    scroll={false}
                    className="relative group w-full rounded-md border overflow-clip"
                  >
                    <img
                      className="w-full h-full object-cover object-top rounded-md cursor-pointer shadow-sm transition duration-300 hover:scale-105"
                      src={item.metadata.og_image}
                      alt={item.metadata.og_title}
                      loading="lazy"
                    />
                  </Link>
                  <div className="flex flex-row space-x-1">
                    {item?.metadata.tags &&
                      item?.metadata.tags.map((tag, idx) => {
                        return (
                          <Badge key={idx} className="" variant="secondary">
                            {tag}
                          </Badge>
                        );
                      })}
                  </div>
                  <span className="line-clamp-1 font-semibold">
                    {item.metadata.og_title}
                  </span>
                </div>
              );
            })}

            {!!searchParams.get('ogImageId') && (
              <Modal>
                <ModalContent id={searchParams.get('ogImageId') || ''} />
              </Modal>
            )}
          </div>
        </>
      )}
      {open && isMobile && (
        <>
          <div className="absolute top-0 right-0 bottom-0 left-0 bg-opacity-70 bg-neutral-800 z-10"></div>
          <div className="w-[256px] top-0 bottom-0 absolute h-full bg-background border-r z-10">
            <div className="flex flex-row justify-between items-center p-4">
              <div className="flex flex-row space-x-2 items-center">
                <ListFilter size={18} />
                <span>Filter</span>
              </div>
              <button
                onClick={() => {
                  setOpen(false);
                }}
              >
                <ArrowLeftToLine
                  size={18}
                  className="text-primary/80 hover:text-primary duration-200"
                />
              </button>
            </div>

            <Separator />

            <div className="m-4 pb-4 border-b border-dotted flex flex-col">
              <div className="flex flex-row justify-between items-center">
                <span>Themes</span>
                <button onClick={() => toggleAccordion('themesAccordion')}>
                  <ChevronUp
                    size={14}
                    className={
                      openAccordions['themesAccordion']
                        ? 'rotate-0 duration-500'
                        : 'rotate-180 duration-500'
                    }
                  />
                </button>
              </div>

              {openAccordions['themesAccordion'] && (
                <div className="mt-4 flex flex-wrap space-x-2">
                  <button className="p-2 border rounded-lg">Light</button>
                  <button className="p-2 border rounded-lg">Dark</button>
                </div>
              )}
            </div>
          </div>
          <div className="text-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-24 px-4 md:px-8 mt-8">
            {filteredData.map((item, idx) => {
              return (
                <div key={idx} className="flex flex-col space-y-2">
                  <Link
                    href={`?ogImageId=${item.id}`}
                    scroll={false}
                    className="relative group w-full rounded-md border overflow-clip"
                  >
                    <img
                      className="w-full h-full object-cover object-top rounded-md cursor-pointer shadow-sm transition duration-300 hover:scale-105"
                      src={item.metadata.og_image}
                      alt={item.metadata.og_title}
                      loading="lazy"
                    />
                  </Link>
                  <div className="flex flex-row space-x-1">
                    {item?.metadata.tags &&
                      item?.metadata.tags.map((tag, idx) => {
                        return (
                          <Badge key={idx} className="" variant="secondary">
                            {tag}
                          </Badge>
                        );
                      })}
                  </div>
                  <span className="line-clamp-1 font-semibold">
                    {item.metadata.og_title}
                  </span>
                </div>
              );
            })}

            {!!searchParams.get('ogImageId') && (
              <Modal>
                <ModalContent id={searchParams.get('ogImageId') || ''} />
              </Modal>
            )}
          </div>
        </>
      )}

      {open && !isMobile && (
        <>
          <div className="absolute w-[256px] bg-background flex-1">
            <div className="flex flex-row justify-between items-center h-[63px] px-4">
              <div className="flex flex-row space-x-2 items-center">
                <ListFilter size={18} />
                <span>Filter</span>
              </div>
              <button
                onClick={() => {
                  setOpen(false);
                }}
              >
                <ArrowLeftToLine
                  size={18}
                  className="text-primary/80 hover:text-primary duration-200"
                />
              </button>
            </div>

            <Separator />

            <div className="m-4 pb-4 border-b border-dotted flex flex-col">
              <div className="flex flex-row justify-between items-center">
                <span>Themes</span>
                <button onClick={() => toggleAccordion('themesAccordion')}>
                  <ChevronUp
                    size={14}
                    className={
                      openAccordions['themesAccordion']
                        ? 'rotate-0 duration-500'
                        : 'rotate-180 duration-500'
                    }
                  />
                </button>
              </div>

              {openAccordions['themesAccordion'] && (
                <div className="mt-4 flex flex-wrap space-x-2">
                  <button
                    className="p-2 border rounded-lg"
                    onClick={() => handleThemeChange('light')}
                  >
                    Light
                  </button>
                  <button
                    className="p-2 border rounded-lg"
                    onClick={() => handleThemeChange('dark')}
                  >
                    Dark
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-grow flex-col border-l  ml-[256px]">
            <div className="flex flex-col space-y-4 md:space-y-6 items-start w-full">
              <div className="flex w-full justify-start border-b h-16 px-4 md:px-8 items-center">
                <button
                  onClick={() => {
                    setOpen(true);
                  }}
                  className="hidden flex-row space-x-2 w-full md:px-3 md:w-auto rounded-lg border items-center justify-center p-1 hover:bg-secondary duration-200 cursor-pointer"
                >
                  <ListFilter size={18} />
                  <span>Filter</span>
                </button>
                {/* <Separator  orientation="vertical" className='ml-6 h-10'/> */}
              </div>
            </div>
            <div className="text-white grid grid-cols-1 sm:grid-cols-2 gap-6 pb-24 px-4 md:px-8 mt-8">
              {filteredData.map((item, idx) => {
                return (
                  <div key={idx} className="flex flex-col space-y-2">
                    <Link
                      href={`?ogImageId=${item.id}`}
                      scroll={false}
                      className="relative group w-full rounded-md border overflow-clip"
                    >
                      <img
                        className="w-full h-full object-cover object-top rounded-md cursor-pointer shadow-sm transition duration-300 hover:scale-105"
                        src={item.metadata.og_image}
                        alt={item.metadata.og_title}
                        loading="lazy"
                      />
                    </Link>
                    <div className="flex flex-row space-x-1">
                      {item?.metadata.tags &&
                        item?.metadata.tags.map((tag, idx) => {
                          return (
                            <Badge key={idx} className="" variant="secondary">
                              {tag}
                            </Badge>
                          );
                        })}
                    </div>
                    <span className="line-clamp-1 font-semibold">
                      {item.metadata.og_title}
                    </span>
                  </div>
                );
              })}

              {!!searchParams.get('ogImageId') && (
                <Modal>
                  <ModalContent id={searchParams.get('ogImageId') || ''} />
                </Modal>
              )}
            </div>
          </div>
        </>
      )}

      {filteredData.length === 0 && (
        <div className="w-full items-center justify-center flex-1 flex py-20 flex-col space-y-4">
          <SearchX size={100} />
          <div className="flex flex-col space-y-2 items-center justify-center">
            <span className="text-neutral-400">No matching items found</span>
            <span className="font-semibold">
              Try changing your search criteria
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
