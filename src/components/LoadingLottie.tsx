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
    <div className="flex flex-col items-center">
      <div className="w-[226px] h-[226px]">
        <Lottie {...routeOptions} height={360} width={226} />
      </div>
      <div className="progres-lottie [g:!text-xs] w-[391px] h-auto -mt-8">
        <Lottie {...progressOptions} height={134} width={391} />
      </div>
    </div>
  );
};

export default LoadingLottie;
