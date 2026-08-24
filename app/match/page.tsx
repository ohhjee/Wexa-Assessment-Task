"use client";

import { BackButton, PropertyCard } from "@/components";
import { Property } from "@/definition";
import { FormEvent, useState } from "react";



export default function MatchPage() {
  const [budget, setBudget] = useState("5000000");
  const [bedrooms, setBedrooms] = useState("2");
  const [area, setArea] = useState("Wuse");
  const [amenity, setAmenity] = useState("Parking");

  const [results, setResults] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const response = await fetch("/api/match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          budget,
          bedrooms,
          area,
          amenity,
        }),
      });

      const data = await response.json();

      console.log("Matching properties:", data);

      if (!response.ok) {
        setError(data.message || "Unable to find matching properties");
        setResults([]);
        return;
      }

      setResults(data.properties || []);
    } catch (error) {
      console.error("Failed to find properties:", error);

      setError("Something went wrong. Please try again.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-gray-50">
      <div className="relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(34,197,94,0.10),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.06),_transparent_35%)]" />

        <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
          <div>
            <div className="mb-10">
              <BackButton />

              <div className="mb-4 ml-4 inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                RENTAL MATCH
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl">
                Find your perfect{" "}
                <span className="text-green-600">property.</span>
              </h1>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-500">
                Tell us what you&apos;re looking for and we&apos;ll find
                properties that match your budget, location and lifestyle.
              </p>
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-[380px_1fr]">
         
            <aside>
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl shadow-gray-200/50"
              >
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Your preferences
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Help us narrow down the best options for you.
                  </p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="budget"
                      className="text-sm font-semibold text-gray-800"
                    >
                      Maximum yearly rent
                    </label>

                    <div className="relative mt-2">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400">
                        ₦
                      </span>

                      <input
                        id="budget"
                        type="number"
                        min="0"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-8 pr-3 text-sm font-medium text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                        placeholder="1,500,000"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="bedrooms"
                      className="text-sm font-semibold text-gray-800"
                    >
                      Minimum bedrooms
                    </label>

                    <input
                      id="bedrooms"
                      type="number"
                      min="1"
                      value={bedrooms}
                      onChange={(e) => setBedrooms(e.target.value)}
                      className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm font-medium text-gray-900 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="area"
                      className="text-sm font-semibold text-gray-800"
                    >
                      Preferred area
                    </label>

                    <select
                      id="area"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm font-medium text-gray-900 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                    >
                      <option value="Wuse">Wuse</option>
                      <option value="Garki">Garki</option>
                      <option value="Maitama">Maitama</option>
                    </select>
                  </div>

   
                  <div>
                    <label
                      htmlFor="amenity"
                      className="text-sm font-semibold text-gray-800"
                    >
                      Required amenity
                    </label>

                    <select
                      id="amenity"
                      value={amenity}
                      onChange={(e) => setAmenity(e.target.value)}
                      className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm font-medium text-gray-900 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                    >
                      <option value="Parking">Parking</option>
                      <option value="Security">Security</option>
                      <option value="Generator">Generator</option>
                    </select>
                  </div>

          
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gray-950 px-4 text-sm font-semibold text-white shadow-lg shadow-gray-200 transition hover:-translate-y-0.5 hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Finding matches...
                      </>
                    ) : (
                      <>
                        Find My Property
                        <span>→</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-6 flex items-start gap-3 rounded-xl bg-green-50 p-3">
                  <span className="mt-0.5 text-green-600">✓</span>

                  <p className="text-xs leading-5 text-green-800">
                    We&apos;ll use your preferences to find properties that best
                    match your needs.
                  </p>
                </div>
              </form>
            </aside>

            <section>
             
              {error ? (
                <div className="flex min-h-[500px] items-center justify-center rounded-3xl border border-dashed border-red-200 bg-red-50/50 p-10 text-center">
                  <div className="max-w-md">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-2xl">
                      🏠
                    </div>

                    <h2 className="mt-5 text-2xl font-bold text-gray-900">
                      Match not found
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-gray-500">
                      {error}
                    </p>

                    <button
                      type="button"
                      onClick={() => setError("")}
                      className="mt-6 rounded-xl bg-gray-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                    >
                      Try again
                    </button>
                  </div>
                </div>
              ) : results.length > 0 ? (
                <>
                  <div className="mb-6 flex items-end justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600">
                        MATCHES FOUND
                      </p>

                      <h2 className="mt-1 text-2xl font-bold text-gray-950">
                        Properties for you
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        Based on your selected preferences.
                      </p>
                    </div>

                    <div className="hidden rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm sm:block">
                      {results.length}{" "}
                      {results.length === 1 ? "property" : "properties"}
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    {results.map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex min-h-[500px] items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white/70 p-10 text-center">
                  <div className="max-w-md">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-2xl">
                      🏠
                    </div>

                    <h2 className="mt-5 text-2xl font-bold text-gray-900">
                      {loading
                        ? "Finding your matches..."
                        : "Your matches will appear here"}
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-gray-500">
                      {loading
                        ? "We are searching for properties that match your preferences."
                        : "Choose your budget, preferred area, bedrooms and required amenity, then click Find My Property."}
                    </p>

                    {!loading && (
                      <div className="mt-6 flex flex-wrap justify-center gap-2">
                        <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
                          💰 Your budget
                        </span>

                        <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
                          🛏 Bedrooms
                        </span>

                        <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
                          📍 Location
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
