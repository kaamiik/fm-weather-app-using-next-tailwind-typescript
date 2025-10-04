import * as React from 'react';
import { useSearchParams } from 'next/navigation';

function SearchButton({ loading }: { loading: boolean }) {
  const searchParams = useSearchParams();
  const loadingOnInitial = searchParams.get('loading') === 'location';
  return (
    <button
      disabled={loading}
      className={`rounded-12 grid w-full bg-blue-500 py-4 focus:outline-0 md:px-6 ${loadingOnInitial ? 'hover-bg-blue-500 cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-blue-700 focus:shadow-(--my-shadow-button)'}`}
    >
      <span className={`col-1 row-1 mt-1 ${loading ? 'invisible' : ''}`}>
        Search
      </span>
      <span
        className={`col-1 row-1 justify-self-center ${
          !loading ? 'invisible' : ''
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="none"
          viewBox="0 0 16 16"
          className="animate-fast-spin motion-reduce:animate-none"
        >
          <path
            fill="#fff"
            d="M9.25 1.5c0 .719-.563 1.25-1.25 1.25-.719 0-1.25-.531-1.25-1.25C6.75.812 7.281.25 8 .25c.688 0 1.25.563 1.25 1.25ZM8 13.25c.688 0 1.25.563 1.25 1.25 0 .719-.563 1.25-1.25 1.25-.719 0-1.25-.531-1.25-1.25 0-.688.531-1.25 1.25-1.25ZM15.75 8c0 .719-.563 1.25-1.25 1.25-.719 0-1.25-.531-1.25-1.25 0-.688.531-1.25 1.25-1.25.688 0 1.25.563 1.25 1.25Zm-13 0c0 .719-.563 1.25-1.25 1.25C.781 9.25.25 8.719.25 8c0-.688.531-1.25 1.25-1.25.688 0 1.25.563 1.25 1.25Zm.625-5.844c.719 0 1.25.563 1.25 1.25 0 .719-.531 1.25-1.25 1.25-.688 0-1.25-.531-1.25-1.25 0-.687.563-1.25 1.25-1.25Zm9.219 9.219c.687 0 1.25.531 1.25 1.25 0 .688-.563 1.25-1.25 1.25-.719 0-1.25-.563-1.25-1.25 0-.719.531-1.25 1.25-1.25Zm-9.219 0c.719 0 1.25.531 1.25 1.25 0 .688-.531 1.25-1.25 1.25-.688 0-1.25-.563-1.25-1.25 0-.719.563-1.25 1.25-1.25Z"
          />
        </svg>
        <span className="sr-only">loading</span>
      </span>
    </button>
  );
}

export default SearchButton;
