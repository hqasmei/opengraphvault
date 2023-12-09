import React from 'react';

import Link from 'next/link';

import Grid from '@/components/grid';
import { DATA } from '@/consts';
 
export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | null };
}) {
  return (
    <div className="flex-1 flex flex-col gap-12 max-w-4xl px-4 md:px-6  w-full">
      <div className="flex-1 flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <span className="text-4xl md:text-6xl text-center font-bold">
            Open Graph Vault
          </span>
          <span className="text-center text-lg text-neutral-800 dark:text-neutral-300">
            A collection of <span>{DATA.length - 10}</span> open graph images from
            across the internet.
          </span>
          <span className="text-center">
            Made by{' '}
            <Link
              href="https://twitter.com/hqasmei"
              className="underline"
              target="_blank"
            >
              @hqasmei
            </Link>
          </span>
        </div>
        <Grid searchParams={searchParams} />
      </div>
    </div>
  );
}
