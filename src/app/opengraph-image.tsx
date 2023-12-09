import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',
          fontSize: 32,
          fontWeight: 600,
        }}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" stroke="#ffff" strokeWidth="1.5">
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
        <div
          style={{
            marginLeft: '14px',
            color: '#fff',
          }}
        >
          Open Graph Vault
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
