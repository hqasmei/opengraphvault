'use client';

import React, { ReactNode, useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import Modal from '@/components/modal';
import ModalContent from '@/components/modal-content';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { createUrl, getAllUniqueTags } from '@/lib/utils';

import { DATA } from '../consts';
import { Button } from './ui/button';

type Item = {
  id: string;
  metadata: {
    url: string;
    og_image: string;
    og_title: string;
    og_description: string;
    tags: string[];
    filters: { name: string; value: string }[];
  };
};

export default function Grid({
  searchParams,
}: {
  searchParams: { [key: string]: string | null };
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleModeChange = (mode: string) => {
    router.replace(`?mode=${mode}`, undefined);
  };

  const filteredData = searchParams.mode
    ? DATA.filter((item) => {
        const modeFilter =
          item.metadata.filters &&
          item.metadata.filters.find(
            (filter) =>
              filter.name === 'mode' && filter.value === searchParams.mode,
          );
        return modeFilter ? true : false;
      })
    : DATA;

  return (
    <>
      <div className="flex flex-col space-y-2">
        <span>Theme</span>
        <div className="space-x-2">
          <Button variant="secondary" onClick={() => handleModeChange('dark')}>
            Dark
          </Button>
          <Button variant="secondary" onClick={() => handleModeChange('light')}>
            Light
          </Button>
        </div>
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

        {!!searchParams.ogImageId && (
          <Modal>
            <ModalContent id={searchParams.ogImageId} />
          </Modal>
        )}
      </div>
    </>
  );
}
