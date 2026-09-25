import MeetingCard from "@/components/MeetingCard";
import type { SacramentMeeting } from "@/lib/types";
import { MeetingSearch } from "@/components/MeetingSearch";
import { Pagination } from "@/components/Pagination";
import { getMeetings, getMeetingsTotalPages } from "@/lib/meetings-db";


// async function getMeetings(): Promise<SacramentMeeting[]> {
//   const response = await fetch(
//     "http://localhost:3000/api/meetings",
//     {
//       cache: "no-store",
//     }
//   );

//   if (!response.ok) {
//     throw new Error("Failed to fetch meetings");
//   }

//   return response.json();
// }

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
      <h2 className="mb-6 text-2xl font-bold">
        All Meetings
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {meetings.map((meeting) => (
          <MeetingCard
            key={meeting.id}
            meeting={meeting}
          />
        ))}
      </div>

      <div>
      <MeetingSearch />
      {meetings.map((m) => (
        <MeetingCard key={m.id} meeting={m} />
      ))}

      <Pagination totalPages={totalPages} />

    </div>
    </section>
  );
}