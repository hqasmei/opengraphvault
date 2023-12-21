'use client';

import React, { useCallback, useState } from 'react';

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

  const theme = searchParams.get('theme');

  const [open, setOpen] = useState(false);

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
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const filteredData = DATA.filter((item) => {
    // If the theme is 'all', include all items
    if (theme === 'all' || !theme) {
      return true;
    }

    // Check if any filter in the item's filters array has 'mode' equal to the selected theme
    return (
      item.metadata.filters &&
      item.metadata.filters.some(
        (filter) => filter.name === 'theme' && filter.value === theme,
      )
    );
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
