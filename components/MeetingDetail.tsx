import type { SacramentMeeting } from "@/lib/types";

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({
  meeting,
}: MeetingDetailProps) {
  return (
    <article className="rounded-lg bg-white p-6 shadow-md">
      <header className="mb-8 border-b pb-6">
        <h1 className="text-3xl font-bold">
          Sacrament Meeting
        </h1>

        <p className="mt-2 text-gray-600">
          {meeting.date}
        </p>

        <p className="mt-1 capitalize text-blue-700">
          {meeting.meetingType} Meeting
        </p>
      </header>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-bold">
          Presiding & Conducting
        </h2>

        <p>
          <strong>Presiding:</strong> {meeting.presiding}
        </p>

        <p>
          <strong>Conducting:</strong> {meeting.conducting}
        </p>
      </section>

      {meeting.announcements &&
        meeting.announcements.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-3 text-xl font-bold">
              Announcements
            </h2>

            <ul className="list-disc space-y-1 pl-5">
              {meeting.announcements.map(
                (announcement, index) => (
                  <li key={index}>{announcement}</li>
                )
              )}
            </ul>
          </section>
        )}

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-bold">
          Opening
        </h2>

        <p>
          <strong>Opening Hymn:</strong>{" "}
          {meeting.openingHymn.number} -{" "}
          {meeting.openingHymn.title}
        </p>

        <p>
          <strong>Opening Prayer:</strong>{" "}
          {meeting.openingPrayer}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-bold">
          Ward Business
        </h2>

        {meeting.wardBusiness.length > 0 ? (
          <ul className="list-disc space-y-1 pl-5">
            {meeting.wardBusiness.map((item, index) => (
              <li key={index}>{item.description}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">
            No ward business.
          </p>
        )}

        <p className="mt-3">
          <strong>Stake Business:</strong>{" "}
          {meeting.stakeBusiness ? "Yes" : "No"}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-bold">
          Sacrament
        </h2>

        <p>
          <strong>Hymn:</strong>{" "}
          {meeting.sacramentHymn.number} -{" "}
          {meeting.sacramentHymn.title}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-bold">
          Speakers & Musical Numbers
        </h2>

        <div className="space-y-4">
          {meeting.speakers.map((item, index) => (
            <div
              key={index}
              className="rounded-md bg-gray-50 p-4"
            >
              <p className="font-semibold">
                {item.name}
              </p>

              {item.topic && (
                <p className="text-gray-600">
                  {item.topic}
                </p>
              )}

              <p className="mt-1 text-sm capitalize text-blue-700">
                {item.type.replace("-", " ")}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-bold">
          Closing
        </h2>

        <p>
          <strong>Closing Hymn:</strong>{" "}
          {meeting.closingHymn.number} -{" "}
          {meeting.closingHymn.title}
        </p>

        <p>
          <strong>Closing Prayer:</strong>{" "}
          {meeting.closingPrayer}
        </p>
      </section>
    </article>
  );
}