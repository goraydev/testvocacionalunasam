import { useQuery } from "@tanstack/react-query";
import { BreadCrumbs } from "../../components";
import useTestVocacional from "../../hooks/useTestVocacional";
import useApp from "../../store/store";
import { useMemo } from "react";
import { TableShowData } from "../../components/TableShowData";

export const DashboardPage = () => {
  const navigation = "/reporte-estudiante";
  const { getStudents } = useTestVocacional();
  const setExistStudent = useApp((state) => state.setExistStudent);

  const columns = useMemo(
    () => [
      {
        accessorKey: "id_student",
        header: "ID",
        size: 100,
      },
      {
        accessorKey: "student_name",
        header: "ESTUDIANTE",
        size: 150,
      },
      {
        accessorKey: "age",
        header: "EDAD",
        size: 100,
      },
      {
        accessorKey: "degree",
        header: "GRADO",
        size: 100,
      },
    ],
    []
  );

  const { isLoading, data } = useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <BreadCrumbs />
      <div className="flex items-center gap-4">
        <h1 className="text-xl my-2 text-black">Tabla de Estudiantes</h1>
      </div>
      {!isLoading && (
        <TableShowData
          columns={columns}
          data={data}
          setFuncion={setExistStudent}
          navigation={navigation}
        />
      )}
    </>
  );
};
