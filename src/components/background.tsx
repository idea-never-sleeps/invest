'use client';

import Image from 'next/image';

export default function LineBackground() {
  return (
    <div className="-z-10 w-2/5 h-1/3 p-80 opacity-30 absolute select-none">
      <Image
        src="/line.svg"
        alt="background"
        layout="fill"
      />
    </div>
  )
}