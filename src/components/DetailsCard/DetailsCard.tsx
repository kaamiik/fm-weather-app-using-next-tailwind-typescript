import * as React from 'react';

function DetailsCard({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) {
  return (
    <div className="rounded-12 flex flex-col items-start gap-6 border border-neutral-600 bg-neutral-800 p-5 pe-0 xl:px-2 xl:py-5">
      <dt className="text-500 font-medium text-neutral-200">{label}</dt>
      <dd className="text-600 xl:text-800 font-light">{value}</dd>
    </div>
  );
}

export default DetailsCard;
