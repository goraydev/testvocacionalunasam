import { Link } from "react-router";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const HomePage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl text-center font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent my-10">
        Bienvenido a la aplicación de Test Vocacional UNASAM
      </h1>
      <DotLottieReact
        src="https://lottie.host/e266f8d7-b3aa-440a-8103-fb0b63b0654d/vZCWGBLzyQ.lottie"
        loop
        autoplay
      />

      <Link
        to={"/preguntas"}
        className="btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 text-white border-0 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-lg shadow-cyan-500/25 transition-color"
      >
        Empezar cuestionario
      </Link>
    </div>
  );
};
