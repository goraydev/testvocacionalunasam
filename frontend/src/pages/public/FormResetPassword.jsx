import { Link, useParams } from "react-router-dom";
import useApp from "../../store/store";
import SignIng from "/signin.svg";
import { useState } from "react";
import useTestVocacional from "../../hooks/useTestVocacional";
export const FormResetPassword = () => {
  const { resetPassword } = useTestVocacional();
  const setMessage = useApp((state) => state.setMessage);
  const message = useApp((state) => state.message);
  const [newPassword, setNewPassword] = useState("");
  const { token } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword === "") {
      setMessage({
        ok: false,
        msg: "La nueva contraseña es obligatoria",
      });
      return;
    }

    resetPassword({ newpassword: newPassword, token });
    setNewPassword("");
    
  };

  return (
    <>
      <section className="grid md:grid-cols-2 items-center justify-center">
        <img src={SignIng} alt="Sign In" width={600} height={600} />
        <section>
          <p className="flex items-center justify-center mt-6 text-center text-black font-bold text-2xl">
            "Crea una nueva contraseña para volver a iniciar sesión"
          </p>
          {message !== null && !message.ok ? (
            <div className="z-20 bg-red-500 rounded-md my-4">
              <div className="alert alert-error">
                <span>{message.msg}</span>
              </div>
            </div>
          ) : null}

          {message !== null && message.ok ? (
            <div className="z-20 bg-gree-500 rounded-md my-4">
              <div className="alert alert-success">
                <span>{message.msg}</span>
              </div>
            </div>
          ) : null}
          <form
            action=""
            className="flex flex-col gap-4 mt-4"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="text-gray-800" id="password_id">
                Contraseña nueva
              </label>
              <input
                type="password"
                className="grow placeholder-gray-500 input input-info input-md bg-white w-full text-black"
                placeholder="Crea tu contraseña"
                autoComplete="off"
                id="password_id"
                name="password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <button
              className="btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 text-white border-0 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-lg shadow-cyan-500/25 transition-color"
              type="submit"
            >
              Recuperar
            </button>
          </form>
          <Link className="block mt-3" to={"/login"}>
            ¿Ya tienes tu cuenta? <span>Volver</span>
          </Link>
        </section>
      </section>
    </>
  );
};
