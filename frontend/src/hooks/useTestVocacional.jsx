import testVocacionalApi from "../api/testVocacionalApi";
import useApp from "../store/store";

const useTestVocacional = () => {
  const maxSection = useApp((state) => state.maxSection);
  const user = useApp((state) => state.user);
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

  return {
    onLogin,
    getAllQuestions,
    getAllEscalas,
    getAllQuestionsByEscala,
  };
};

export default useTestVocacional;
