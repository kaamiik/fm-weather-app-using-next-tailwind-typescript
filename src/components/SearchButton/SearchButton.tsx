import * as React from "react";

function SearchButton() {
  return (
    <button className="bg-blue-500 py-4 md:px-6 w-full rounded-12 cursor-pointer hover:bg-blue-700 focus:shadow-(--my-shadow-button) focus:outline-0">
      Search
    </button>
  );
}

export default SearchButton;
