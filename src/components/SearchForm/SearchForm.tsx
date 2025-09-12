"use client";

import * as React from "react";
import SearchInput from "../SearchInput";
import SearchButton from "../SearchButton";

function SearchForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="grid gap-3 md:gap-4 md:grid-cols-[1fr_auto] max-w-[41rem] mx-auto text-600"
    >
      <SearchInput />
      <SearchButton />
    </form>
  );
}

export default SearchForm;
