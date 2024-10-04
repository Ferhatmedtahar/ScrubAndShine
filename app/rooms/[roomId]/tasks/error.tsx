"use client";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 items-center">
      <h1 className="text-red-500 font-semibold text-3xl ">{error.message}</h1>
      <button
        onClick={reset}
        className="rounded-lg text-black bg-red-300 py-2 px-8 border-2 hover:bg-red-400 transition-colors duration-100"
      >
        Reset
      </button>
    </div>
  );
}
