import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import useTestVocacional from "../hooks/useTestVocacional";
import { useQuery } from "@tanstack/react-query";

export const ChartsAreas = () => {
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
  return (
    <LineChart width={600} height={300} data={data?.section_results}>
      <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
      <Line dataKey="score" stroke="#191a58" strokeWidth={3} name="Puntaje" />
      <XAxis dataKey="section_id" stroke="#151041" />
      <YAxis
        width="auto"
        label={{ value: "Puntaje", position: "insideLeft", angle: -90 }}
      />
      <Legend align="right" />
      <Tooltip />
    </LineChart>
  );
};
