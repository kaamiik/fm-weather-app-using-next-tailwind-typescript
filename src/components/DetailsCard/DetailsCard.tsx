import * as React from "react";

function DetailsCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col justify-between items-start gap-6 rounded-12 p-5 bg-neutral-800 border border-neutral-600">
      <dt className="text-neutral-200 text-500 font-medium">{label}</dt>
      <dd className="text-800 font-light">{value}</dd>
    </div>
  );
}

export default DetailsCard;
