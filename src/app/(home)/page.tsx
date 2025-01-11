
import Hero from "./_components/Hero";
import SearchForm from "./_components/SearchForm";

export default function Home() {
  return (
    <div className="h-full flex flex-col gap-4 sm:gap-6">
      <SearchForm />
      <Hero />
    </div>
  );
}
