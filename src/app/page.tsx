import SearchForm from "@/components/SearchForm";
import { bricolageGrotesque } from "./layout";

export default function Home() {
  return (
    <main className="grid gap-12 lg:gap-16">
      <h1
        className={`${bricolageGrotesque.className} text-800 tn:text-900 font-bold text-center text-balance max-md:max-w-[30.125rem] mx-auto`}
      >
        How’s the sky looking today?
      </h1>
      <div>
        <SearchForm />
      </div>
    </main>
  );
}
