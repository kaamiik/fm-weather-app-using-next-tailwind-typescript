import * as React from "react";
import Image from "next/image";

function SearchButton({ loading }: { loading: boolean }) {
  return (
    <button
      disabled={loading}
      className="bg-blue-500 py-4 md:px-6 w-full rounded-12 cursor-pointer hover:bg-blue-700 focus:shadow-(--my-shadow-button) focus:outline-0 grid"
    >
      <span className={`col-1 row-1 mt-1 ${loading ? "invisible" : ""}`}>
        Search
      </span>
      <div
        className={`col-1 row-1 justify-self-center ${
          !loading ? "invisible" : ""
        }`}
      >
        <Image
          src={`/assets/images/icon-loading.svg`}
          alt=""
          width={30}
          height={30}
          className="animate-spin"
        />
        <p className="sr-only">loading</p>
      </div>
    </button>
  );
}

export default SearchButton;
