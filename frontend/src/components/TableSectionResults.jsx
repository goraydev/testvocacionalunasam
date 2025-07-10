import { useQuery } from "@tanstack/react-query";
import useTestVocacional from "../hooks/useTestVocacional";

const columns = [
  { header: "SECCIÓN", accessor: "section_id" },
  { header: "ÁREA", accessor: "area" },
  { header: "PUNTAJE", accessor: "score" },
  { header: "NIVEL DE INTERÉS", accessor: "level_interest" },
];

const Table = ({ data }) => (
  <div className="w-full overflow-x-auto">
    <table
      className="w-full text-left border border-separate rounded border-slate-200"
      cellSpacing="0"
    >
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.accessor}
              scope="col"
              className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((section) => (
          <tr className="odd:bg-slate-50" key={section.id}>
            {columns.map((col) => (
              <td
                key={col.accessor}
                className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500"
              >
                {section[col.accessor]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const TableSectionResults = () => {
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
        <p className="text-red-500">Error al cargar los resultados.</p>
      </div>
    );
  }

  return <Table data={data?.section_results || []} />;
};
