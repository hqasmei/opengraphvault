'use client';

import React, { useEffect, useState } from 'react';

import Link from 'next/link';

import Modal from '@/components/modal';
import ModalContent from '@/components/modal-content';
import { Skeleton } from '@/components/ui/skeleton';

import { DATA } from '../consts';

type Item = {
  id: string;
  metadata: {
    url: string;
    og_image: string;
    og_title: string;
    og_description: string;
  };
};

export default function Grid({
  searchParams,
}: {
  searchParams: { [key: string]: string | null };
}) {
  // const [data, setData] = useState<Item[]>([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [page, setPage] = useState(1);

  // useEffect(() => {
  //   // Simulate initial data load
  //   loadMoreData();
  // }, []); // Run this effect only once on component mount

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const { scrollTop, clientHeight, scrollHeight } =
  //       document.documentElement;

  //     // Check if the user has scrolled to the bottom
  //     if (scrollTop + clientHeight >= scrollHeight - 10 && !isLoading) {
  //       // Load more data
  //       loadMoreData();
  //     }
  //   };

  //   // Attach the scroll event listener
  //   window.addEventListener('scroll', handleScroll);

  //   // Cleanup the event listener on component unmount
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [isLoading, page]);

  // const loadMoreData = () => {
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     const itemsPerPage = 15;
  //     const startIndex = (page - 1) * itemsPerPage;
  //     const endIndex = startIndex + itemsPerPage;
  //     const moreData = DATA.slice(startIndex, endIndex); // Slice the array based on the current page

  //     if (moreData.length > 0) {
  //       setData((prevData) => [...prevData, ...moreData]);
  //       setPage((prevPage) => prevPage + 1);
  //     }

  //     setIsLoading(false);
  //   }, 2000); // Add a 2-second delay to simulate asynchronous data fetching
  // };
  return (
    <div className="text-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-24">
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
              src={item.metadata.og_image}
              alt={item.metadata.og_title}
              loading="lazy"
            />
          </Link>
        );
      })}

      {/* Adjust the height based on your loader size */}
      {/* {isLoading && (
        <>
          <Skeleton className="h-36" />
          <Skeleton className="h-36" />
          <Skeleton className="h-36" />
        </>
      )} */}

      {!!searchParams.ogImageId && (
        <Modal>
          <ModalContent id={searchParams.ogImageId} />
        </Modal>
      )}
    </div>
  );
}
