import Erro404Image from "/404.svg";

export const Error404Page = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img src={Erro404Image} alt="Error 404" width={600} height={600} />
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        No existe esta página
      </h1>
    </div>
  );
};
