import { Route, Routes } from "react-router";
import Layout from "../layout/Layout";
import { HomePage } from "../pages/public/Homepage";
import { QuestionsPage } from "../pages/public/Questionspage";
import { Error404Page } from "../pages/Error404page";
import { ResultTestPage } from "../pages/public/ResultTestpage";
import { LoginPage } from "../pages/public/LoginPage";
import { FormStudent } from "../pages/public/FormStudent";
import useApp from "../store/store";
import useTestVocacional from "../hooks/useTestVocacional";
import { useEffect } from "react";
import { ResultsUserPage } from "../pages/private/ResultsUserPage";
import { DashboardPage } from "../pages/private/DashboardPage";

const AppRoutes = () => {
  const user = useApp((state) => state.user);
  const { checkAuthToken } = useTestVocacional();
  useEffect(() => {
    checkAuthToken();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/datos-generales" element={<FormStudent />} />
        <Route path="/preguntas" element={<QuestionsPage />} />
        <Route path="/resultado" element={<ResultTestPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/resultados-usuario" element={<ResultsUserPage />} />

        {user && user?.rol === "administrador" && (
          <Route path="/dashboard" element={<DashboardPage />} />
        )}

        <Route path="/*" element={<Error404Page />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
