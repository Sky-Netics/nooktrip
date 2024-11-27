import dynamic from "next/dynamic";

const LoadingLottie = dynamic(() => import("@/components/LoadingLottie"), {
  ssr: false,
  loading: () => (
    <div className="w-[391px] h-[360px] animate-pulse bg-gray-200 rounded-lg" />
  ),
});

export default function Loading() {
  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center w-full max-w-3xl bg-white rounded-md pt-4 pb-2">
        <h2 className="text-2xl font-semibold text-primary-foreground">
          Adventure awaits!
        </h2>
        <p className="font-semibold text-primary-foreground mt-2 mb-4">
          Our AI is busy finding the best spots for you...
        </p>
        <LoadingLottie />
      </div>
    </div>
  );
}
