import Image from "next/image";
import Link from "next/link";
import * as React from "react";

function PageHeader() {
  return (
    <header>
      <Link href={`/`}>
        <Image
          src={`/assets/images/logo.svg`}
          alt=""
          width={138}
          height={28}
          className="h-auto md:w-[200px]"
        />
      </Link>
    </header>
  );
}

export default PageHeader;
