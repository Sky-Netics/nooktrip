"use client";

import Lottie, { LottieComponentProps } from "lottie-react";
import * as ProgressBar from "../../public/animations/ProgressBar.json";
import * as RouteAnimation from "../../public/animations/RouteAnimation.json";

const LoadingLottie = () => {

  const routeOptions: LottieComponentProps = {
    loop: true,
    autoplay: true,
    animationData: RouteAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const progressOptions: LottieComponentProps = {
    loop: true,
    autoplay: true,

    animationData: ProgressBar,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (

    <>
      <div className="h-full flex flex-col items-center w-full bg-white rounded-md pt-4 pb-2">
        <h2 className="text-2xl font-semibold text-primary-foreground">
          Adventure awaits!
        </h2>
        <p className="font-semibold text-primary-foreground mt-2">
          Our AI is busy finding the best spots for you...
        </p>
        <div className="w-[226px] h-[226px] mt-4">
          <Lottie {...routeOptions} height={360} width={226} />
        </div>

        <div className="progres-lottie [g:!text-xs] w-[391px] h-auto">
          <Lottie {...progressOptions} className="" height={134} width={391} />
        </div>
        {/* <p>{`Loading... ${progress}%`}</p> */}
      </div>
    </>
  );
};

export default LoadingLottie;
