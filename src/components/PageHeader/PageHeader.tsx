import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import UnitSettings from "../UnitSettings";

function PageHeader() {
  return (
    <header className="flex justify-between items-center flex-wrap gap-1.5">
      <Link href={`/`}>
        <Image
          src={`/assets/images/logo.svg`}
          alt=""
          width={138}
          height={28}
          className="h-auto md:w-[200px]"
        />
      </Link>
      <React.Suspense fallback={<div>Loading...</div>}>
        <UnitSettings />
      </React.Suspense>
    </header>
  );
}

export default PageHeader;
