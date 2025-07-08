import { useState } from "react";
import { sumBySection } from "../../helpers/sumBySection";
import useApp from "../../store/store";
import { useNavigate } from "react-router";
import { getMaxSection } from "../../helpers/getMaxSection";
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
  const getSectionStore = useApp((state) => state.getSectionStore);
  const navigate = useNavigate();
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
    const resultSumaSections = sumBySection(answers);
    console.log(resultSumaSections);
    const maxSection = getMaxSection(resultSumaSections);
    console.log(maxSection);
    getSectionStore(maxSection);
    alert("¡Test completado! Revisa la consola para ver las respuestas.");
    navigate("/resultado");
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4 flex items-center justify-center">
        <div className="w-full max-w-2xl shadow-2xl border-0">
          <div className="p-12 text-center">
            <div className="mb-8 flex flex-col items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 128 128"
              >
                <path
                  fill="#fcc21b"
                  d="M72.59 58.36c-.65 1.18-1.3 2.37-1.92 3.55l-.52.98l-.05.08c1.83 2.43 3.4 5.04 4.64 7.69c.18.37.35.75.52 1.13c1.77-.52 3.55-.81 5.29-.88c-1.31-3.47-3.33-7.07-6.3-10.71c-.52-.63-1.09-1.23-1.66-1.84m5.34 26.8c-.37 0-.75.02-1.13.06c-2.07 6.54-8.79 9.4-15.89 8.52c-11.15-1.37-21.38-9.85-24.81-20.5c-.7-2.13-.94-4.25-1.02-6.51c-.2-5.82.92-12.05 6.75-14.46l.07-.03c.19-.08.38-.13.57-.19c-.42-.63-.85-1.29-1.26-2.02c-.58-1.03-.93-2.12-1.14-3.18c-6.25 2.18-10.06 7.7-12.73 13.78c-2.55 5.82-19.12 50.57-19.12 50.57l-2.22 6c-.76 2.08-1.94 4.17-1.94 6.44c0 2.65 2.36 4.46 5.02 3.72c1.78-.5 3.74-1.42 5.55-2.14c3.83-1.56 10.93-4.63 10.93-4.63l29.68-12.22s14.31-5.18 20.33-10.85c2.92-2.75 5.26-6.71 6.29-11.44c-.21-.11-.43-.23-.65-.32c-1-.41-2.07-.6-3.28-.6M55.68 47.54c.77 1.47 1.62 3.14 1.94 5.21c1.42.6 2.78 1.32 4.07 2.17c.45-1.44.92-2.86 1.41-4.31c-.21-.13-.42-.28-.63-.4c-2.11-1.2-4.48-2.22-6.95-2.98c.06.11.11.2.16.31"
                />
                <path
                  fill="#d7598b"
                  d="M111.93 31.98c-.16 1-.12 2.42.04 3.4c.17 1.1.42 2.27.82 3.31c.57 1.46 1.27.95 2.7.75c.99-.13 1.91-.06 2.89-.26c1.03-.21 2.05-.48 3.08-.68c2.42-.46 3.63-1 3.12-3.55c-.37-1.84-.98-3.67-1.46-5.49c-.44-.39-1.29-.17-1.81-.05c-.92.21-1.83.26-2.75.42c-1.66.27-3.4.47-5.03.86c-.83.18-1.47.43-1.6 1.29"
                />
                <path
                  fill="#40c0e7"
                  d="M98.87 62c.38.87 1.31.65 2.22.85c2.02.46 4.07.41 6.14.41c.77 0 2.72.29 3.27-.4c.44-.56.06-1.67 0-2.32l-.24-2.54c-.04-.4.03-3.02-.31-3.24c-.58-.39-1.68-.2-2.34-.19c-1.21.04-2.4.19-3.63.19c-1.59 0-3.31.02-4.85.4c-.54 1.43-.39 2.92-.39 4.49c0 .73-.16 1.67.13 2.35"
                />
                <path
                  fill="#d7598b"
                  d="M91.92 105.19c-.83-1.23-1.24-2.88-3.09-2.7c-1.74.17-3.28 1.55-4.81 2.3c-.99.48-1.71 1.34-1.91 2.42c-.23 1.23.28 2.21.87 3.26c.44.79.73 1.7 1.08 2.53c.36.86.91 1.63 1.28 2.48c.25.6.17.55.72.76c.28.1.74.18 1.04.19c1.75.05 3.65-1.72 4.92-2.76c1.02-.82 3.06-1.34 2.85-2.89c-.15-1.15-.95-2.26-1.5-3.25c-.46-.81-.95-1.59-1.45-2.34"
                />
                <path
                  fill="#40c0e7"
                  d="M111.46 113.59c-.23-.15-.45-.24-.65-.27c-1.06-.19-1.76 1.09-2.6 1.92c-1.01.97-2.21 1.74-3.13 2.8c-.99 1.16-.22 2.2.8 2.82c1.11.67 2.1 1.51 3.2 2.21c.98.63 1.77 1.19 2.86.51c.99-.62 1.54-1.71 2.22-2.62c1.26-1.7 3.41-3.07 1.3-4.94c-1.18-1.05-2.7-1.57-4-2.43M9 55.06c.05-.46 1.35-4.14.96-4.25c-.89-.22-1.73-.64-2.63-.88c-1.04-.27-2.11-.48-3.08-.96c-1.17-.58-1.89-.29-2.38.36c-.69.92-.91 2.57-1.24 3.58c-.26.79-.42 1.69.14 2.25c.64.63 1.7.99 2.53 1.26c1.04.34 2.2.94 3.27 1.04c1.46.16 2.28-1.16 2.43-2.4m59.63-35.52c1.3.58 2.56.91 3.89 1.29c.47.14.77.37 1.26.11c.63-.32 1.33-1.43 1.68-2.04c.83-1.51 1.44-3 2.01-4.59c.31-.85 1.23-2.23 1-3.13c-.2-.76-1.3-1.23-1.92-1.56c-.83-.43-1.62-1.01-2.46-1.38c-1.08-.47-2.56-.98-3.72-1.15c-.64-.1-1.09.16-1.44.57c-.32.37-.56.86-.8 1.31c-1.21 2.32-2.7 5.81-2.65 8.49c.02 1.27 2.19 1.65 3.15 2.08"
                />
                <path
                  fill="#d7598b"
                  d="M16.65 33.3c.73 1.12 1.38 2.14 2.24 3.2c.84 1.02 1.44 1.22 2.47.37c.65-.52 1.39-.93 2.01-1.49c.59-.52 1.08-1.18 1.67-1.72c.42-.39 1.25-.78 1.49-1.32c.33-.76-.36-1.42-.78-1.98c-.52-.7-.92-1.46-1.49-2.16c-.73-.88-1.52-1.71-2.34-2.53c-.67-.67-1.48-1.7-2.24-2.22c-.2-.13-.43-.22-.67-.25c-.91-.13-1.99.39-2.7.81c-.97.57-1.91 1.42-2.76 2.17c-1.33 1.18-.04 2.73.74 3.85c.78 1.08 1.62 2.13 2.36 3.27"
                />
                <path
                  fill="#40c0e7"
                  d="M16.73 9.97c.67.72 1.5 1.59 2.44 2c.83.37 1.68-.37 2.35-.78c.75-.46 1.36-1.13 1.92-1.8c.51-.62 1.2-1.29 1.58-2.01c.44-.82-.16-1.13-.77-1.62c-.73-.6-1.47-1.22-2.09-1.94c-.84-.98-1.68-2.08-2.57-2.98c-.3-.31-.66-.39-1.04-.32c-1.19.2-2.6 1.87-3.3 2.42c-.56.43-1.54 1.19-1.71 1.9c-.21.8.26 1.57.66 2.24c.65 1.08 1.65 1.95 2.53 2.89"
                />
                <path
                  fill="#ed6c30"
                  d="M45.86 29.19c1.38 4.78-2.3 8.47-2.7 13c-.12 1.31-.12 2.62.1 3.88c.14.82.37 1.62.78 2.35c.54.96 1.16 1.83 1.73 2.73c.56.87 1.06 1.75 1.4 2.76c.75 2.24.23 4.26-.09 6.48c-.26 1.77-1.16 3.44-2.24 4.84c-.33.43-1.24.98-1.02 1.61c.03.11.23.15.52.15c1.2 0 4.03-.73 4.44-.92c1.8-.87 2.85-2.63 3.78-4.33c1.38-2.52 2.27-5.46 1.88-8.35c-.08-.66-.26-1.28-.48-1.88c-.67-1.79-1.78-3.39-2.41-5.22c-.08-.22-.16-.44-.22-.67c-.92-3.58 1.29-7.09 3.15-9.94c1.83-2.79 2.52-6.89 1.22-10.09c-.66-1.62-1.72-3.24-3.01-4.43c-1.53-1.42-3.86-2.71-3.6-5.16c.22-2.13 1.66-4.37 2.75-6.13c.54-.89 2.24-2.71 2.18-3.73c-.05-1.04-1.5-1.56-2.19-2.17c-1.56-1.38-2.8-2.44-4.8-3.07a3 3 0 0 0-.94-.17c-1.29 0-1.74 1.17-2.46 2.43c-1.32 2.33-2.62 4.79-3.5 7.31c-1.66 4.68-1.91 9.51 1.68 13.89c1.24 1.53 3.53 3.03 4.05 4.83m16.22 40.35c.25.26.48.37.69.37c.39 0 .7-.4.95-.87c.19-.36.34-.73.46-1.12c.67-2.25 2-4.48 3.1-6.56c.2-.37.4-.73.59-1.09c.76-1.43 1.54-2.86 2.35-4.28c.63-1.12 1.26-2.25 1.94-3.33c1.78-2.85 4.18-5.89 7.2-7.48c1.9-1.02 4.04-1.49 5.95-2.5c2.17-1.13 3.44-2.84 4.85-4.79c1.4-1.93 2.13-4.31 3.41-6.34c.54-.86.46-1.62 1.41-2.22c2.11-1.32 4.64-.87 6.98-1.32c5.53-1.06 6.02-8.35 10.54-10.98c.95-.55 1.92-1.06 2.88-1.57c.56-.3 1.64-.67 2.03-1.22c.67-.94-.6-2.17-.98-3.03c-.66-1.48-1.65-2.97-2.5-4.35c-.72-1.16-1.36-2.21-2.64-2.21l-.25.02c-2.89.28-5.47 1.55-7.32 3.76c-2.25 2.7-2.55 6.87-6.09 8.35c-2.3.96-5.01.58-7.19 1.91c-2.58 1.58-3.41 4.7-4.13 7.44c-.54 2-.57 4.41-2.09 5.98c-2.06 2.11-5.19 2.37-7.83 3.5c-.71.31-1.39.68-2 1.16c-3.35 2.64-5.25 6.97-6.75 10.85c-.61 1.59-1.16 3.21-1.7 4.83c-.5 1.51-.99 3.02-1.46 4.54c-.24.78-.5 1.56-.74 2.35c-.61 1.98-1.17 4.01-1.89 5.96c-.5 1.25-.81 3.16.23 4.24m65.36 17.26c-.19-.2-.46-.22-.73-.22l-.31.01l-.17-.01c-.6-.04-1.1-.3-1.68-.5c-2.67-.93-4.4-1.7-6.76-3.29c-2.66-1.79-5.71-3.46-8.99-3.61l-.38-.01c-3.24 0-6.23 1.71-9.48 1.71h-.02c-3.6-.02-6.71-2.58-9.55-4.47c-.24-.16-.48-.31-.74-.45c-2.23-1.26-4.63-1.81-7.05-1.84c-.06 0-.13-.02-.19-.02c-1.67 0-3.35.26-4.99.72c-1.6.44-3.15 1.08-4.63 1.87a37.5 37.5 0 0 0-5.99 3.97c-1.03.83-2.16 1.78-2.86 2.93c-.38.61-.9 2.93.07 3.31l.13.03c.38 0 1-.4 1.27-.57c2.16-1.33 4.44-2.49 6.87-3.25c1.99-.63 4.08-1.09 6.15-1.17c.17-.01.35-.02.52-.02c1.49 0 2.97.23 4.41.79l.06.03c2.01.8 3.69 2.18 5.35 3.53c2.44 1.98 5.15 2.42 7.91 2.42c2.15 0 4.33-.26 6.46-.26c2.23 0 4.39.29 6.38 1.46c1.62.97 3.08 2.24 4.33 3.59c1.38 1.47 3.14 2.7 5.21 3.02c.88.14 1.68.21 2.57.22h.02c1.5 0 2.07-1.73 2.83-2.72c1.04-1.34 1.76-2.88 2.71-4.29c.4-.62 1.95-2.23 1.27-2.91"
                />
              </svg>
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
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105"
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
