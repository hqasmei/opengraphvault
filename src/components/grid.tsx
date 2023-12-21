'use client';

import React, { useCallback, useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import Modal from '@/components/modal';
import ModalContent from '@/components/modal-content';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  capitalizeFirstLetter,
  createUrl,
  getAllUniqueTags,
  getUniqueValues,
} from '@/lib/utils';
import withTheme from '@/theme';
import { Drawer, Radio, Select, Space } from 'antd';
import type { DrawerProps } from 'antd/es/drawer';
import type { RadioChangeEvent } from 'antd/es/radio';
import { ListFilter } from 'lucide-react';

import { DATA } from '../consts';

export default function Grid() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(searchParams.get('theme'));
  const [primaryColor, setPrimaryColor] = useState(
    searchParams.get('primaryColor'),
  );
  const [secondaryColors, setSecondaryColors] = useState<string[]>([]);

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

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
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
    <div className=" flex flex-col space-y-2 md:flex-row space-x-4 items-start">
      <aside className="hidden md:flex flex-col space-y-2 px-10">
        <span className="text-lg font-bold">Filters</span>
        <div className="flex flex-col space-y-4 items-start justify-start ">
          <div className="flex flex-col space-y-1">
            <span className="font-medium text-sm">Themes</span>
            {withTheme(
              <Space wrap>
                <Select
                  style={{ width: 160 }}
                  defaultValue={theme === null ? 'all' : theme}
                  onChange={(value) => handleThemeChange(value)}
                  options={[
                    { value: 'all', label: 'All' },
                    { value: 'light', label: 'Light' },
                    { value: 'dark', label: 'Dark' },
                  ]}
                />
              </Space>,
            )}
          </div>
          <div className="flex flex-col space-y-1">
            <span className="font-medium text-sm">Primary color</span>
            {withTheme(
              <Space wrap>
                <Select
                  style={{ width: 160 }}
                  onChange={(value) => handlePrimaryColorChange(value)}
                  placeholder="Primary color"
                  defaultValue={primaryColor === null ? 'all' : primaryColor}
                  options={[
                    { value: 'all', label: 'All' },
                    ...(getUniqueValues('primaryColor') as string[]).map(
                      (color) => ({
                        value: color,
                        label: capitalizeFirstLetter(color),
                      }),
                    ),
                  ]}
                />
              </Space>,
            )}
          </div>
          <div className="flex flex-col space-y-1">
            <span className="font-medium text-sm">Secondary colors</span>
            {withTheme(
              <Space direction="vertical">
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: 160, height: '100%' }}
                  placeholder="Secondary colors"
                  onChange={(values) => handlSecondaryColorsChange(values)}
                  options={[
                    ...(getUniqueValues('secondaryColors') as string[]).map(
                      (color) => ({
                        value: color,
                        label: capitalizeFirstLetter(color),
                      }),
                    ),
                  ]}
                />
              </Space>,
            )}
          </div>
        </div>
      </aside>
      <div className="flex w-full justify-start md:hidden">
        <>
          <Space>
            <Button
              variant="ghost"
              onClick={showDrawer}
              className="flex flex-row space-x-2 items-center justify-center w-full"
            >
              <span className="text-lg">Filter</span>
              <ListFilter />
            </Button>
          </Space>
          <Drawer
            title="Filters"
            placement="left"
            width={500}
            onClose={onClose}
            open={open}
            extra={
              <Space>
                <Button onClick={onClose}>Close</Button>
                <Button variant="secondary" onClick={onClose}>
                  OK
                </Button>
              </Space>
            }
          >
            <div className='flex flex-col space-y-4'>
              <div className="flex flex-col space-y-1">
                <span className="font-medium text-sm text-black">Themes</span>
                {withTheme(
                  <Space wrap>
                    <Select
                      style={{ width: 160 }}
                      defaultValue={theme === null ? 'all' : theme}
                      onChange={(value) => handleThemeChange(value)}
                      options={[
                        { value: 'all', label: 'All' },
                        { value: 'light', label: 'Light' },
                        { value: 'dark', label: 'Dark' },
                      ]}
                    />
                  </Space>,
                )}
              </div>
              <div className="flex flex-col space-y-1">
                <span className="font-medium text-sm text-black">
                  Primary color
                </span>
                {withTheme(
                  <Space wrap>
                    <Select
                      style={{ width: 160 }}
                      onChange={(value) => handlePrimaryColorChange(value)}
                      placeholder="Primary color"
                      defaultValue={
                        primaryColor === null ? 'all' : primaryColor
                      }
                      options={[
                        { value: 'all', label: 'All' },
                        ...(getUniqueValues('primaryColor') as string[]).map(
                          (color) => ({
                            value: color,
                            label: capitalizeFirstLetter(color),
                          }),
                        ),
                      ]}
                    />
                  </Space>,
                )}
              </div>
              <div className="flex flex-col space-y-1">
                <span className="font-medium text-sm text-black">
                  Secondary colors
                </span>
                {withTheme(
                  <Space direction="vertical">
                    <Select
                      mode="multiple"
                      allowClear
                      style={{ width: 160, height: '100%' }}
                      placeholder="Secondary colors"
                      onChange={(values) => handlSecondaryColorsChange(values)}
                      options={[
                        ...(getUniqueValues('secondaryColors') as string[]).map(
                          (color) => ({
                            value: color,
                            label: capitalizeFirstLetter(color),
                          }),
                        ),
                      ]}
                    />
                  </Space>,
                )}
              </div>
            </div>
          </Drawer>
        </>
      </div>

      <div className="text-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-24">
        {filteredData.map((item, idx) => {
          return (
            <Link
              key={idx}
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
          );
        })}

        {!!searchParams.get('ogImageId') && (
          <Modal>
            <ModalContent id={searchParams.get('ogImageId') || ''} />
          </Modal>
        )}
      </div>
    </div>
  );
}
