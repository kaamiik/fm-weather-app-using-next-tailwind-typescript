"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import {
  MenuTrigger,
  Menu,
  MenuItem,
  MenuSection,
  Header,
  Separator,
  Button,
  Popover,
} from "react-aria-components";

function UnitSettings() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const temperature = searchParams.get("temp") || "metric";
  const windSpeed = searchParams.get("wind") || "metric";
  const precipitation = searchParams.get("precip") || "metric";

  function CheckMark({ isSelected }: { isSelected: boolean }) {
    return (
      <span>
        {isSelected ? (
          <Image
            src={`/assets/images/icon-checkmark.svg`}
            alt=""
            width={14}
            height={17}
          />
        ) : null}
      </span>
    );
  }

  function handleSwitch() {
    const unit = temperature === "metric" ? "imperial" : "metric";
    const params = new URLSearchParams(searchParams.toString());
    params.set("temp", unit);
    params.set("wind", unit);
    params.set("precip", unit);
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  function handleUnitChange(unitType: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(unitType, value);
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  const allUnitsSame = temperature === windSpeed && windSpeed === precipitation;

  return (
    <form action="" onSubmit={(e) => e.preventDefault()}>
      <MenuTrigger>
        <Button className="bg-neutral-800 rounded-6 md:rounded-8 px-2.5 py-2 md:px-3 md:py-4 flex items-center gap-1.5 md:gap-2.5 cursor-pointer hover:bg-neutral-700 outline-0 focus:shadow-(--my-shadow-menu-button)">
          <Image
            src={`/assets/images/icon-units.svg`}
            alt=""
            width={14}
            height={14}
            className="md:w-4 h-auto"
          />
          <span className="text-300 md:text-400">Units</span>
          <Image
            src={`/assets/images/icon-dropdown.svg`}
            alt=""
            width={9}
            height={14}
            className="md:w-3 h-[18px]"
          />
        </Button>
        <Popover placement="bottom end">
          <Menu
            selectionMode="multiple"
            onAction={(key) => {
              if (key === "switch") {
                handleSwitch();
              }
            }}
            className="px-2 py-1.5 bg-neutral-800 rounded-10 md:rounded-12 inset-ring inset-ring-neutral-600 shadow-lg text-300 md:text-400 min-w-[10.5rem]"
          >
            <MenuItem
              id="switch"
              className="px-2 py-2.5 cursor-pointer rounded-8 hover:bg-neutral-700 outline-0 data-[focused]:shadow-(--my-shadow-menu-item)"
            >
              {allUnitsSame
                ? temperature === "metric"
                  ? "Switch to Imperial"
                  : "Switch to Metric"
                : "Reset to Default"}
            </MenuItem>

            <MenuSection>
              <Header className="pt-1.5 px-2 text-300 text-neutral-300">
                Temperature
              </Header>
              <MenuItem
                id="metric-temp"
                onAction={() => handleUnitChange("temp", "metric")}
                className={`py-2.5 px-2 flex items-center justify-between rounded-8 mt-2 cursor-pointer outline-0 data-[focused]:shadow-(--my-shadow-menu-item) ${
                  temperature === "metric"
                    ? "bg-neutral-700"
                    : "hover:bg-neutral-700"
                }`}
              >
                Celsius
                <CheckMark isSelected={temperature === "metric"} />
              </MenuItem>
              <MenuItem
                id="imperial-temp"
                onAction={() => handleUnitChange("temp", "imperial")}
                className={`py-2.5 px-2 flex items-center justify-between rounded-8 mt-2 cursor-pointer outline-0 data-[focused]:shadow-(--my-shadow-menu-item) ${
                  temperature === "imperial"
                    ? "bg-neutral-700"
                    : "hover:bg-neutral-700"
                }`}
              >
                Fahrenheit
                <CheckMark isSelected={temperature === "imperial"} />
              </MenuItem>
            </MenuSection>

            <Separator className="my-1 border border-neutral-600" />

            <MenuSection>
              <Header className="pt-1.5 px-2 text-300 text-neutral-300">
                Wind Speed
              </Header>
              <MenuItem
                id="metric-wind"
                onAction={() => handleUnitChange("wind", "metric")}
                className={`py-2.5 px-2 flex items-center justify-between rounded-8 mt-2 cursor-pointer outline-0 data-[focused]:shadow-(--my-shadow-menu-item) ${
                  windSpeed === "metric"
                    ? "bg-neutral-700"
                    : "hover:bg-neutral-700"
                }`}
              >
                Km/h
                <CheckMark isSelected={windSpeed === "metric"} />
              </MenuItem>
              <MenuItem
                id="imperial-wind"
                onAction={() => handleUnitChange("wind", "imperial")}
                className={`py-2.5 px-2 flex items-center justify-between rounded-8 mt-2 cursor-pointer outline-0 data-[focused]:shadow-(--my-shadow-menu-item) ${
                  windSpeed === "imperial"
                    ? "bg-neutral-700"
                    : "hover:bg-neutral-700"
                }`}
              >
                mph
                <CheckMark isSelected={windSpeed === "imperial"} />
              </MenuItem>
            </MenuSection>

            <Separator className="my-1 border border-neutral-600" />

            <MenuSection>
              <Header className="pt-1.5 px-2 text-300 text-neutral-300">
                Precipitation
              </Header>
              <MenuItem
                id="metric-precip"
                onAction={() => handleUnitChange("precip", "metric")}
                className={`py-2.5 px-2 flex items-center justify-between rounded-8 mt-2 cursor-pointer outline-0 data-[focused]:shadow-(--my-shadow-menu-item) ${
                  precipitation === "metric"
                    ? "bg-neutral-700"
                    : "hover:bg-neutral-700"
                }`}
              >
                Millimeters
                <CheckMark isSelected={precipitation === "metric"} />
              </MenuItem>
              <MenuItem
                id="imperial-precip"
                onAction={() => handleUnitChange("precip", "imperial")}
                className={`py-2.5 px-2 flex items-center justify-between rounded-8 mt-2 cursor-pointer outline-0 data-[focused]:shadow-(--my-shadow-menu-item) ${
                  precipitation === "imperial"
                    ? "bg-neutral-700"
                    : "hover:bg-neutral-700"
                }`}
              >
                Inches
                <CheckMark isSelected={precipitation === "imperial"} />
              </MenuItem>
            </MenuSection>
          </Menu>
        </Popover>
      </MenuTrigger>
      <button className="sr-only" tabIndex={-1}>
        Submit
      </button>
    </form>
  );
}

export default UnitSettings;
