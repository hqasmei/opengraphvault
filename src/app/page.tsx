import React from 'react';

import Link from 'next/link';

import Modal from '@/components/modal';
import ModalContent from '@/components/modal-content';

import { DATA } from '../consts';

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  return (
    <div className="flex-1 flex flex-col gap-12 max-w-4xl px-4 md:px-6  w-full">
      <div className="flex-1 flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <span className="text-4xl md:text-6xl text-center font-bold">
            Open Graph Vault
          </span>
          <span className="text-center text-lg text-neutral-800 dark:text-neutral-300">
            Where all your open graph images live
          </span>
        </div>

        <div className="text-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {DATA.map((item, idx) => {
            return (
              <Link
                key={idx}
                href={`?ogImageId=${item.id}`}
                scroll={false}
                className="relative group w-full rounded-md border overflow-clip"
              >
                <img
                  className="w-full h-full object-cover object-top rounded-md cursor-pointer shadow-sm transition duration-300 hover:scale-105"
                  src={item.og_image}
                  alt={item.og_title}
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
      </div>
    </div>
  );
}
