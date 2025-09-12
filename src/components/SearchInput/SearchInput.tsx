"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  ComboBox,
  Input,
  ListBox,
  ListBoxItem,
  Popover,
} from "react-aria-components";

function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("place", e.target.value);
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  const searchValue = searchParams.get("place") || "";
  return (
    <ComboBox>
      <div className="relative">
        <Input
          value={searchValue}
          onChange={handleChange}
          className="bg-neutral-800 py-4 ps-[60px] w-full placeholder:text-neutral-200 rounded-12"
          placeholder="Search for a place"
        />
        <Image
          src={`/assets/images/icon-search.svg`}
          alt=""
          width={20}
          height={20}
          className="absolute top-[18px] left-6"
        />
      </div>
      <Popover style={{ width: "var(--trigger-width)" }}>
        <ListBox className="p-2 bg-neutral-800 w-full rounded-12 mt-1.5 grid gap-1">
          <ListBoxItem className="py-2.5 px-2 cursor-pointer hover:bg-neutral-700 rounded-8 hover:inset-ring hover:inset-ring-neutral-600">
            City Name
          </ListBoxItem>
          <ListBoxItem className="py-2.5 px-2 cursor-pointer hover:bg-neutral-700 rounded-8 hover:inset-ring hover:inset-ring-neutral-600">
            City Name
          </ListBoxItem>
          <ListBoxItem className="py-2.5 px-2 cursor-pointer hover:bg-neutral-700 rounded-8 hover:inset-ring hover:inset-ring-neutral-600">
            City Name
          </ListBoxItem>
          <ListBoxItem className="py-2.5 px-2 cursor-pointer hover:bg-neutral-700 rounded-8 hover:inset-ring hover:inset-ring-neutral-600">
            City Name
          </ListBoxItem>
        </ListBox>
      </Popover>
    </ComboBox>
  );
}

export default SearchInput;
