import React from "react";
import { DATA } from "../consts";
import Link from "next/link";

export default function Output() {
  return (
    <div className="text-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {DATA.map((item, idx) => {
        return (
          <Link
            key={idx}
            href={item.url}
            target="_blank"
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
    </div>
  );
}

// <div key={idx} className="flex-1">
//   {/* <span>{item.og_title}</span> */}
//   <img src={item.og_image} alt={item.og_title} className="rounded shadow" />
// </div>
