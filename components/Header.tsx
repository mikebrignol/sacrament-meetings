import NavLinks from "./NavLinks";

export default function Header() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="bg-blue-900 text-white shadow-md">
      <div className="mx-auto max-w-6xl px-4 py-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-xl font-bold">
              Sacrament Meeting Planner
            </h1>

            <p className="text-sm text-blue-200">
              Plaisance Ward
            </p>
          </div>

          <div className="md:text-right">
            <p className="mb-2 text-sm">
              {currentDate}
            </p>

            <NavLinks />
          </div>
        </div>
      </div>
    </header>
  );
}