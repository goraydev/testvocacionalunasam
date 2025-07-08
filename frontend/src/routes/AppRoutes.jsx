import { Route, Routes } from "react-router";
import Layout from "../layout/Layout";
import { HomePage } from "../pages/public/Homepage";
import { QuestionsPage } from "../pages/public/Questionspage";
import { Error404Page } from "../pages/Error404page";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/preguntas" element={<QuestionsPage />} />
        <Route path="/*" element={<Error404Page />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
