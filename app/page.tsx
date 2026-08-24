import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-white">
      <section className="relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(34,197,94,0.12),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.08),_transparent_35%)]" />

        <div className="mx-auto flex min-h-screen max-w-6xl items-center px-6 py-16 lg:px-8">
          <div className="grid w-full items-center gap-14 lg:grid-cols-2">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                RENTAL MATCH
              </div>

              <h1 className="max-w-2xl text-5xl font-bold leading-[1.08] tracking-tight text-gray-950 sm:text-6xl">
                Find a home that{" "}
                <span className="text-green-600">fits your life.</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-gray-500">
                Discover properties that match your budget, preferred
                location, number of bedrooms, and the amenities that matter
                most to you.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/match"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-gray-200 transition hover:-translate-y-0.5 hover:bg-gray-800"
                >
                  Find My Property
                  <span>→</span>
                </Link>

                <Link
                  href="/properties"
                  className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50"
                >
                  Browse Properties
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Personalized matches
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Multiple locations
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Flexible budgets
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-green-100 blur-3xl" />
              <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-blue-100 blur-3xl" />

              <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-3 shadow-2xl shadow-gray-200/70">
                <div className="relative h-[480px] overflow-hidden rounded-2xl bg-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85"
                    alt="Beautiful modern home"
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                  <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/20 bg-white/90 p-5 shadow-xl backdrop-blur-md">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                          Featured Property
                        </p>

                        <h2 className="mt-1 text-xl font-bold text-gray-900">
                          Modern Family Home
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                          📍 Abuja, Nigeria
                        </p>
                      </div>

                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                        Available
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
                      <div>
                        <p className="text-lg font-bold text-gray-900">
                          ₦2,500,000
                        </p>
                        <p className="text-xs text-gray-500">per year</p>
                      </div>

                      <div className="flex gap-4 text-xs font-medium text-gray-500">
                        <span>🛏 3 Beds</span>
                        <span>✨ Furnished</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}