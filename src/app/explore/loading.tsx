import LoadingLottie from "@/components/LoadingLottie";
// import { Skeleton } from "@/components/ui/skeleton";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/compat/router";

function Loading() {
  // const [loading, setLoading] = useState(false);
  // const router = useRouter();

  // useEffect(() => {
  //   const handleRouteStart = () => setLoading(true);
  //   const handleRouteComplete = () => setLoading(false);

  //   router?.events.on('routeChangeStart', handleRouteStart);
  //   router?.events.on('routeChangeComplete', handleRouteComplete);
  //   router?.events.on('routeChangeError', handleRouteComplete);

  //   return () => {
  //     router?.events.off('routeChangeStart', handleRouteStart);
  //     router?.events.off('routeChangeComplete', handleRouteComplete);
  //     router?.events.off('routeChangeError', handleRouteComplete);
  //   };
  // }, [router]);

  return (
    <LoadingLottie />

    // <div>
    //   <p className="text-lg font-medium">Result:</p>
    //   <div className="mt-2 grid gap-6">
    //     <div className="flex">
    //     </div>
    //     {/* {Array.from(['first', 'second']).map((d) => (
    //       <Skeleton key={d} className="h-64 sm:h-48 w-full" />
    //     ))} */}
    //   </div>
    // </div>
  );
}

export default Loading;
