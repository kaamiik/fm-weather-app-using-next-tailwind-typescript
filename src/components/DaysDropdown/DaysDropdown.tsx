"use client";

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
        <Button className="py-2 px-4 flex items-center gap-3 bg-neutral-700 text-400 rounded-8 cursor-pointer hover:bg-neutral-600 outline-0 focus:shadow-(--my-shadow-menu-button) group">
          <SelectValue>
            {({ selectedText }) => selectedText || "Select a day"}
          </SelectValue>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="8"
            fill="none"
            viewBox="0 0 13 8"
            className="transition-transform duration-150 ease-out motion-reduce:transition-none group-aria-expanded:rotate-180"
          >
            <path
              fill="#fff"
              d="M6.309 7.484 1.105 2.316c-.175-.14-.175-.421 0-.597l.704-.668a.405.405 0 0 1 .597 0l4.219 4.148 4.184-4.148c.175-.176.457-.176.597 0l.703.668c.176.176.176.457 0 .597L6.906 7.484a.405.405 0 0 1-.597 0Z"
            />
          </svg>
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
