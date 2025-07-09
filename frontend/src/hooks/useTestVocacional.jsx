import testVocacionalApi from "../api/testVocacionalApi";

const useTestVocacional = () => {
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

  return {
    onLogin,
    getAllQuestions,
    getAllEscalas,
  };
};

export default useTestVocacional;
