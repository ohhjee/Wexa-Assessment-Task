"use client";

import { BackButton, PropertyCard } from "@/components";
import { Property } from "@/definition";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";



export default function SimilarPropertiesPage() {
  const params = useParams();
  const id = params.id as string;

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    fetch(`/api/properties/${id}/similar`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch similar properties");
        }
        return res.json();
      })
      .then((data) => {
        setProperties(data.properties || []);
      })
      .catch((err) => {
        console.error(err);
        setError("Something went wrong while finding similar properties.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <main className="min-h-screen overflow-hidden bg-gray-50">
      <section className="relative border-b bg-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(34,197,94,0.08),_transparent_35%)]" />

        <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
          <BackButton />

          <div className="mb-4 ml-4 inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            NEARBY MATCHES
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">
            Similar <span className="text-green-600">Properties</span>
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-gray-500 md:text-lg">
            Properties that share nearby places — hospitals, schools, and other
            landmarks — with this one.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              >
                <div className="h-52 animate-pulse bg-gray-200" />
                <div className="space-y-4 p-5">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-gray-100" />
                  <div className="h-8 w-1/2 animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="flex min-h-[400px] items-center justify-center rounded-3xl border border-dashed border-red-200 bg-red-50/50 p-10 text-center">
            <div className="max-w-md">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-2xl">
                🏠
              </div>
              <h2 className="mt-5 text-2xl font-bold text-gray-900">
                Something went wrong
              </h2>
              <p className="mt-3 text-sm leading-6 text-gray-500">{error}</p>
            </div>
          </div>
        ) : properties.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 bg-white px-6 py-20 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-green-50 text-3xl">
              🏠
            </div>
            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              No similar properties found
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
              We couldn&apos;t find any properties nearby the same places as
              this one.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                //   amenities: property.sharedPlaces,
                //   nearbyPlaces: property.sharedPlaces
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
