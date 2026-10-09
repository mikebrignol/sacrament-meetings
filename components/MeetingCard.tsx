import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";
import { deleteMeeting } from "@/lib/actions";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({
  meeting,
}: MeetingCardProps) {
  return (
    <div className="rounded-lg border bg-white shadow-sm transition hover:shadow-md">
      <Link
        href={`/meetings/${meeting.id}`}
        className="block p-6"
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

      <div className="flex gap-3 border-t bg-gray-50 px-6 py-3">
        <Link
          href={`/meetings/${meeting.id}/edit`}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Edit
        </Link>

        <form action={deleteMeeting.bind(null, meeting.id)}>
          <button
            type="submit"
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}