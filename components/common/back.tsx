import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };

  return (
    <button
      onClick={goBack}
      type="button"
      className="mb-8 inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:-translate-x-0.5 hover:border-gray-300 hover:bg-gray-50"
    >
      <span className="text-lg leading-none">←</span>
      Back
    </button>
  );
};
