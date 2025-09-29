import * as React from "react";

function DetailsCard({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) {
  return (
    <div className="flex flex-col items-start  gap-6 rounded-12 p-5 xl:py-5 xl:px-2 pe-0 bg-neutral-800 border border-neutral-600">
      <dt className="text-neutral-200 text-500 font-medium">{label}</dt>
      <dd className="text-600 xl:text-800 font-light xl:-ms-2">{value}</dd>
    </div>
  );
}

export default DetailsCard;
