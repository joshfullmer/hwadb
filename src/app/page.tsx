import { redirect } from "next/navigation";

export default function Home() {
  redirect("/cards");

  return <div>Work in progress</div>;
}
