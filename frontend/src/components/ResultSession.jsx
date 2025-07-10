import { useQuery } from "@tanstack/react-query";
import useTestVocacional from "../hooks/useTestVocacional";

export const ResultSession = () => {
  const { getUserStudentResults } = useTestVocacional();

  const { isLoading, isError, data } = useQuery({
    queryKey: ["students_results"],
    queryFn: getUserStudentResults,
  });

  const session = data?.sessions?.[0];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Cargando resultados...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error al cargar los resultados.</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">
          No se encontraron resultados para este usuario.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 my-4">
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-8 rounded-md shadow-lg">
        <div className="flex flex-col items-center space-y-2">
          <h2 className="text-xl font-semibold">ÁREA DOMINANTE</h2>
          <p className="text-2xl font-bold">
            SECCIÓN {session.section} ({session.dominant_area})
          </p>
          <p className="text-lg">Puntaje Total: {session.total_score}</p>
          <p className="text-lg">{session.interpretation}</p>
        </div>
      </div>
    </div>
  );
};
