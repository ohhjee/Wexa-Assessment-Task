"use client";

import { BackButton, PropertyCard } from "@/components";
import { Property } from "@/definition";
import { useEffect, useState } from "react";

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/properties")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch properties");
        }

        return res.json();
      })
      .then((data) => {
        console.log(data);
        setProperties(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-gray-50">
      <section className="relative border-b bg-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(34,197,94,0.08),_transparent_35%)]" />

        <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
          <BackButton />

          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Find your next home
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">
                Available <span className="text-green-600">Properties</span>
              </h1>

              <p className="mt-4 max-w-xl text-base leading-7 text-gray-500 md:text-lg">
                Discover comfortable and affordable properties in your preferred
                location.
              </p>
            </div>

            {!loading && properties.length > 0 && (
              <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-xl">
                  🏠
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Available
                  </p>

                  <p className="mt-0.5 text-xl font-bold text-gray-900">
                    {properties.length}{" "}
                    <span className="text-sm font-medium text-gray-500">
                      {properties.length === 1 ? "property" : "properties"}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
        {loading ? (
          <div>
            <div className="mb-6">
              <div className="h-6 w-40 animate-pulse rounded bg-gray-200" />
              <div className="mt-2 h-4 w-64 animate-pulse rounded bg-gray-100" />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <PropertySkeleton key={item} />
              ))}
            </div>
          </div>
        ) : properties.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 bg-white px-6 py-20 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-green-50 text-3xl">
              🏠
            </div>

            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              No properties found
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
              We couldn&apos;t find any available properties right now. Please
              check again later.
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-gray-200 transition hover:-translate-y-0.5 hover:bg-gray-800"
            >
              Try Again
              <span>↻</span>
            </button>
          </div>
        ) : (
          <section>
            <div className="mb-6 flex items-end justify-between">
              <div>
                <p className="text-sm font-semibold text-green-600">
                  PROPERTY LISTINGS
                </p>

                <h2 className="mt-1 text-2xl font-bold text-gray-950">
                  Explore properties
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Find a place that fits your needs and budget.
                </p>
              </div>

              <div className="hidden rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 shadow-sm sm:block">
                {properties.length}{" "}
                {properties.length === 1 ? "result" : "results"}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function PropertySkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="h-52 animate-pulse bg-gray-200" />

      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-gray-100" />
        </div>

        <div className="h-8 w-1/2 animate-pulse rounded bg-gray-200" />

        <div className="flex gap-2">
          <div className="h-7 w-16 animate-pulse rounded bg-gray-100" />
          <div className="h-7 w-20 animate-pulse rounded bg-gray-100" />
          <div className="h-7 w-16 animate-pulse rounded bg-gray-100" />
        </div>

        <div className="h-11 w-full animate-pulse rounded-xl bg-gray-200" />
      </div>
    </div>
  );
}
