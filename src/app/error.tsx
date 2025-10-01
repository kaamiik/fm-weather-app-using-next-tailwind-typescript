'use client';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="mt-12 flex flex-col items-center justify-center gap-6 py-10 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="none"
        viewBox="0 0 18 18"
      >
        <path
          fill="#ACACB7"
          d="M9 .531c4.781 0 8.719 3.938 8.719 8.719 0 4.816-3.938 8.719-8.719 8.719A8.717 8.717 0 0 1 .281 9.25C.281 4.469 4.184.531 9 .531Zm4.957 3.762c-2.566-2.566-6.574-2.707-9.316-.563l9.879 9.88c2.144-2.743 2.003-6.75-.563-9.317Zm-9.95 9.95c2.567 2.566 6.575 2.706 9.317.562l-9.879-9.88c-2.144 2.743-2.004 6.75.563 9.317Z"
        />
      </svg>
      <h1 className={`text-900 font-bold`}>Something went wrong</h1>
      <p className="text-600 font-medium text-neutral-200">
        We couldn’t connect to the server (API error). Please try again in a few
        moments.
      </p>
      <button
        onClick={() => reset()}
        className="rounded-8 flex cursor-pointer items-center gap-2.5 bg-neutral-800 px-4 py-3 hover:bg-neutral-600"
      >
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.0938 1.40625C15.3438 1.15625 15.75 1.34375 15.75 1.65625V6.125C15.75 6.34375 15.5625 6.5 15.375 6.5H10.875C10.5625 6.5 10.375 6.125 10.625 5.875L12.3125 4.1875C11.2188 3.0625 9.6875 2.375 8 2.375C4.71875 2.375 2.0625 4.9375 1.875 8.15625C1.84375 8.375 1.6875 8.5 1.5 8.5H0.625C0.40625 8.5 0.21875 8.34375 0.25 8.125C0.4375 4.03125 3.84375 0.75 8 0.75C10.125 0.75 12.0625 1.625 13.4688 3.03125L15.0938 1.40625ZM15.3438 8.5C15.5625 8.5 15.75 8.6875 15.7188 8.90625C15.5312 13 12.125 16.25 8 16.25C5.84375 16.25 3.90625 15.4062 2.5 14L0.875 15.625C0.625 15.875 0.25 15.6875 0.25 15.375V10.875C0.25 10.6875 0.40625 10.5 0.625 10.5H5.09375C5.40625 10.5 5.59375 10.9062 5.34375 11.1562L3.65625 12.8438C4.75 13.9688 6.28125 14.625 8 14.625C11.25 14.625 13.9062 12.0938 14.0938 8.875C14.125 8.65625 14.2812 8.5 14.4688 8.5H15.3438Z"
            fill="white"
          />
        </svg>
        <span>Retry</span>
      </button>
    </div>
  );
}
