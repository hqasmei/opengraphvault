import React from 'react';

import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DATA } from '@/consts';

export default async function Home() {
  return (
    <div className="flex-1 flex flex-col   items-center py-16 justify-center relative  w-full">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_34px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="flex flex-col space-y-2 mb-6">
        <span className="text-4xl md:text-6xl text-center font-bold max-w-2xl z-10 mb-2">
          Discover and explore open graph images
        </span>
        <span className="text-center text-lg text-neutral-800 dark:text-neutral-300">
          A collection of +<span>{DATA.length}</span> open graph images from
          across the internet.
        </span>
        <span className="text-center  mb-16">
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

      <div className="text-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 md:px-8 mt-8">
        {DATA.slice(0, 6).map((item, idx) => {
          return (
            <div key={idx} className="flex flex-col space-y-2">
              <div className="relative group w-full rounded-md border overflow-clip">
                <img
                  className="w-full h-full object-cover object-top rounded-md cursor-pointer shadow-sm transition duration-300 hover:scale-105"
                  src={item.metadata.og_image}
                  alt={item.metadata.og_title}
                  loading="lazy"
                />
              </div>
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
      </div>

      <Link
        href="/explore"
        className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded mb-24 mt-10 cursor-pointer pointer-events-auto z-30"
      >
        Browse more
      </Link>
    </div>
  );
}
