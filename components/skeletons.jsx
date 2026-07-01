import { Skeleton } from "@/components/ui/skeleton";

/* ─── Artist / User Profile Skeleton ─── */
export function ProfileSkeleton() {
  return (
    <main className="min-h-screen bg-frosty text-content pb-20">
      {/* Banner */}
      <section className="relative h-[40vh] w-full rounded-2xl overflow-hidden">
        <Skeleton className="w-full h-full" />

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end gap-8">
            {/* Avatar */}
            <Skeleton className="relative md:-mb-10 w-32 h-32 md:w-60 md:h-60 rounded-full border-4 border-black shrink-0" />

            <div className="flex-1 pb-4 space-y-3">
              <Skeleton className="h-4 w-24 rounded-full" />
              <Skeleton className="h-12 w-72 md:w-96 rounded-xl" />
              <Skeleton className="h-5 w-40 rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-32 md:pt-40 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          <div className="rounded-2xl p-8 border border-overlay/5 bg-overlay/2 space-y-6">
            <Skeleton className="h-6 w-36 rounded-lg" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-3 w-16 rounded" />
                  <Skeleton className="h-5 w-28 rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main */}
        <div className="lg:col-span-2 space-y-12">
          {/* About */}
          <div className="rounded-2xl p-10 border border-overlay/5 bg-overlay/2 space-y-4">
            <Skeleton className="h-7 w-24 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-3/4 rounded" />
              <Skeleton className="h-4 w-1/2 rounded" />
            </div>
          </div>

          {/* Artworks */}
          <div className="space-y-8">
            <Skeleton className="h-8 w-48 rounded-xl" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="aspect-square rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ─── Art Detail Page Skeleton ─── */
export function ArtDetailSkeleton() {
  return (
    <main className="min-h-screen bg-frosty text-content pb-20 pt-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <Skeleton className="h-5 w-44 rounded-lg mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Image */}
          <div className="md:col-span-2 rounded-3xl overflow-hidden border border-overlay/5 min-h-[500px] bg-overlay/2">
            <Skeleton className="w-full h-full min-h-[500px] rounded-3xl" />
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            <div className="rounded-3xl p-8 border border-overlay/5 bg-overlay/2 space-y-6">
              <Skeleton className="h-12 w-full rounded-xl" />
              <Skeleton className="h-5 w-36 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-3/4 rounded" />
                <Skeleton className="h-4 w-1/2 rounded" />
              </div>
            </div>

            <div className="rounded-3xl p-8 border border-overlay/5 bg-overlay/2 space-y-5">
              <Skeleton className="h-5 w-28 rounded-lg" />
              <div className="flex items-center gap-4">
                <Skeleton className="w-[72px] h-[72px] rounded-full shrink-0" />
                <Skeleton className="h-7 w-32 rounded-lg" />
              </div>
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
const handle = () => {};
/* ─── Event Detail Page Skeleton ─── */
export function EventDetailSkeleton() {
  return (
    <main className="min-h-screen bg-frosty text-content pb-20">
      {/* Banner */}
      <section className="w-full">
        <div className="relative w-full h-[300px] md:h-[480px] overflow-hidden border-y border-overlay/10">
          <Skeleton className="w-full h-full" />

          <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />

          <div className="absolute inset-0 flex items-end">
            <div className="max-w-6xl mx-auto w-full px-6 md:px-12 pb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="flex items-center gap-5">
                <Skeleton className="w-20 h-20 md:w-28 md:h-28 rounded-2xl shrink-0" />
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-24 rounded-full" />
                  </div>
                  <Skeleton className="h-10 md:h-14 w-64 md:w-96 rounded-xl" />
                  <Skeleton className="h-5 w-48 rounded-lg" />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Skeleton className="w-20 h-20 md:w-24 md:h-24 rounded-xl" />
                <Skeleton className="h-12 w-36 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 mt-12 space-y-8">
        <div className="rounded-2xl p-8 border border-overlay/10 bg-overlay/2 space-y-6">
          <Skeleton className="h-6 w-36 rounded-lg" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-3 w-16 rounded" />
                <Skeleton className="h-5 w-40 rounded-lg" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl p-8 md:p-10 border border-overlay/10 bg-overlay/2 space-y-4">
          <Skeleton className="h-7 w-44 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-3/4 rounded" />
            <Skeleton className="h-4 w-1/2 rounded" />
          </div>
        </div>
      </section>
    </main>
  );
}

/* ─── Events List / My Events Skeleton ─── */
export function EventsListSkeleton({ count = 3 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-14">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-[2.5rem] border border-overlay/10 bg-overlay/2 overflow-hidden"
        >
          {/* Image area */}
          <Skeleton className="h-72 w-full" />
          {/* Content */}
          <div className="p-8 space-y-4">
            <Skeleton className="h-8 w-3/4 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-2/3 rounded" />
            </div>
            <div className="pt-6 border-t border-overlay/5 flex items-center justify-between">
              <Skeleton className="h-4 w-32 rounded" />
              <Skeleton className="h-6 w-6 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Admin Dashboard Skeleton ─── */
export function AdminSkeleton() {
  return (
    <section className="min-h-screen py-16 px-4 md:px-8 bg-frosty">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4 mb-10">
          <Skeleton className="h-14 w-80 mx-auto rounded-xl" />
          <Skeleton className="h-5 w-96 mx-auto rounded-lg" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar tabs */}
          <div className="md:col-span-1">
            <div className="rounded-2xl p-2 border border-overlay/10 bg-overlay/2 space-y-2">
              <Skeleton className="h-12 w-full rounded-xl" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-3 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-5 rounded-2xl border border-overlay/10 bg-overlay/2"
              >
                <Skeleton className="w-14 h-14 rounded-full shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-40 rounded-lg" />
                  <Skeleton className="h-3 w-56 rounded" />
                </div>
                <Skeleton className="h-8 w-24 rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Art Gallery / Exhibition Skeleton ─── */
export function ArtGallerySkeleton() {
  // Varying heights to mimic masonry layout
  const heights = [320, 240, 400, 280, 360, 300, 260, 420, 300, 340, 280, 380];
  return (
    <section>
      <div className="min-h-screen bg-frosty text-content px-6 py-10">
        <div className="mb-10 text-center space-y-3">
          <Skeleton className="h-12 w-72 mx-auto rounded-xl" />
          <Skeleton className="h-5 w-64 mx-auto rounded-lg" />
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 space-y-3">
          {heights.map((h, i) => (
            <div key={i} className="break-inside-avoid">
              <Skeleton className="w-full rounded-2xl" style={{ height: h }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Event Attendees Skeleton ─── */
export function AttendeesSkeleton({ count = 5 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between p-5 rounded-2xl border border-overlay/10 bg-overlay/2"
        >
          <div className="flex items-center gap-4">
            <Skeleton className="w-14 h-14 rounded-full shrink-0" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-32 rounded-lg" />
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-3 w-40 rounded" />
            </div>
          </div>
          <Skeleton className="h-10 w-24 rounded-xl hidden md:block" />
        </div>
      ))}
    </div>
  );
}


export function EventsSectionSkeleton() {
  return (
    <section id="events" className="max-w-7xl mx-auto px-6 md:px-12 mb-32">
      {/* Header */}
      <div className="flex justify-between items-end mb-12">
        <div>
          <div className="flex items-center gap-4 mb-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-px w-12" />
          </div>
          <Skeleton className="h-10 w-56" />
        </div>
        <Skeleton className="h-5 w-32 hidden sm:block" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Event List */}
        <div className="flex flex-col gap-4 lg:col-span-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <EventListItemSkeleton key={i} />
          ))}
        </div>

        {/* Featured Event */}
        <div className="lg:col-span-2 relative rounded-2xl overflow-hidden h-[400px]">
          <Skeleton className="w-full h-full" />
          <div className="absolute bottom-0 left-0 p-8 w-full space-y-3">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex gap-6 pt-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-28" />
            </div>
            <Skeleton className="h-10 w-36 rounded-full mt-2" />
          </div>
        </div>
      </div>
    </section>
  );
}

function EventListItemSkeleton() {
  return (
    <div className="flex gap-4 p-4 rounded-xl border border-overlay/10">
      {/* Date box */}
      <Skeleton className="h-14 w-14 rounded-lg shrink-0" />
      {/* Text */}
      <div className="flex flex-col gap-2 flex-1">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  );
}

export function ArtistsSectionSkeleton() {
  return (
    <section id="artists" className="max-w-7xl mx-auto px-6 md:px-12">
      {/* Header */}
      <div className="flex justify-between items-end mb-12">
        <div>
          <div className="flex items-center gap-4 mb-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-px w-12" />
          </div>
          <Skeleton className="h-10 w-52" />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <ArtistCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}

function ArtistCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden">
      {/* Image */}
      <Skeleton className="w-full aspect-[3/4]" />
      {/* Content */}
      <div className="p-4 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        {/* Social icons */}
        <div className="flex gap-3 pt-1">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-5 w-5 rounded-full" />
        </div>
      </div>
    </div>
  );
}