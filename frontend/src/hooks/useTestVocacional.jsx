import testVocacionalApi from "../api/testVocacionalApi";
import useApp from "../store/store";
import { useNavigate } from "react-router-dom";

const useTestVocacional = () => {
  const maxSection = useApp((state) => state.maxSection);
  const user = useApp((state) => state.user);
  const setUser = useApp((state) => state.setUser);
  const userStudent = useApp((state) => state.userStudent);
  const answers = useApp((state) => state.answers);
  const sumSections = useApp((state) => state.sumSections);
  const setUserStudent = useApp((state) => state.setUserStudent);
  const setMessage = useApp((state) => state.setMessage);
  const existStudent = useApp((state) => state.existStudent);

  const navigate = useNavigate();

  const onLogin = async (form) => {
    try {
      const { data } = await testVocacionalApi.post("/login", form);
      const { usuario, token } = data;
      localStorage.setItem("token", token);
      navigate("/", { replace: true });
      setUser(usuario);
      setMessage(null);
    } catch (error) {
      console.error(error);
      const errorMsg =
        error?.response?.data?.message ||
        "Error al realizar el inicio de sesión";
      setMessage({ ok: false, msg: errorMsg });
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      throw new Error(`Error al iniciar sesión, ${errorMsg}`);
    }
  };

  const logOut = () => {
    localStorage.clear();
    setUser(undefined);
    navigate("/", { replace: true });
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return logOut();
    try {
      const { data } = await testVocacionalApi.get("/renew");
      localStorage.setItem("token", data.token);
      setUser(data.usuario);

      return data;
    } catch (error) {
      console.error(error);
      logOut();
      localStorage.clear();
      throw new Error(`Error al regenerar token ${error}`);
    }
  };

  const changePassword = async (form) => {
    try {
      const { data } = await testVocacionalApi.put(
        `/cambiar-password/${user?.id}`,
        form
      );

      setMessage({ ok: true, msg: data.message });
    } catch (error) {
      console.error(error);
      setMessage({ ok: false, msg: error.response.data.message });
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      throw new Error(`Error al cambiar la contraseña, ${error}`);
    }
  };

  const changeEmail = async (form) => {
    try {
      const { data } = await testVocacionalApi.put(`/email/${user?.id}`, form);

      setUser({ ...user, email: data.email });
      setMessage({ ok: true, msg: data.message });
    } catch (error) {
      console.error(error);
      setMessage({ ok: false, msg: error.response.data.message });
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      throw new Error(`Error al cambiar el email, ${error}`);
    }
  };
  const getAllQuestions = async () => {
    try {
      const { data } = await testVocacionalApi.get("/preguntas");
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getAllEscalas = async () => {
    try {
      const { data } = await testVocacionalApi.get("/escalas");
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getAllQuestionsByEscala = async () => {
    try {
      const { data } = await testVocacionalApi.post(`/areas`, {
        form: maxSection,
      });

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const createUserStudent = async () => {
    try {
      const getAreasBySection = await getAllQuestionsByEscala();
      const getDominantArea = getAreasBySection[0].area;

      const { data } = await testVocacionalApi.post(`/usuarios-estudiante`, {
        user: {
          student: userStudent.estudiante,
          age: userStudent.edad,
          degree: userStudent.grado,
        },
        total_score_max: maxSection[0].score,
        getDominantArea,
        sumSections,
      });

      setUserStudent({ ...userStudent, ...data });
    } catch (error) {
      console.error(error);
      setMessage({ ok: false, msg: error.response.data.message });
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      throw new Error(`Eror al crear usuario, ${error}`);
    }
  };

  const getResultsByUserStudent = async () => {
    try {
      const { data } = await testVocacionalApi.get(
        `/resultados/usuario/${user?.id}`
      );

      return data;
    } catch (error) {
      console.error(error);
      setMessage({ ok: false, msg: error.response.data.message });
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      throw new Error(`Eror al traer resultados del usuario, ${error}`);
    }
  };

  const getStudents = async () => {
    try {
      const { data } = await testVocacionalApi.get("/estudiantes");
      return data;
    } catch (error) {
      console.error(error);
      setMessage({ ok: false, msg: error.response.data.message });
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  const getUserStudentResults = async () => {
    const { id_student } = existStudent;

    try {
      const { data } = await testVocacionalApi.get(
        `/estudiantes/${id_student}/reporte`
      );

      return data;
    } catch (error) {
      console.error(error);
      setMessage({ ok: false, msg: error.response.data.message });
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  return {
    onLogin,
    logOut,
    checkAuthToken,
    changePassword,
    changeEmail,
    getAllQuestions,
    getAllEscalas,
    getAllQuestionsByEscala,
    createUserStudent,
    getResultsByUserStudent,
    getStudents,
    getUserStudentResults,
  };
};

export default useTestVocacional;
