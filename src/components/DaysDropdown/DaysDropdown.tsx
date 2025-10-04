'use client';

import * as React from 'react';
import {
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from 'react-aria-components';

function DaysDropdown({
  selectedDay,
  availableDays,
  onDayChange,
}: {
  selectedDay: string | undefined;
  availableDays: string[];
  onDayChange?: (day: string) => void;
}) {
  if (availableDays.length === 0) {
    return null;
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Select
        selectedKey={selectedDay}
        onSelectionChange={(key) => onDayChange?.(key as string)}
      >
        <Label className="sr-only">Choose a day</Label>
        <Button className="text-400 rounded-8 group flex cursor-pointer items-center gap-3 bg-neutral-700 px-4 py-2 outline-0 hover:bg-neutral-600 focus:shadow-(--my-shadow-menu-button)">
          <SelectValue>
            {({ selectedText }) => selectedText || 'Select a day'}
          </SelectValue>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="8"
            fill="none"
            viewBox="0 0 13 8"
            className="transition-transform duration-150 ease-out group-aria-expanded:rotate-180 motion-reduce:transition-none motion-reduce:group-aria-expanded:rotate-none"
          >
            <path
              fill="#fff"
              d="M6.309 7.484 1.105 2.316c-.175-.14-.175-.421 0-.597l.704-.668a.405.405 0 0 1 .597 0l4.219 4.148 4.184-4.148c.175-.176.457-.176.597 0l.703.668c.176.176.176.457 0 .597L6.906 7.484a.405.405 0 0 1-.597 0Z"
            />
          </svg>
        </Button>
        <Popover placement="bottom end">
          <ListBox className="rounded-12 min-w-[13.375rem] border border-neutral-700 bg-neutral-700 p-2 shadow-lg">
            {availableDays.map((day) => (
              <ListBoxItem
                key={day}
                id={day}
                textValue={day}
                className="rounded-8 cursor-pointer px-2 py-2.5 outline-0 hover:bg-neutral-600 data-[focus-visible]:bg-neutral-600 data-[focus-visible]:shadow-(--my-shadow-menu-item)"
              >
                {day}
              </ListBoxItem>
            ))}
          </ListBox>
        </Popover>
      </Select>
      <button aria-hidden="true" className="sr-only" tabIndex={-1}>
        Submit
      </button>
    </form>
  );
}

export default DaysDropdown;
