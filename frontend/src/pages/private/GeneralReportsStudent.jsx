import {
  BreadCrumbs,
  TableSectionResults,
  ChartsAreas,
  ResultSession,
} from "../../components";
import { useQuery } from "@tanstack/react-query";
import useTestVocacional from "../../hooks/useTestVocacional";
import useApp from "../../store/store";
import { transformDate } from "../../helpers/transformDate";

const AlertCard = ({ title, value, icon }) => (
  <div
    role="alert"
    className="bg-gray-800 alert alert-vertical sm:alert-horizontal"
  >
    <div className="h-6 w-6 shrink-0 text-info">{icon}</div>
    <div>
      <h3 className="font-bold">{title}</h3>
      <div className="text-xs">{value ?? "No disponible"}</div>
    </div>
  </div>
);

export const GeneralReportsStudent = () => {
  const existStudent = useApp((state) => state.existStudent);
  const { getUserStudentResults } = useTestVocacional();

  const { isLoading, isError, data } = useQuery({
    queryKey: ["students_results"],
    queryFn: getUserStudentResults,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Error al cargar los datos.</p>
      </div>
    );
  }

  return (
    <>
      <BreadCrumbs />
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AlertCard
          title="Estudiante"
          value={existStudent?.student_name}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M6.578 15.482c-1.415.842-5.125 2.562-2.865 4.715C4.816 21.248 6.045 22 7.59 22h8.818c1.546 0 2.775-.752 3.878-1.803c2.26-2.153-1.45-3.873-2.865-4.715a10.66 10.66 0 0 0-10.844 0M16.5 6.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0"
              />
            </svg>
          }
        />
        <AlertCard
          title="Edad"
          value={existStudent?.age}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4m0-4h.01" />
              </g>
            </svg>
          }
        />
        <AlertCard
          title="Grado"
          value={existStudent?.degree}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <g
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="4"
              >
                <path d="M2 17.4L23.022 9l21.022 8.4l-21.022 8.4z" />
                <path
                  strokeLinecap="round"
                  d="M44.044 17.51v9.223m-32.488-4.908v12.442S16.366 39 23.022 39c6.657 0 11.467-4.733 11.467-4.733V21.825"
                />
              </g>
            </svg>
          }
        />
        <AlertCard
          title="Fecha de evaluación"
          value={transformDate(data?.sessions?.[0]?.test_date)}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 14a1 1 0 1 0-1-1a1 1 0 0 0 1 1m5 0a1 1 0 1 0-1-1a1 1 0 0 0 1 1m-5 4a1 1 0 1 0-1-1a1 1 0 0 0 1 1m5 0a1 1 0 1 0-1-1a1 1 0 0 0 1 1M7 14a1 1 0 1 0-1-1a1 1 0 0 0 1 1M19 4h-1V3a1 1 0 0 0-2 0v1H8V3a1 1 0 0 0-2 0v1H5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3m1 15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9h16Zm0-11H4V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1ZM7 18a1 1 0 1 0-1-1a1 1 0 0 0 1 1"
              />
            </svg>
          }
        />
      </section>
      <ResultSession />
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <p className="text-2xl text-gray-800 mt-8 mb-4">
            Resultado por Secciones
          </p>
          <TableSectionResults />
        </div>
        <div>
          <p className="text-2xl text-gray-800 mt-8 mb-4">Perfil de interés</p>
          <ChartsAreas />
        </div>
      </section>
    </>
  );
};
