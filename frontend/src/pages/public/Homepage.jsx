import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import useApp from "../../store/store";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const user = useApp((state) => state.user);

  return (
    <div className="flex flex-col justify-center items-center">
      {user !== undefined && user?.rol_id === 1 && (
        <Link
          to={"/resultados-usuario"}
          className="text-center my-10 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105"
        >
          Ver mi resultado de test vocacional
        </Link>
      )}

      <h1 className="text-4xl text-center font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent my-10">
        Bienvenido a la aplicación de Test Vocacional UNASAM
      </h1>
      <Link
        to={"/datos-generales"}
        className="btn hidden md:block items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 text-white border-0 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-lg shadow-cyan-500/25 transition-color"
      >
        Empezar cuestionario
      </Link>

      <DotLottieReact
        src="https://lottie.host/721b915d-4a74-4059-ab28-526122d9ae2c/FVa7Cb93dh.lottie"
        autoplay
      />

      <Link
        to={"/datos-generales"}
        className="btn md:hidden inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 text-white border-0 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-lg shadow-cyan-500/25 transition-color"
      >
        Empezar cuestionario
      </Link>
    </div>
  );
};
