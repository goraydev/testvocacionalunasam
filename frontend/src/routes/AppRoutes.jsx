import { Route, Routes, useLocation } from "react-router";
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
import { GeneralReportsStudent } from "../pages/private/GeneralReportsStudent";
import { Settings } from "../pages/private/Settings";
import { FormRecovery } from "../pages/public/FormRecovery";
import { FormResetPassword } from "../pages/public/FormResetPassword";

const AppRoutes = () => {
  const user = useApp((state) => state.user);
  const { checkAuthToken } = useTestVocacional();
  const location = useLocation();
  useEffect(() => {
    const publicRoutes = [
      "/",
      "/login",
      "/recuperar",
      "/recuperar-password",
      "/preguntas",
      "/resultado",
      "/datos-generales",
    ];
    // Verifica si la ruta actual es pública
    const isPublicRoute = publicRoutes.some((route) =>
      location.pathname.startsWith(route)
    );

    checkAuthToken(isPublicRoute);
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/datos-generales" element={<FormStudent />} />
        <Route path="/preguntas" element={<QuestionsPage />} />
        <Route path="/resultado" element={<ResultTestPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/recuperar" element={<FormRecovery />} />
        <Route path="/resultados-usuario" element={<ResultsUserPage />} />
        <Route
          path="/recuperar-password/:token"
          element={<FormResetPassword />}
        />

        {user && user?.rol === "administrador" && (
          <>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route
              path="/reporte-estudiante/:id_student"
              element={<GeneralReportsStudent />}
            />
          </>
        )}

        {user && (
          <>
            <Route path="/ajustes" element={<Settings />} />
          </>
        )}

        <Route path="/*" element={<Error404Page />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
