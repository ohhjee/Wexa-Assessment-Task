"use client";

import { BackButton } from "@/components";
import { formatPrice } from "@/lib/currencyFomatter";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface NearbyPlace {
  name: string;
  type: string;
}

interface Property {
  id: string;
  name: string;
  price: number;
  bedrooms: number;
  area: string;
  type?: string;
  amenities: string[];
  nearbyPlaces: NearbyPlace[];
  image?: string;
}

export default function PropertyDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/properties/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch property details");
        }

        return res.json();
      })
      .then((data) => {
        console.log("Data from one: ", data.properties);

        const fetchedProperty = data.properties?.[0];

        if (fetchedProperty) {
          setProperty({
            ...fetchedProperty,
            amenities: fetchedProperty.amenities ?? [],
            nearbyPlaces: fetchedProperty.nearbyPlaces ?? [],
          });
        } else {
          setProperty(null);
        }
      })
      .catch((error) => {
        console.error(error);
        setProperty(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center font-medium text-gray-500">
          Loading property details...
        </div>
      </main>
    );
  }

  if (!property) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
          <BackButton />

          <div className="flex min-h-[500px] items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white p-10 text-center">
            <div className="max-w-md">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-2xl">
                🏠
              </div>

              <h1 className="mt-5 text-2xl font-bold text-gray-900">
                Property not found
              </h1>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                The property you are looking for does not exist or may have been
                removed.
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-gray-50">
      <div className="relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(34,197,94,0.10),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.06),_transparent_35%)]" />

        <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <BackButton />

            <div className="mt-6">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                PROPERTY DETAILS
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl">
                {property.name}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>📍 {property.area}</span>

                <span className="text-gray-300">•</span>

                <span>{property.type}</span>

                <span className="text-gray-300">•</span>

                <span>{property.bedrooms} bedrooms</span>
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
            {/* Property Image */}
            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl shadow-gray-200/40">
              {property.image ? (
                <img
                  src={property.image}
                  alt={property.name}
                  className="h-[500px] w-full object-cover"
                />
              ) : (
                <div className="flex min-h-[500px] items-center justify-center bg-gradient-to-br from-green-50 via-white to-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85"
                    alt={property.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
              )}
            </div>

            <div className="space-y-6">
              {/* Price */}
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl shadow-gray-200/40">
                <p className="text-sm font-medium text-gray-500">Yearly rent</p>

                <div className="mt-2 flex items-end justify-between gap-4">
                  <h2 className="text-3xl font-bold text-gray-950">
                    {formatPrice(property.price)}
                  </h2>

                  <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                    Available
                  </span>
                </div>
              </div>

              {/* Property Overview */}
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl shadow-gray-200/40">
                <h2 className="text-lg font-bold text-gray-900">
                  Property overview
                </h2>

                <div className="mt-5 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-gray-50 p-4">
                    <p className="text-xs font-medium text-gray-400">
                      Bedrooms
                    </p>

                    <p className="mt-1 text-lg font-bold text-gray-900">
                      {property.bedrooms}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-gray-50 p-4">
                    <p className="text-xs font-medium text-gray-400">
                      Property type
                    </p>

                    <p className="mt-1 text-lg font-bold text-gray-900">
                      {property.type}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-gray-50 p-4">
                    <p className="text-xs font-medium text-gray-400">
                      Location
                    </p>

                    <p className="mt-1 text-lg font-bold text-gray-900">
                      {property.area}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-gray-50 p-4">
                    <p className="text-xs font-medium text-gray-400">Rent</p>

                    <p className="mt-1 text-lg font-bold text-gray-900">
                      Yearly
                    </p>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl shadow-gray-200/40">
                <h2 className="text-lg font-bold text-gray-900">Amenities</h2>

                {property.amenities.length > 0 ? (
                  <div className="mt-5 flex flex-wrap gap-3">
                    {property.amenities.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700"
                      >
                        <span>✓</span>
                        {amenity}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-gray-400">
                    No amenities listed for this property.
                  </p>
                )}
              </div>

              {/* Nearby Places */}
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl shadow-gray-200/40">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      Nearby places
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Important places around this property
                    </p>
                  </div>

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg">
                    📍
                  </div>
                </div>

                {property.nearbyPlaces.length > 0 ? (
                  <div className="mt-5 space-y-3">
                    {property.nearbyPlaces.map((place, index) => (
                      <div
                        key={`${place.name}-${index}`}
                        className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-4 transition hover:border-blue-100 hover:bg-blue-50/50"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-semibold text-gray-900">
                            {place.name}
                          </p>

                          <p className="mt-1 text-xs font-medium text-gray-500">
                            {place.type}
                          </p>
                        </div>

                        <div className="text-gray-300">→</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-5 rounded-2xl bg-gray-50 p-5 text-center">
                    <p className="text-sm text-gray-400">
                      No nearby places available.
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Link
                  href={`/properties/${property.id}/similar`}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-green-300 hover:bg-green-50"
                >
                  See similar properties →
                </Link>

                <Link
                  href={`/properties/${property.id}/recommendations`}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-green-300 hover:bg-green-50"
                >
                  See recommendations →
                </Link>
              </div>

              {/* Contact Agent */}
              <div className="rounded-3xl bg-gray-950 p-6 text-white shadow-xl">
                <h2 className="text-lg font-bold">
                  Interested in this property?
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                  Contact us to get more information about this property or
                  schedule a viewing.
                </p>

                <button
                  type="button"
                  className="mt-5 flex h-12 w-full items-center justify-center rounded-xl bg-green-500 px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-green-400"
                >
                  Contact Agent
                </button>
              </div>
            </div>
          </div>

          {/* About Property */}
          <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-xl shadow-gray-200/40 sm:p-8">
            <p className="text-sm font-medium text-green-600">
              ABOUT THIS PROPERTY
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-950">
              {property.name}
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-500">
              This {property.type?.toLowerCase()} is located in {property.area}.
              It offers {property.bedrooms} bedrooms and includes{" "}
              {property.amenities.length > 0
                ? property.amenities.join(", ")
                : "standard property amenities"}
              . The property is available for a yearly rent of{" "}
              {formatPrice(property.price)}.
            </p>

            {/* Nearby Places Summary */}
            {property.nearbyPlaces.length > 0 && (
              <div className="mt-6 border-t border-gray-100 pt-6">
                <h3 className="text-sm font-bold uppercase tracking-wide text-gray-900">
                  Location highlights
                </h3>

                <div className="mt-4 flex flex-wrap gap-2">
                  {property.nearbyPlaces.map((place, index) => (
                    <span
                      key={`${place.name}-summary-${index}`}
                      className="rounded-full bg-gray-100 px-3 py-2 text-xs font-medium text-gray-600"
                    >
                      {place.type}: {place.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
