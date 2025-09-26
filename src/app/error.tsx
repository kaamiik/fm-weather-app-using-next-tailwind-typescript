"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Error() {
  const router = useRouter();

  const handleRetry = () => {
    router.refresh();
  };
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-10 text-center mt-12">
      <Image
        src="/assets/images/icon-error.svg"
        alt=""
        width={42}
        height={50}
      />
      <h1 className={`text-900 font-bold`}>Something went wrong</h1>
      <p className="text-600 font-medium text-neutral-200">
        We couldn’t connect to the server (API error). Please try again in a few
        moments.
      </p>
      <button
        onClick={handleRetry}
        className="flex items-center gap-2.5 py-3 px-4 bg-neutral-800 hover:bg-neutral-600 rounded-8 cursor-pointer"
      >
        <Image
          src={`/assets/images/icon-switch.svg`}
          alt=""
          width={16}
          height={16}
        />
        <span>Retry</span>
      </button>
    </div>
  );
}
