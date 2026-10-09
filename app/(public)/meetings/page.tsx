import MeetingCard from "@/components/MeetingCard";
import Link from "next/link";
import { MeetingSearch } from "@/components/MeetingSearch";
import { Pagination } from "@/components/Pagination";
import {
  getMeetings,
  getMeetingsTotalPages,
} from "@/lib/meetings-db";

export default async function MeetingsPage({
  searchParams,
}: {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;

  const query = params.query || "";
  const currentPage = Number(params.page) || 1;

  const meetings = await getMeetings(query, currentPage);
  const totalPages = await getMeetingsTotalPages(query);

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          All Meetings
        </h2>

        <Link
          href="/meetings/new"
          className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          Create Meeting
        </Link>
      </div>

      <div className="mb-6">
        <MeetingSearch />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {meetings.map((meeting) => (
          <MeetingCard
            key={meeting.id}
            meeting={meeting}
          />
        ))}
      </div>

      <div className="mt-6">
        <Pagination totalPages={totalPages} />
      </div>
    </section>
  );
}