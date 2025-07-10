import { useEffect, useState } from "react";
import datosGenerales from "/datosgenerales.svg";
import useApp from "../../store/store";
import { useNavigate } from "react-router";

export const FormStudent = () => {
  const setUserStudent = useApp((state) => state.setUserStudent);
  const userStudent = useApp((state) => state.userStudent);
  const setMessage = useApp((state) => state.setMessage);
  const message = useApp((state) => state.message);
  const navigate = useNavigate();

  const [estudiante, setEstudiante] = useState("");
  const [edad, setEdad] = useState("");
  const [grado, setGrado] = useState("");

  const handleDataStudent = (e) => {
    e.preventDefault();

    if ([estudiante, edad, grado].some((c) => c === "")) {
      setMessage({
        ok: false,
        msg: "Todos los campos son obligatorios",
      });
      return;
    }

    if (edad < 12 || edad > 30) {
      setMessage({
        ok: false,
        msg: "El rango de edad no es correcto, es válido de 12 a 30 años",
      });
      return;
    }

    setUserStudent({ estudiante, edad, grado });
    navigate("/preguntas");
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
    if (Object.values(userStudent).length > 0) {
      setEstudiante(userStudent.estudiante);
      setEdad(userStudent.edad);
      setGrado(userStudent.grado);
    }
  }, [userStudent]);

  return (
    <>
      <section className="grid md:grid-cols-2 items-center justify-center">
        <img src={datosGenerales} alt="Sign In" width={600} height={600} />
        <section>
          <p className="flex items-center justify-center mt-6 text-center text-gray-800 font-bold text-2xl">
            "Complete sus datos generales para iniciar con las preguntas"
          </p>
          {message !== null && !message.ok ? (
            <div className="z-20 bg-red-500 rounded-md my-4">
              <div className="alert alert-error">
                <span>{message.msg}</span>
              </div>
            </div>
          ) : null}

          <form action="" className="flex flex-col gap-4 mt-4">
            <div>
              <label className="text-gray-800" id="estudiante_id">
                Apellidos y Nombres
              </label>
              <input
                type="text"
                className="grow placeholder-gray-500 input input-info input-lg bg-white w-full text-black"
                placeholder="Ingrese sus datos"
                autoComplete="off"
                id="estudiante_id"
                name="estudiante"
                value={estudiante}
                onChange={(e) => setEstudiante(e.target.value)}
              />
            </div>

            <div>
              <label className="text-gray-800">Edad</label>
              <input
                type="number"
                min="12"
                max="30"
                className="grow placeholder-gray-500 input input-info input-lg bg-white w-full text-black"
                placeholder="Ingrese su edad"
                autoComplete="off"
                name="edad"
                value={edad}
                onChange={(e) => setEdad(e.target.value)}
              />
            </div>
            <div>
              <label className="text-gray-800">Grado</label>
              <select
                className="select select-info bg-white w-full text-black"
                value={grado}
                onChange={(e) => setGrado(e.target.value)}
              >
                <option disabled={true} defaultValue="">
                  Elige un grado
                </option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>

            <button
              className="btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 text-white border-0 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-lg shadow-cyan-500/25 transition-color"
              type="button"
              onClick={handleDataStudent}
            >
              Siguiente
              <i>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m14.475 12l-7.35-7.35q-.375-.375-.363-.888t.388-.887t.888-.375t.887.375l7.675 7.7q.3.3.45.675t.15.75t-.15.75t-.45.675l-7.7 7.7q-.375.375-.875.363T7.15 21.1t-.375-.888t.375-.887z"
                  />
                </svg>
              </i>
            </button>
          </form>
        </section>
      </section>
    </>
  );
};
