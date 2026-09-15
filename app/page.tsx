import Image from "next/image";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <section className="relative mb-12 overflow-hidden rounded-xl">
        <Image
          src="/meeting.png"
          alt="Members attending a sacrament meeting"
          width={1200}
          height={600}
          className="h-auto w-full"
        />
      </section>
    </main>
  );
}