export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 bg-slate-900 py-6 text-center text-sm text-slate-300">
      <p>
        © {year} Sacrament Meeting Planner. All rights reserved.
      </p>
    </footer>
  );
}