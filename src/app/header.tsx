import Link from 'next/link';

import { ModeToggle } from './theme-toggle';

export async function Header() {
  return (
    <div className="border-b py-4 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex flex-row items-center space-x-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              fill="none"
              className="dark:stroke-white stroke-black transition-colors duration-200"
              strokeWidth="2.25"
            >
              <path strokeLinecap="round" d="M6 7v1m0 9v-5" />
              <path d="M11 12a3 3 0 1 1 6 0a3 3 0 0 1-6 0Z" />
              <path
                strokeLinecap="round"
                d="M12.5 9.401a3 3 0 1 1-1.099 1.099m5.099-1L18 8m-8 8l1.5-1.5m0-5L10 8m8 8l-1.5-1.5"
              />
              <path
                strokeLinecap="round"
                d="M22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464c.974.974 1.3 2.343 1.41 4.536"
              />
            </g>
          </svg>
          <span className="font-semibold text-lg">Open Graph Vault</span>
        </Link>

        <div className="flex justify-between gap-8 items-center">
          {/* <Link href="/submit">Submit</Link> */}
          <Link href="https://plausible.io/opengraphvault.com/" target="_blank">
            Analytics
          </Link>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
