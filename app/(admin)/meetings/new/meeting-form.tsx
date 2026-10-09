"use client";

import { useActionState } from "react";
import {
  createMeeting,
  updateMeeting,
  type State,
} from "@/lib/actions";
import type { SacramentMeeting } from "@/lib/types";

const initialState: State = {
  message: "",
  errors: {},
};

interface MeetingFormProps {
  meeting?: SacramentMeeting;
}

export default function MeetingForm({ meeting }: MeetingFormProps) {
  const action = meeting
    ? updateMeeting.bind(null, meeting.id)
    : createMeeting;

  const [state, formAction, isPending] = useActionState(
    action,
    initialState
  );

  return (
    <form action={formAction} className="mt-8 space-y-8">
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-slate-900">
          Meeting Information
        </h3>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-slate-700"
            >
              Date
            </label>

            <input
              id="date"
              name="date"
              type="date"
              required
              defaultValue={meeting?.date ?? ""}
              aria-describedby="date-error"
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
            />

            <div
              id="date-error"
              aria-live="polite"
              className="mt-1 text-sm text-red-600"
            >
              {state.errors?.date?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="meetingType"
              className="block text-sm font-medium text-slate-700"
            >
              Meeting Type
            </label>

            <select
              id="meetingType"
              name="meetingType"
              required
              aria-describedby="meetingType-error"
              defaultValue={meeting?.meetingType ?? ""}
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
            >
              <option value="" disabled>
                Select a meeting type
              </option>
              <option value="testimony">Testimony</option>
              <option value="regular">Regular</option>
              <option value="stake">Stake</option>
              <option value="general">General</option>
            </select>

            <div
              id="meetingType-error"
              aria-live="polite"
              className="mt-1 text-sm text-red-600"
            >
              {state.errors?.meetingType?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="presiding"
              className="block text-sm font-medium text-slate-700"
            >
              Presiding
            </label>

            <input
              id="presiding"
              name="presiding"
              type="text"
              required
              defaultValue={meeting?.presiding ?? ""}
              aria-describedby="presiding-error"
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
            />

            <div
              id="presiding-error"
              aria-live="polite"
              className="mt-1 text-sm text-red-600"
            >
              {state.errors?.presiding?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="conducting"
              className="block text-sm font-medium text-slate-700"
            >
              Conducting
            </label>

            <input
              id="conducting"
              name="conducting"
              type="text"
              required
              defaultValue={meeting?.conducting ?? ""}
              aria-describedby="conducting-error"
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
            />

            <div
              id="conducting-error"
              aria-live="polite"
              className="mt-1 text-sm text-red-600"
            >
              {state.errors?.conducting?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-slate-900">
          Announcements
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Enter one announcement per line.
        </p>

        <textarea
          id="announcements"
          name="announcements"
          rows={4}
          defaultValue={meeting?.announcements?.join("\n") ?? ""}
          aria-describedby="announcements-error"
          className="mt-4 block w-full rounded-md border border-slate-300 px-3 py-2"
        />

        <div
          id="announcements-error"
          aria-live="polite"
          className="mt-1 text-sm text-red-600"
        >
          {state.errors?.announcements?.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-slate-900">
          Opening Hymn & Prayer
        </h3>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="openingHymnNumber"
              className="block text-sm font-medium text-slate-700"
            >
              Opening Hymn Number
            </label>

            <input
              id="openingHymnNumber"
              name="openingHymnNumber"
              type="number"
              min="1"
              required
              defaultValue={meeting?.openingHymn.number ?? ""}
              aria-describedby="openingHymnNumber-error"
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
            />

            <div
              id="openingHymnNumber-error"
              aria-live="polite"
              className="mt-1 text-sm text-red-600"
            >
              {state.errors?.openingHymnNumber?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="openingHymnTitle"
              className="block text-sm font-medium text-slate-700"
            >
              Opening Hymn Title
            </label>

            <input
              id="openingHymnTitle"
              name="openingHymnTitle"
              type="text"
              required
              defaultValue={meeting?.openingHymn.title ?? ""}
              aria-describedby="openingHymnTitle-error"
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
            />

            <div
              id="openingHymnTitle-error"
              aria-live="polite"
              className="mt-1 text-sm text-red-600"
            >
              {state.errors?.openingHymnTitle?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="openingPrayer"
              className="block text-sm font-medium text-slate-700"
            >
              Opening Prayer
            </label>

            <input
              id="openingPrayer"
              name="openingPrayer"
              type="text"
              required
              defaultValue={meeting?.openingPrayer ?? ""}
              aria-describedby="openingPrayer-error"
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
            />

            <div
              id="openingPrayer-error"
              aria-live="polite"
              className="mt-1 text-sm text-red-600"
            >
              {state.errors?.openingPrayer?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-slate-900">
          Ward & Stake Business
        </h3>

        <div className="mt-6 space-y-6">
          <div>
            <label
              htmlFor="wardBusiness"
              className="block text-sm font-medium text-slate-700"
            >
              Ward Business
            </label>

            <p className="mt-1 text-sm text-slate-500">
              Enter one item per line.
            </p>

            <textarea
              id="wardBusiness"
              name="wardBusiness"
              rows={4}
              defaultValue={
                meeting?.wardBusiness
                  .map((item) => item.description)
                  .join("\n") ?? ""
              }
              aria-describedby="wardBusiness-error"
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
            />

            <div
              id="wardBusiness-error"
              aria-live="polite"
              className="mt-1 text-sm text-red-600"
            >
              {state.errors?.wardBusiness?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-3">
            <input
              id="stakeBusiness"
              name="stakeBusiness"
              type="checkbox"
              value="true"
              defaultChecked={meeting?.stakeBusiness ?? false}
              className="h-4 w-4 rounded border-slate-300"
            />

            <span className="text-sm font-medium text-slate-700">
              Stake business included
            </span>
          </label>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-slate-900">
          Sacrament Hymn
        </h3>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="sacramentHymnNumber"
              className="block text-sm font-medium text-slate-700"
            >
              Sacrament Hymn Number
            </label>

            <input
              id="sacramentHymnNumber"
              name="sacramentHymnNumber"
              type="number"
              min="1"
              required
              defaultValue={meeting?.sacramentHymn.number ?? ""}
              aria-describedby="sacramentHymnNumber-error"
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
            />

            <div
              id="sacramentHymnNumber-error"
              aria-live="polite"
              className="mt-1 text-sm text-red-600"
            >
              {state.errors?.sacramentHymnNumber?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="sacramentHymnTitle"
              className="block text-sm font-medium text-slate-700"
            >
              Sacrament Hymn Title
            </label>

            <input
              id="sacramentHymnTitle"
              name="sacramentHymnTitle"
              type="text"
              required
              defaultValue={meeting?.sacramentHymn.title ?? ""}
              aria-describedby="sacramentHymnTitle-error"
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
            />

            <div
              id="sacramentHymnTitle-error"
              aria-live="polite"
              className="mt-1 text-sm text-red-600"
            >
              {state.errors?.sacramentHymnTitle?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-slate-900">
          Speakers
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Enter one speaker per line using: Name | Topic
        </p>

        <textarea
          id="speakers"
          name="speakers"
          rows={5}
          defaultValue={
            meeting?.speakers
              .map((speaker) => `${speaker.name} | ${speaker.topic}`)
              .join("\n") ?? ""
          }
          aria-describedby="speakers-error"
          className="mt-4 block w-full rounded-md border border-slate-300 px-3 py-2"
        />

        <div
          id="speakers-error"
          aria-live="polite"
          className="mt-1 text-sm text-red-600"
        >
          {state.errors?.speakers?.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-slate-900">
          Closing Hymn & Prayer
        </h3>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="closingHymnNumber"
              className="block text-sm font-medium text-slate-700"
            >
              Closing Hymn Number
            </label>

            <input
              id="closingHymnNumber"
              name="closingHymnNumber"
              type="number"
              min="1"
              required
              defaultValue={meeting?.closingHymn.number ?? ""}
              aria-describedby="closingHymnNumber-error"
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
            />

            <div
              id="closingHymnNumber-error"
              aria-live="polite"
              className="mt-1 text-sm text-red-600"
            >
              {state.errors?.closingHymnNumber?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="closingHymnTitle"
              className="block text-sm font-medium text-slate-700"
            >
              Closing Hymn Title
            </label>

            <input
              id="closingHymnTitle"
              name="closingHymnTitle"
              type="text"
              required
              defaultValue={meeting?.closingHymn.title ?? ""}
              aria-describedby="closingHymnTitle-error"
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
            />

            <div
              id="closingHymnTitle-error"
              aria-live="polite"
              className="mt-1 text-sm text-red-600"
            >
              {state.errors?.closingHymnTitle?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="closingPrayer"
              className="block text-sm font-medium text-slate-700"
            >
              Closing Prayer
            </label>

            <input
              id="closingPrayer"
              name="closingPrayer"
              type="text"
              required
              defaultValue={meeting?.closingPrayer ?? ""}
              aria-describedby="closingPrayer-error"
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
            />

            <div
              id="closingPrayer-error"
              aria-live="polite"
              className="mt-1 text-sm text-red-600"
            >
              {state.errors?.closingPrayer?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {state.message && (
        <div
          aria-live="polite"
          className="rounded-md bg-red-50 p-4 text-sm text-red-700"
        >
          {state.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-slate-900 px-6 py-3 font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending
          ? meeting
            ? "Updating Meeting..."
            : "Creating Meeting..."
          : meeting
            ? "Update Meeting"
            : "Create Meeting"}
      </button>
    </form>
  );
}