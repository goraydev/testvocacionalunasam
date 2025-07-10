import { useEffect } from "react";
import useTestVocacional from "../../hooks/useTestVocacional";
import { useQuery } from "@tanstack/react-query";
import { transformDate } from "../../helpers/transformDate";

export const ResultsUserPage = () => {
  const { getResultsByUserStudent } = useTestVocacional();

  const { isLoading, data } = useQuery({
    queryKey: ["results"],
    queryFn: getResultsByUserStudent,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Cargando resultados...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      <p className="text-black text-lg">
        Test vocacional realizado el {transformDate(data.test_date)}
      </p>
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-8 rounded-md">
        <div className="flex items-center mb-2">
          <div className="w-6 h-6 mr-3" />
          <div className="flex flex-col">
            <span className="text-xl text-center">ÁREA DOMINANTE </span>
            <div className="text-2xl font-bold text-center">
              {data.dominant_area}
            </div>
            <div className="text-lg">{data.interpretation}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
