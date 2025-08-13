import React from "react";
import { BreadCrumbs } from "../../components";
import useTestVocacional from "../../hooks/useTestVocacional";
import useApp from "../../store/store";
import { useEffect } from "react";
import { useState } from "react";

let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

export const Settings = () => {
  const setMessage = useApp((state) => state.setMessage);
  const user = useApp((state) => state.user);
  const message = useApp((state) => state.message);
  const { changePassword, changeEmail, changeUserName } = useTestVocacional();
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");

  const handleUserName = (e) => {
    e.preventDefault();

    if (username === "") {
      setMessage({
        ok: false,
        msg: "Campo Nombre de Usuario es obligatorio",
      });
      return;
    }

    changeUserName({ username });
  };

  const handleEmail = (e) => {
    e.preventDefault();

    if (email === "") {
      setMessage({
        ok: false,
        msg: "Campo Email es obligatorio",
      });
      return;
    }

    if (!regex.test(email)) {
      setMessage({
        ok: false,
        msg: "El email ingresado no es valido",
      });
      return;
    }

    changeEmail({ email });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([newPassword, repeatNewPassword].some((c) => c === "")) {
      setMessage({
        ok: false,
        msg: "Todos los campos son obligatorios",
      });
      return;
    }

    if (newPassword !== repeatNewPassword) {
      setMessage({
        ok: false,
        msg: "Las contraseñas no coinciden",
      });
      return;
    }

    changePassword({ newpassword: newPassword });
  };

  useEffect(() => {
    setMessage(null);
  }, []);

  useEffect(() => {
    if (message !== null) {
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  }, [message]);

  useEffect(() => {
    setEmail(user.email);
    setUserName(user.username);
  }, [user]);

  return (
    <>
      <BreadCrumbs />

      <div className="flex items-center gap-4">
        <h1 className="text-2xl my-2 text-black">Ajustes</h1>
      </div>
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
      <section className="grid md:grid-cols-2 gap-8 justify-center">
        <div className="flex flex-col gap-4">
          <form
            action=""
            className="flex flex-col gap-4 mt-4"
            onSubmit={handleUserName}
          >
            <h2 className="text-black text-xl">Actualizar Usuario</h2>
            <div>
              <label className="text-gray-800" id="username_id">
                Nombre de usuario
              </label>
              <input
                type="text"
                className="grow placeholder-gray-500 input input-info input-md bg-white w-full text-black"
                placeholder="Registrar email para en caso de olvido de contraseña"
                autoComplete="off"
                id="username_id"
                value={username}
                name="username"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <button
              className="btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 text-white border-0 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-lg shadow-cyan-500/25 transition-color"
              type="submit"
            >
              <span>Actualizar</span>
            </button>
          </form>
          <form
            action=""
            className="flex flex-col gap-4 mt-4"
            onSubmit={handleEmail}
          >
            <div>
              <label className="text-gray-800" id="username_id">
                Email
              </label>
              <input
                type="email"
                className="grow placeholder-gray-500 input input-info input-md bg-white w-full text-black"
                placeholder="Registrar email para en caso de olvido de contraseña"
                autoComplete="off"
                id="email_id"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              className="btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 text-white border-0 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-lg shadow-cyan-500/25 transition-color"
              type="submit"
            >
              {email !== "" ? (
                <span>Cambiar Email</span>
              ) : (
                <span>Registrar Email</span>
              )}
            </button>
          </form>
        </div>
        <form
          action=""
          className="flex flex-col gap-4 mt-4"
          onSubmit={handleSubmit}
        >
          <h2 className="text-black text-xl">Cambiar Contraseña</h2>
          <div>
            <label className="text-gray-800" id="username_id">
              Nueva Contraseña
            </label>
            <input
              type="password"
              className="grow placeholder-gray-500 input input-info input-md bg-white w-full text-black"
              placeholder="Crea nueva contraseña"
              autoComplete="off"
              id="password_id"
              name="password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="text-gray-800" id="username_id">
              Repetir Nueva Contraseña
            </label>
            <input
              type="password"
              className="grow placeholder-gray-500 input input-info input-md bg-white w-full text-black"
              placeholder="Repite nueva contraseña"
              autoComplete="off"
              id="password_id2"
              name="password"
              onChange={(e) => setRepeatNewPassword(e.target.value)}
            />
          </div>
          <button
            className="btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 text-white border-0 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-lg shadow-cyan-500/25 transition-color"
            type="submit"
          >
            Cambiar Contraseña
          </button>
        </form>
      </section>
    </>
  );
};
