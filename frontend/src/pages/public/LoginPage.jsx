import { FormSignIn } from "../../components/FormSigIn";

export const LoginPage = () => {
  return (
    <>
      <h1 className="text-4xl text-center font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
        Test Vocacional
      </h1>
      <p className="text-xl text-center md:text-3xl lg:text-4xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-medium">
        Inicia Sesión
      </p>
      <FormSignIn />
    </>
  );
};
