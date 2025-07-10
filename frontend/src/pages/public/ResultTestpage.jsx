import { useQuery } from "@tanstack/react-query";
import useApp from "../../store/store";
import useTestVocacional from "../../hooks/useTestVocacional";
import { useEffect, useRef } from "react";

export const ResultTestPage = () => {
  const userStudent = useApp((state) => state.userStudent);
  const message = useApp((state) => state.message);
  const modalRef = useRef();
  const { createUserStudent } = useTestVocacional();

  const { getAllQuestionsByEscala } = useTestVocacional();
  const { isLoading, data: sections = [] } = useQuery({
    queryKey: ["sections"],
    queryFn: getAllQuestionsByEscala,
  });

  const handleSubmit = async () => {
    await createUserStudent();
    modalRef.current?.showModal();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Cargando resultados...</p>
      </div>
    );
  }

  return (
    <>
      {message !== null && (
        <div className="z-20 fixed inset-x-0 top-4 px-4">
          <div
            className={`alert ${
              message.ok ? "alert-success" : "alert-error"
            } toast toast-center toast-middle mt-4  w-80 max-w-full whitespace-normal overflow-hidden`}
          >
            <span className="text-base text-center">{message.msg}</span>
          </div>
        </div>
      )}

      <section className="flex flex-col items-center justify-center">
        <h1 className="text-4xl text-center font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent my-4">
          {userStudent?.estudiante} tu perfil es
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {sections?.map((section, index) => (
            <div
              key={section.id}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-8 rounded-md"
            >
              <div className="flex items-center mb-2">
                <div className="w-6 h-6 mr-3" />
                <div className="flex flex-col">
                  <div className="text-2xl font-bold text-center">
                    {section.title}
                  </div>
                  <div className="text-lg">{section.interpretation}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {!userStudent?.user && (
          <button
            type="button"
            onClick={handleSubmit}
            className="my-10 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105"
          >
            Guardar resultado
          </button>
        )}
      </section>

      {/* modal */}
      <dialog
        id="my_modal_5"
        className="modal modal-middle sm:modal-middle"
        ref={modalRef}
      >
        <div className="modal-box bg-gray-800">
          <h3 className="font-bold text-lg text-center">
            Guardado exitosamente
          </h3>
          <p className="py-4">
            Si quieres ver tus resultados, puedes iniciar sesión con usuario{" "}
            <span className="font-bold">{userStudent?.user}</span> y contraseña{" "}
            <span className="font-bold">{userStudent?.user}</span>
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Cerrar</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
