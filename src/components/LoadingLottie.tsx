"use client";
// components/ProgressBar.js

// import Lottie, {} from "lottie-react";
import Lottie, { LottieComponentProps } from "lottie-react";
import * as ProgressBar from "../../public/animations/ProgressBar.json";
import * as RouteAnimation from "../../public/animations/RouteAnimation.json";

// const LazyLottieComponent = lazy(() => import("lottie-react"));

const LoadingLottie = () => {
  // const [progress, setProgress] = useState(0);
  // const progressLottieRef = useRef<LottieRefCurrentProps>(null);
  // const routeLottieRef = useRef<LottieRefCurrentProps>(null);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log("prev progress:", progress);
  //     setProgress((prev) => (prev < 90 ? prev + 10 : prev));
  //     // progressLottieRef.current?.goToAndPlay(progress/10);
  //     // routeLottieRef.current?.goToAndPlay(progress/10);
  //   }, 500);
  //   // progressLottieRef.current?.goToAndPlay(5);
  //   // routeLottieRef.current?.goToAndPlay(5);
  //   return () => clearInterval(interval);
  // }, []);

  // console.log(progress);

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
    // <div className="flex flex-col justify-center items-center h-screen bg-[#f0f0f0]">
    //   <LazyLottieComponent
    //     animationData={loadingAnimation}
    //     className="w-24 h-24"
    //     // speed={progress / 100}
    //   />
    // </div>

    <>
      <div className="h-full flex flex-col items-center w-full">
        <h2 className="text-2xl font-semibold text-primary-foreground">
          Adventure awaits!
        </h2>
        <p className="font-semibold text-primary-foreground mt-2">
          Our AI is busy finding the best spots for you...
        </p>
        <div className="w-[226px] h-[226px] mt-8">
          <Lottie {...routeOptions} height={360} width={226} />
        </div>

        <div className="progres-lottie [g:!text-xs] w-[391px] h-[134px]">
          <Lottie {...progressOptions} className="" height={134} width={391} />
        </div>
        {/* <p>{`Loading... ${progress}%`}</p> */}
      </div>
    </>
  );
};

export default LoadingLottie;
