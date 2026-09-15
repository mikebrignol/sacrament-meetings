import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({
  meeting,
}: MeetingCardProps) {
  return (
    <Link
      href={`/meetings/${meeting.id}`}
      className="block rounded-lg border bg-white p-6 shadow-sm transition hover:shadow-md"
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xl font-bold">
          {meeting.date}
        </h2>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm capitalize text-blue-800">
          {meeting.meetingType}
        </span>
      </div>

      <div className="space-y-1 text-gray-600">
        <p>
          <strong>Presiding:</strong> {meeting.presiding}
        </p>

        <p>
          <strong>Conducting:</strong> {meeting.conducting}
        </p>

        <p>
          <strong>Opening Hymn:</strong>{" "}
          {meeting.openingHymn.number} -{" "}
          {meeting.openingHymn.title}
        </p>
      </div>

      <p className="mt-4 text-sm font-medium text-blue-600">
        View full meeting →
      </p>
    </Link>
  );
}