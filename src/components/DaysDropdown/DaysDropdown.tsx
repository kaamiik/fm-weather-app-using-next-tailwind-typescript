"use client";

import Image from "next/image";
import * as React from "react";
import {
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from "react-aria-components";

type DaysDropdownProps = {
  selectedDay: string | undefined;
  availableDays: string[];
  onDayChange?: (day: string) => void;
};

function DaysDropdown({
  selectedDay,
  availableDays,
  onDayChange,
}: DaysDropdownProps) {
  if (availableDays.length === 0) {
    return null;
  }

  return (
    <form action="" onSubmit={(e) => e.preventDefault()}>
      <Select
        selectedKey={selectedDay}
        onSelectionChange={(key) => onDayChange?.(key as string)}
      >
        <Label className="sr-only">Choose a day</Label>
        <Button className="py-2 px-4 flex items-center gap-3 bg-neutral-700 text-400 rounded-8 cursor-pointer hover:bg-neutral-600 outline-0 focus:shadow-(--my-shadow-menu-button)">
          <SelectValue>
            {({ selectedText }) => selectedText || "Select a day"}
          </SelectValue>
          <Image
            src={`/assets/images/icon-dropdown.svg`}
            alt=""
            width={9}
            height={14}
            className="md:w-3 h-[18px]"
          />
        </Button>
        <Popover placement="bottom end">
          <ListBox className="bg-neutral-700 border border-neutral-700 p-2 rounded-12 min-w-[13.375rem] shadow-lg">
            {availableDays.map((day) => (
              <ListBoxItem
                key={day}
                id={day}
                className="py-2.5 px-2 rounded-8 cursor-pointer hover:bg-neutral-600 data-[focus-visible]:bg-neutral-600 outline-0 data-[focus-visible]:shadow-(--my-shadow-menu-item)"
              >
                {day}
              </ListBoxItem>
            ))}
          </ListBox>
        </Popover>
      </Select>
      <button className="sr-only" tabIndex={-1}>
        Submit
      </button>
    </form>
  );
}

export default DaysDropdown;
