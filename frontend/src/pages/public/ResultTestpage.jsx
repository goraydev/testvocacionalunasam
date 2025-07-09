import { useQuery } from "@tanstack/react-query";
import useApp from "../../store/store";
import useTestVocacional from "../../hooks/useTestVocacional";
import { useEffect } from "react";

export const ResultTestPage = () => {
  const user = useApp((state) => state.user);
  const { getAllQuestionsByEscala } = useTestVocacional();
  const { isLoading, data: sections = [] } = useQuery({
    queryKey: ["sections"],
    queryFn: getAllQuestionsByEscala,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Cargando resultados...</p>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-4xl text-center font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent my-4">
        {user?.estudiante} tu perfil es
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {sections?.map((section, index) => (
          <div
            key={section.id}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-8 rounded-md"
          >
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 mr-3" />
              <div className="flex flex-col">
                <div className="text-2xl font-bold text-center">
                  {section.title}
                </div>
                <div className="text-lg">{section.interpretation}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
