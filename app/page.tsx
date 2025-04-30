import EnvExample from "@/components/EnvExample";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center">
          .env.example Generator
        </h1>
        <EnvExample />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p className="text-sm text-muted-foreground">Disclaimer: This is a simple tool made for my personal use. We are not responsible for your API Secret Keys or any other sensitive information. This is the <Link href="https://github.com/jarrensj/env-example-generator" className="text-blue-400 hover:text-blue-600">GitHub repository</Link>.</p>
      </footer>
    </div>
  );
}
