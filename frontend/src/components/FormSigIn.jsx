import { useEffect, useState } from "react";
import SignIng from "/signin.svg";
import useTestVocacional from "../hooks/useTestVocacional";
import useApp from "../store/store";

export const FormSignIn = () => {
  const setMessage = useApp((state) => state.setMessage);
  const message = useApp((state) => state.message);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin } = useTestVocacional();

  const handleSignIn = (e) => {
    e.preventDefault();

    if ([username, password].some((c) => c === "")) {
      setMessage({
        ok: false,
        msg: "Todos los campos son obligatorios",
      });
      return;
    }

    onLogin({
      username,
      password,
    });
  };

  useEffect(() => {
    setMessage(null);
  }, []);

  return (
    <>
      {message !== null && message.ok ? (
        <div className="z-20 toast toast-top toast-center">
          <div className="alert alert-success">
            <span>{message.msg}</span>
          </div>
        </div>
      ) : message !== null ? (
        <div className="z-20 toast toast-top toast-center">
          <div className="alert alert-error">
            <span>{message.msg}</span>
          </div>
        </div>
      ) : null}

      <section className="grid md:grid-cols-2 items-center justify-center">
        <img src={SignIng} alt="Sign In" width={600} height={600} />
        <section>
          <p className="flex items-center justify-center mt-6 text-center text-gray-800">
            "Inicia Sesión para ver los resultados del test vocacional"
          </p>
          <div
            className="tooltip tooltip-right"
            data-tip="Comprométete a compartir tus comentarios y calificaciones con respeto y responsabilidad, evitando cualquier lenguaje ofensivo o inapropiado hacia los docentes."
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
              />
            </svg>
          </div>
          <form
            action=""
            className="flex flex-col gap-4 mt-4"
            onSubmit={handleSignIn}
          >
            <label className="input input-info input-lg bg-white w-full text-black">
              Usuario
              <input
                type="text"
                className="grow placeholder-gray-500"
                placeholder="Ingrese su usuario"
                autoComplete="off"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>

            <label className="input input-lg input-info flex items-center gap-2 bg-white w-full text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-5 w-5 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow w-full placeholder-gray-500"
                placeholder="Ingrese su contraseña"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <button
              className="btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 text-white border-0 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-lg shadow-cyan-500/25 transition-color"
              type="submit"
              disabled={username === ""}
            >
              Iniciar Sesión
            </button>
          </form>
        </section>
      </section>
    </>
  );
};
