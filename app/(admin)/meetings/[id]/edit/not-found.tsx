import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-12 text-center">
      <h2 className="text-3xl font-bold text-slate-900">
        Meeting not found
      </h2>

      <p className="mt-3 text-slate-600">
        The meeting you are looking for does not exist.
      </p>

      <Link
        href="/meetings"
        className="mt-6 inline-block rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
      >
        Back to Meetings
      </Link>
    </div>
  );
}