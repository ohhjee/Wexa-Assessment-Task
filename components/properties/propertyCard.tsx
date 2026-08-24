import { PropertyCardProps } from "@/definition";
import { useRouter } from "next/navigation";

export function PropertyCard({ property }: PropertyCardProps) {
  const router = useRouter();

  const viewProperty = (propertyID: string) => {
    router.replace(`/properties/${propertyID}`);
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/60">
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85"
          alt={property.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-black/10" />

        {property.type && (
          <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-white/90 px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm backdrop-blur-md">
            {property.type}
          </span>
        )}

        <button
          type="button"
          aria-label="Add property to favorites"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/90 text-lg text-gray-600 shadow-sm backdrop-blur-md transition hover:bg-white hover:text-red-500 active:scale-95"
        >
          ♡
        </button>

        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-sm font-medium text-white">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
            📍
          </span>

          <span>{property.area}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="truncate text-lg font-bold tracking-tight text-gray-950">
              {property.name}
            </h2>

            <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
              <span>📍</span>
              <span>{property.area}</span>
            </div>
          </div>

          <span className="shrink-0 rounded-xl bg-green-50 px-3 py-2 text-xs font-bold text-green-700">
            {property.bedrooms} Beds
          </span>
        </div>

        <div className="my-5 border-t border-gray-100" />

        <div className="flex items-end justify-between">
          <div>
            <p className="text-2xl font-bold tracking-tight text-gray-950">
              ₦{property.price.toLocaleString()}
            </p>

            <p className="mt-0.5 text-xs text-gray-400">per year</p>
          </div>

          <div className="flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            Available
          </div>
        </div>

        {property.amenities?.length > 0 && (
          <div className="mt-5">
            <div className="mb-2.5 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Amenities
              </p>

              {property.amenities.length > 2 && (
                <span className="text-xs font-medium text-gray-400">
                  {property.amenities.length} total
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {property.amenities.slice(0, 4).map((amenity) => (
                <span
                  key={amenity}
                  className="rounded-lg border border-gray-100 bg-gray-50 px-2.5 py-1.5 text-xs font-medium text-gray-600 transition group-hover:border-green-100 group-hover:bg-green-50/50"
                >
                  {amenity}
                </span>
              ))}

              {property.amenities.length > 4 && (
                <span className="rounded-lg border border-gray-100 bg-gray-50 px-2.5 py-1.5 text-xs font-medium text-gray-400">
                  +{property.amenities.length - 4}
                </span>
              )}
            </div>
          </div>
        )}

        {property.nearbyPlaces?.length > 0 && (
          <div className="my-5">
            <div className="mb-2.5 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Nearby
              </p>

              {property.nearbyPlaces.length > 2 && (
                <span className="text-xs font-medium text-gray-400">
                  {property.nearbyPlaces.length} places
                </span>
              )}
            </div>

            <div className="flex gap-2">
              {property.nearbyPlaces.slice(0, 2).map((place, index) => (
                <div
                  key={`${place}-${index}`}
                  className="flex min-w-0 items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-2.5 py-1.5 transition group-hover:border-blue-200"
                >
                  <span className="text-xs">📍</span>

                  <div className="min-w-0">
                    <p className="max-w-[130px] truncate text-xs font-semibold text-blue-700">
                      {place}
                    </p>

                    {/* <p className="text-[10px] text-blue-500">{place.type}</p> */}
                  </div>
                </div>
              ))}

              {property.nearbyPlaces.length > 2 && (
                <span className="flex items-center rounded-lg border border-gray-100 bg-gray-50 px-2.5 py-1.5 text-xs font-medium text-gray-400">
                  +{property.nearbyPlaces.length - 2}
                </span>
              )}
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => viewProperty(property.id)}
          className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-gray-950 px-4 py-4 text-sm font-semibold text-white shadow-sm transition-all hover:bg-green-600 active:scale-[0.98]"
        >
          View Property
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>
    </article>
  );
}