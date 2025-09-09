import { bricolageGrotesque } from "./layout";

export default function Home() {
  return (
    <div className="">
      <main className="">
        <h1
          className={`${bricolageGrotesque.className} text-800 tn:text-900 font-bold text-center text-balance max-md:max-w-[30.125rem] mx-auto`}
        >
          How’s the sky looking today?
        </h1>
      </main>
    </div>
  );
}
