import testVocacionalApi from "../api/testVocacionalApi";
import useApp from "../store/store";

const useTestVocacional = () => {
  const maxSection = useApp((state) => state.maxSection);
  const user = useApp((state) => state.user);
  const answers = useApp((state) => state.answers);
  const sumSections = useApp((state) => state.sumSections);
  const setUserStudent = useApp((state) => state.setUserStudent);
  const setMessage = useApp((state) => state.setMessage);
  const onLogin = (form) => {
    try {
      console.log(form);
    } catch (error) {
      console.error(error);
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
        user: { student: user.estudiante, age: user.edad, degree: user.grado },
        total_score_max: maxSection[0].score,
        getDominantArea,
        sumSections,
      });

      setUserStudent(data);
    } catch (error) {
      console.error(error);
      setMessage({ ok: false, msg: error.response.data.message });
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      throw new Error(`Eror al crear usuario, ${error}`);
    }
  };

  return {
    onLogin,
    getAllQuestions,
    getAllEscalas,
    getAllQuestionsByEscala,
    createUserStudent,
  };
};

export default useTestVocacional;
