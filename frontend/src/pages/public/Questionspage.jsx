import { useState } from "react";
const sections = [
  {
    id: 1,
    title: "Intereses Científicos",
    description: "Evalúa tu afinidad hacia las ciencias y la investigación",
    questions: [
      "Me gusta resolver problemas matemáticos complejos",
      "Disfruto realizando experimentos científicos",
      "Me interesa entender cómo funcionan las cosas",
      "Me atrae la investigación y el análisis de datos",
      "Me fascina el mundo de la tecnología",
      "Me gusta observar y analizar fenómenos naturales",
    ],
  },
  {
    id: 2,
    title: "Habilidades Artísticas",
    description: "Explora tu creatividad y expresión artística",
    questions: [
      "Me gusta crear obras de arte visual",
      "Disfruto escribiendo historias o poemas",
      "Me siento cómodo actuando frente a otros",
      "Me gusta diseñar y decorar espacios",
      "Tengo facilidad para tocar instrumentos musicales",
      "Me atrae la fotografía y el diseño gráfico",
    ],
  },
  {
    id: 3,
    title: "Liderazgo y Comunicación",
    description: "Evalúa tus habilidades de liderazgo y comunicación",
    questions: [
      "Me siento cómodo dirigiendo equipos de trabajo",
      "Disfruto hablando en público",
      "Me gusta organizar eventos y actividades",
      "Tengo facilidad para convencer a otros",
      "Me siento natural ayudando a resolver conflictos",
      "Me gusta enseñar y explicar conceptos a otros",
    ],
  },
  {
    id: 4,
    title: "Trabajo Social",
    description: "Mide tu interés en ayudar y servir a la comunidad",
    questions: [
      "Me motiva ayudar a personas en situaciones difíciles",
      "Me interesa trabajar con niños y adolescentes",
      "Disfruto participando en actividades de voluntariado",
      "Me preocupo por los problemas sociales",
      "Me gusta escuchar y aconsejar a otros",
      "Me atrae trabajar en organizaciones benéficas",
    ],
  },
  {
    id: 5,
    title: "Emprendimiento",
    description: "Evalúa tu espíritu emprendedor y empresarial",
    questions: [
      "Me gusta crear nuevos proyectos desde cero",
      "Disfruto tomando riesgos calculados",
      "Me interesa el mundo de los negocios",
      "Me atrae la idea de ser mi propio jefe",
      "Tengo facilidad para identificar oportunidades",
      "Me gusta negociar y cerrar acuerdos",
    ],
  },
  {
    id: 6,
    title: "Trabajo Manual",
    description: "Explora tu afinidad hacia actividades prácticas",
    questions: [
      "Disfruto construyendo cosas con mis manos",
      "Me gusta reparar objetos descompuestos",
      "Me siento cómodo usando herramientas",
      "Prefiero trabajar con materiales tangibles",
      "Me atrae la carpintería o la mecánica",
      "Disfruto los proyectos de bricolaje",
    ],
  },
  {
    id: 7,
    title: "Análisis y Planificación",
    description: "Mide tu capacidad analítica y de organización",
    questions: [
      "Me gusta planificar actividades con detalle",
      "Disfruto analizando datos y estadísticas",
      "Me siento cómodo manejando presupuestos",
      "Me atrae organizar sistemas y procesos",
      "Tengo facilidad para detectar errores",
      "Me gusta crear cronogramas y horarios",
    ],
  },
  {
    id: 8,
    title: "Cuidado de la Salud",
    description: "Evalúa tu interés en el bienestar y la salud",
    questions: [
      "Me interesa el funcionamiento del cuerpo humano",
      "Disfruto cuidando de personas enfermas",
      "Me atrae la medicina y los tratamientos",
      "Me preocupo por la salud mental de otros",
      "Me gusta promover hábitos saludables",
      "Me interesa la investigación médica",
    ],
  },
  {
    id: 9,
    title: "Naturaleza y Ambiente",
    description: "Explora tu conexión con el medio ambiente",
    questions: [
      "Me gusta pasar tiempo al aire libre",
      "Me preocupa la conservación del medio ambiente",
      "Disfruto estudiando plantas y animales",
      "Me atrae la agricultura y la jardinería",
      "Me interesa la sostenibilidad ambiental",
      "Me gusta explorar espacios naturales",
    ],
  },
  {
    id: 10,
    title: "Tecnología e Innovación",
    description: "Mide tu afinidad hacia la tecnología moderna",
    questions: [
      "Me fascina la programación y el desarrollo",
      "Disfruto usando nuevas tecnologías",
      "Me atrae el diseño de aplicaciones",
      "Me interesa la inteligencia artificial",
      "Me gusta automatizar procesos",
      "Me siento cómodo con dispositivos digitales",
    ],
  },
];
const scaleOptions = [
  { value: "1", label: "Totalmente en desacuerdo" },
  { value: "2", label: "En desacuerdo" },
  { value: "3", label: "Neutral" },
  { value: "4", label: "De acuerdo" },
  { value: "5", label: "Totalmente de acuerdo" },
];

export const QuestionsPage = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const progress = ((currentSection + 1) / sections.length) * 100;
  const currentSectionData = sections[currentSection];

  const handleAnswerChange = (questionIndex, value) => {
    const questionKey = `section_${currentSection}_question_${questionIndex}`;
    setAnswers((prev) => ({
      ...prev,
      [questionKey]: value,
    }));
  };

  const isCurrentSectionComplete = () => {
    return currentSectionData.questions.every((_, index) => {
      const questionKey = `section_${currentSection}_question_${index}`;
      return answers[questionKey];
    });
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Respuestas del test:", answers);
    alert("¡Test completado! Revisa la consola para ver las respuestas.");
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4 flex items-center justify-center">
        <div className="w-full max-w-2xl shadow-2xl border-0">
          <div className="p-12 text-center">
            <div className="mb-8">
              <div className="w-24 h-24 text-green-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                ¡Test Completado!
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Has respondido todas las preguntas del test vocacional. Tus
                respuestas han sido registradas exitosamente.
              </p>
            </div>
            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105"
            >
              Ver Resultados
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8 pt-8">
        <div className="flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="3em"
            height="3em"
            viewBox="0 0 24 24"
            className=" text-blue-500 mr-3"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0M3 6v13m9-13v13m9-13v13"
            />
          </svg>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
            Test Vocacional
          </h1>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Descubre tu vocación profesional respondiendo estas preguntas sobre
          tus intereses y habilidades
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            Sección {currentSection + 1} de {sections.length}
          </span>
          <span className="text-sm font-medium text-gray-600">
            {Math.round(progress)}% completado
          </span>
        </div>
        <div value={progress} className="h-3 bg-gray-200" />
      </div>

      {/* Main Card */}
      <div className="shadow-2xl border-0 overflow-hidden">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-8">
          <div className="flex items-center mb-2">
            <div className="w-6 h-6 mr-3" />
            <div className="text-2xl font-bold">{currentSectionData.title}</div>
          </div>
          <div className="text-purple-100 text-lg">
            {currentSectionData.description}
          </div>
        </div>

        <div className="p-8">
          <div className="space-y-8">
            {currentSectionData.questions.map((question, questionIndex) => {
              const questionKey = `section_${currentSection}_question_${questionIndex}`;
              return (
                <div
                  key={questionIndex}
                  className="bg-gray-50 rounded-xl p-6 border border-gray-100"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    {questionIndex + 1}. {question}
                  </h3>
                  <div className="space-y-3">
                    {scaleOptions.map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center space-x-3"
                      >
                        <input
                          type="radio"
                          name={questionKey}
                          value={option.value}
                          id={`${questionKey}_${option.value}`}
                          checked={answers[questionKey] === option.value}
                          onChange={(e) =>
                            handleAnswerChange(questionIndex, e.target.value)
                          }
                          className="radio radio-info border-2 border-blue-300 text-blue-600"
                        />
                        <label
                          htmlFor={`${questionKey}_${option.value}`}
                          className="text-gray-700 cursor-pointer flex-1 py-2 px-3 rounded-lg hover:bg-purple-50 transition-colors"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-gray-50 px-8 py-6 flex flex-col gap-4 md:flex-row justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentSection === 0}
            variant="outline"
            className="flex items-center space-x-2 px-6 py-3 border-2 border-gray-300 hover:border-blue-400 hover:text-blue-600 disabled:opacity-50 bg-transparent"
          >
            <div className="w-4 h-4" />
            <span className="text-blue-500">Anterior</span>
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">
              {isCurrentSectionComplete()
                ? "Sección completada"
                : "Responde todas las preguntas"}
            </p>
            <div className="flex space-x-1">
              {Array.from({ length: 6 }).map((_, i) => {
                const questionKey = `section_${currentSection}_question_${i}`;
                const isAnswered = !!answers[questionKey];
                return (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full ${
                      isAnswered ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                );
              })}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={!isCurrentSectionComplete()}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>
              {currentSection === sections.length - 1
                ? "Finalizar"
                : "Siguiente"}
            </span>
            <div className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
        {sections.map((section, index) => {
          const sectionAnswers = section.questions.every((_, qIndex) => {
            const questionKey = `section_${index}_question_${qIndex}`;
            return answers[questionKey];
          });

          return (
            <button
              key={section.id}
              onClick={() => setCurrentSection(index)}
              className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                index === currentSection
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                  : sectionAnswers
                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};
