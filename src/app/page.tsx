import { Input } from "@/components/ui/input";
import Form from "next/form";

export default function Home() {
  const titles = ["HooWahDeeBee", "HWADB", "HwaahDeeBee"];
  const randomTitle = titles[Math.floor(Math.random() * titles.length)];

  const apps = ["database", "deckbuilder"];
  const randomApp = apps[Math.floor(Math.random() * apps.length)];

  return (
    <main className="max-w-9/10 w-full mx-auto flex flex-col gap-12 items-center justify-center">
      <h1 className="text-4xl">
        <strong>{randomTitle}</strong>
        <span> is a </span>
        <strong>Hubworld: Aidalon</strong>
        <span> {randomApp}</span>
      </h1>

      <div className="px-20 w-full">
        <Form action="/search">
          <Input placeholder="Search for a card" name="q" />
        </Form>
      </div>
    </main>
  );
}
