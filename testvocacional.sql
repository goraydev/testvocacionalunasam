    -- Tabla de roles (sin dependencias)
    CREATE TABLE IF NOT EXISTS "roles" (
        "id" SERIAL PRIMARY KEY,
        "rol" VARCHAR(50) NOT NULL UNIQUE
    );

-- Tabla de usuarios (depende de roles)
CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(50) NOT NULL UNIQUE,
    "email" VARCHAR(100),
    "password" VARCHAR(255) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "rol_id" INTEGER NOT NULL REFERENCES "roles"("id") ON DELETE RESTRICT,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de estudiantes (depende de usuarios)
CREATE TABLE IF NOT EXISTS "students" (
    "id" SERIAL PRIMARY KEY,
    "student_name" VARCHAR(100) NOT NULL,
    "age" INTEGER NOT NULL CHECK (age > 0 AND age < 150),
    "degree" INTEGER NOT NULL,
    "observations" TEXT,
    "user_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE
);


-- Tabla de áreas vocacionales (sin dependencias)
CREATE TABLE IF NOT EXISTS "areas" (
    "id" SERIAL PRIMARY KEY,
    "section" VARCHAR(10) NOT NULL UNIQUE,
    "title" VARCHAR(100) NOT NULL,
    "area" VARCHAR(50) NOT NULL UNIQUE,
    "interpretation" TEXT NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de preguntas (depende de areas)
CREATE TABLE IF NOT EXISTS "questions" (
    "id" SERIAL PRIMARY KEY,
    "section_id" VARCHAR(10) NOT NULL REFERENCES "areas"("section") ON DELETE CASCADE,
    "question" TEXT NOT NULL,
    "order_number" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE("section_id", "order_number")
);

-- Tabla de opciones de escala (sin dependencias)
CREATE TABLE IF NOT EXISTS "scale_options" (
    "id" SERIAL PRIMARY KEY,
    "value" INTEGER NOT NULL UNIQUE,
    "label" VARCHAR(50) NOT NULL
);


-- Tabla de rangos de interés (sin dependencias)
CREATE TABLE IF NOT EXISTS "interest_levels" (
    "id" SERIAL PRIMARY KEY,
    "level_name" VARCHAR(30) NOT NULL UNIQUE,
    "lower_limit" INTEGER NOT NULL,
    "upper_limit" INTEGER NOT NULL,
    CHECK (lower_limit <= upper_limit)
);

-- Tabla de sesiones de test (depende de students)
CREATE TABLE IF NOT EXISTS "test_sessions" (
    "id" SERIAL PRIMARY KEY,
    "student_id" INTEGER NOT NULL REFERENCES "students"("id") ON DELETE CASCADE,
    "test_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" VARCHAR(20) NOT NULL DEFAULT 'En progreso' 
        CHECK (status IN ('En progreso', 'Completado', 'Cancelado')),
    "total_score" INTEGER,
    "dominant_area" VARCHAR(50) REFERENCES "areas"("area"),
    "test_version" VARCHAR(10) NOT NULL DEFAULT '1.0',
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de respuestas (depende de test_sessions y questions)
CREATE TABLE IF NOT EXISTS "responses" (
    "id" SERIAL PRIMARY KEY,
    "session_id" INTEGER NOT NULL REFERENCES "test_sessions"("id") ON DELETE CASCADE,
    "question_id" INTEGER NOT NULL REFERENCES "questions"("id") ON DELETE CASCADE,
    "response_value" INTEGER NOT NULL REFERENCES "scale_options"("value"),
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE("session_id", "question_id")
);

-- Tabla de resultados por sección (depende de students, areas y test_sessions)
CREATE TABLE IF NOT EXISTS "section_results" (
    "id" SERIAL PRIMARY KEY,
    "student_id" INTEGER NOT NULL REFERENCES "students"("id") ON DELETE CASCADE,
    "section_id" VARCHAR(10) NOT NULL REFERENCES "areas"("section") ON DELETE CASCADE,
    "session_id" INTEGER NOT NULL REFERENCES "test_sessions"("id") ON DELETE CASCADE,
    "score" INTEGER NOT NULL CHECK (score >= 0),
    "level_interest" VARCHAR(30),
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE("session_id", "section_id")
);

-- Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS "idx_students_user_id" ON "students"("user_id");
CREATE INDEX IF NOT EXISTS "idx_questions_section_id" ON "questions"("section_id");
CREATE INDEX IF NOT EXISTS "idx_test_sessions_student_id" ON "test_sessions"("student_id");
CREATE INDEX IF NOT EXISTS "idx_test_sessions_test_date" ON "test_sessions"("test_date");
CREATE INDEX IF NOT EXISTS "idx_responses_session_id" ON "responses"("session_id");
CREATE INDEX IF NOT EXISTS "idx_responses_question_id" ON "responses"("question_id");
CREATE INDEX IF NOT EXISTS "idx_section_results_session_id" ON "section_results"("session_id");
CREATE INDEX IF NOT EXISTS "idx_section_results_student_id" ON "section_results"("student_id");

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Aplicar trigger a las tablas relevantes
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON "users"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_areas_updated_at BEFORE UPDATE ON "areas"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_questions_updated_at BEFORE UPDATE ON "questions"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_test_sessions_updated_at BEFORE UPDATE ON "test_sessions"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_section_results_updated_at BEFORE UPDATE ON "section_results"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
	
	

-- Función para calcular el nivel de interés basándose en el score
CREATE OR REPLACE FUNCTION calculate_interest_level(score_value INTEGER)
RETURNS VARCHAR(30) AS $$
DECLARE
    level_name VARCHAR(30);
BEGIN
    SELECT il.level_name INTO level_name
    FROM interest_levels il
    WHERE score_value BETWEEN il.lower_limit AND il.upper_limit
    LIMIT 1;
    
    RETURN COALESCE(level_name, 'No definido');
END;
$$ LANGUAGE plpgsql;



--Inserción de data
SELECT * FROM roles;

INSERT INTO roles (rol) 
VALUES 
    ('estudiante'),
    ('administrador');


SELECT * FROM users;
INSERT INTO users (id, username, email, password, rol_id)
VALUES (1,'admin', 'jofre1236@gmail.com','$2a$12$hygzBwReRb5AseyHK31.YOkVl/vBy3Zfttic.YgbbVB3zIJrMto6m', 2);


SELECT * FROM areas;
INSERT INTO areas (section, title, area, interpretation) VALUES
('A', 'AIRE LIBRE', 'AIRE LIBRE', 'SECCIÓN A: Interés por el trabajo al aire libre. Si tu mayor puntaje se encuentra en esta área, significa que prefieres actividades realizadas en espacios abiertos, como el campo o la naturaleza, y no te sientes cómodo en ambientes cerrados como oficinas o talleres. Encuentras satisfacción en actividades prácticas al aire libre, como excursiones, cultivo o cuidado del medio ambiente. Las profesiones más afines son: ingeniero agrónomo, forestal, de minas o pesquero, biólogo, oficial de las fuerzas armadas o policiales, profesor de educación física o avicultor.'),

('B', 'MECÁNICO', 'MECÁNICO', 'SECCIÓN B: Intereses mecánicos. Un alto puntaje en esta sección indica gusto por el manejo de herramientas, la reparación de objetos y la construcción. Sueles mostrar habilidad para armar y desarmar cosas y disfrutas del trabajo manual y técnico. Las profesiones sugeridas incluyen: ingeniero civil, eléctrico, mecánico, industrial, metalúrgico o químico, aviador, técnico en radio y TV, y ebanista.'),

('C', 'DE CÁLCULO', 'DE CÁLCULO', 'SECCIÓN C: Intereses de cálculo. Si destacas en esta área, te gusta resolver problemas numéricos y disfrutas de las matemáticas más que otras materias escolares. Tienes afinidad por los cálculos, las finanzas y la organización contable. Las ocupaciones más compatibles son: auditor, contador público, economista, estadístico, matemático y funcionario bancario.'),

('D', 'CIENTÍFICO', 'CIENTÍFICO', 'SECCIÓN D: Interés científico. Este interés refleja una motivación por investigar el porqué de los fenómenos, descubrir causas y principios, incluso sin una recompensa material. Disfrutas explorar temas relacionados con la ciencia y la investigación. Las profesiones adecuadas para ti pueden ser: antropólogo, astrónomo, biólogo, ingeniero electrónico o químico, médico, odontólogo, psicólogo, químico farmacéutico o técnico de laboratorio.'),

('E', 'PERSUASIVO', 'PERSUASIVO', 'SECCIÓN E: Interés persuasivo. Puntuar alto en esta sección indica que disfrutas interactuar con las personas y convencerlas sobre ideas o proyectos. Probablemente fuiste quien organizaba o lideraba eventos escolares. Las profesiones afines son: escritor, jurista (abogado, juez, consejero jurídico), agente de publicidad, jefe de ventas y locutor de radio o TV.'),

('F', 'ARTÍSTICO', 'ARTÍSTICO', 'SECCIÓN F: Interés artístico-plástico. Un resultado alto aquí significa que te interesa el arte visual y manual. Disfrutas dibujar, pintar, modelar o decorar y tienes creatividad para las formas y colores. Las carreras recomendadas son: arquitecto, decorador de interiores, dibujante, escultor, pintor y fotógrafo.'),

('G', 'LITERARIO', 'LITERARIO', 'SECCIÓN G: Interés literario. Si obtuviste un puntaje elevado en esta sección, disfrutas leer, escribir y expresarte por medio del lenguaje. Te interesan los cursos de literatura y participas activamente en actividades literarias. Las profesiones ideales son: escritor, jurista, periodista, profesor de letras y bibliotecario.'),

('H', 'MUSICAL', 'MUSICAL', 'SECCIÓN H: Interés musical. Tener afinidad en esta área indica que te gusta la música, ya sea interpretarla, escucharla o estudiar sobre ella. Tienes interés en el arte sonoro y en participar en actividades musicales o artísticas. Las profesiones relacionadas son: compositor, músico, profesor de música y artista de ballet.'),

('I', 'SERV. SOCIAL', 'SERVICIO SOCIAL', 'SECCIÓN I: Interés para el servicio social. Este interés refleja una preocupación genuina por ayudar a los demás, especialmente a personas en situación de vulnerabilidad. Disfrutas participar en actividades solidarias y de apoyo comunitario. Las profesiones sugeridas son: sacerdote, pedagogo, médico, cirujano, enfermero y consejero.'),

('J', 'DE OFICINA', 'DE OFICINA', 'SECCIÓN J: Interés en el trabajo de oficina. Un puntaje alto aquí muestra tu preferencia por tareas organizadas y metódicas, como clasificar documentos, redactar textos y mantener el orden. Te interesan las labores administrativas y de archivo. Las ocupaciones relacionadas son: archivista, contador, secretaria y bibliotecario.');



select * from questions q ;

INSERT INTO questions (section_id, question, order_number) VALUES
('A', 'Salir de excursión.', 1),
('A', 'Participar en un club de exploradores.', 2),
('A', 'Vivir al aire libre, fuera de la ciudad.', 3),
('A', 'Sembrar plantas en una chacra durante las vacaciones.', 4),
('A', 'Criar animales en un año durante las vacaciones.', 5),
('A', 'Ser técnico agrícola en una región algodonera u otro.', 6);




INSERT INTO questions (section_id, question, order_number) VALUES
('B', 'Armar y desarmar artefactos mecánicos.', 1),
('B', 'Maneja herramientas y maquinarias', 2),
('B', 'Construir objetos y muebles de madera.', 3),
('B', 'Reparar las instalaciones eléctricas de tu casa.', 4),
('B', 'Diseñar y dirigir la construcción de un pozo o noria', 5),
('B', 'Ser experto mecánico en un gran taller.', 6);


INSERT INTO "questions" ("section_id", "question", "order_number") VALUES
('C', 'Resolver operaciones numéricas.', 1),
('C', 'Resolver problemas de aritmética.', 2),
('C', 'Llevar cuentas de un club escolar.', 3),
('C', 'Explicar a otros cómo resolver problemas de aritmética.', 4),
('C', 'Participar en concursos de aritmética.', 5),
('C', 'Ser experto en hacer cálculos en una industria.', 6);



INSERT INTO "questions" ("section_id", "question", "order_number") VALUES
('D', 'Conocer y estudiar la estructura de las plantas y de los animales.', 1),
('D', 'Hacer experimentos en biología, física y química.', 2),
('D', 'Investigar el origen de las costumbres de los pueblos.', 3),
('D', 'Estudiar y entender las causas del comportamiento de diferentes grupos sociales.', 4),
('D', 'Leer revistas y libros científicos.', 5),
('D', 'Ser investigador en un laboratorio de biología, física o química.', 6);



INSERT INTO "questions" ("section_id", "question", "order_number") VALUES
('E', 'Discutir un tema en clase.', 1),
('E', 'Ser jefe de un club o institución.', 2),
('E', 'Dirigir una campaña política de un candidato estudiantil.', 3),
('E', 'Hacer propaganda para la venta de un periódico estudiantil.', 4),
('E', 'Convencer a los compañeros para que hagan lo correcto.', 5),
('E', 'Ser agente de ventas de una empresa comercial.', 6);



INSERT INTO "questions" ("section_id", "question", "order_number") VALUES
('F', 'Dibujar y pintar a lápiz y colores.', 1),
('F', 'Modelar en barro o arcilla.', 2),
('F', 'Encargarte del decorado para una exposición escolar.', 3),
('F', 'Idear y diseñar el escudo de un club escolar o de una institución.', 4),
('F', 'Diseñar la ropa o vestuario para una función teatral.', 5),
('F', 'Ser experto dibujante en una empresa industrial.', 6);


INSERT INTO "questions" ("section_id", "question", "order_number") VALUES
('G', 'Escribir cuentos, crónicas y artículos.', 1),
('G', 'Leer obras literarias.', 2),
('G', 'Escribir versos para un periódico mural estudiantil.', 3),
('G', 'Representar un papel en una obra teatral.', 4),
('G', 'Participar en un concurso de oratoria.', 5),
('G', 'Ser redactor de un periódico.', 6);

INSERT INTO "questions" ("section_id", "question", "order_number") VALUES
('H', 'Cantar en un coro estudiantil.', 1),
('H', 'Escuchar música clásica.', 2),
('H', 'Aprender a tocar un instrumento musical.', 3),
('H', 'Ser miembro de un grupo o asociación musical.', 4),
('H', 'Leer biografías de músicos eminentes.', 5),
('H', 'Componer canciones, crearlas y ponerles música.', 6);


INSERT INTO "questions" ("section_id", "question", "order_number") VALUES
('I', 'Atender a los enfermos y cuidar de ellos.', 1),
('I', 'Proteger a los muchachos menores de un grupo.', 2),
('I', 'Ser miembro de un club de ayuda y asistencial.', 3),
('I', 'Enseñar a leer a los analfabetos.', 4),
('I', 'Ayudar a tus compañeros en sus dificultades y preocupaciones.', 5),
('I', 'Trabajar al servicio de las clases humildes.', 6);

INSERT INTO "questions" ("section_id", "question", "order_number") VALUES
('J', 'Llevar en orden libros, cuadernos y apuntes.', 1),
('J', 'Ordenar y clasificar los libros de la biblioteca.', 2),
('J', 'Aprender a escribir a máquina y taquigrafía.', 3),
('J', 'Aprender a redactar correctamente cartas, oficios y otros documentos.', 4),
('J', 'Encargarte de los archivos y documentos de un club o institución.', 5),
('J', 'Ser técnico organizador de oficinas.', 6);


select * from scale_options s ;
INSERT INTO "scale_options" ("value", "label") VALUES
(5, 'me gusta mucho'),
(4, 'me gusta algo o en parte'),
(3, 'me es indiferente, ni me gusta ni me disgusta'),
(2, 'me desagrada algo o en parte'),
(1, 'me desagrada mucho o totalmente');



select * from interest_levels i ;

INSERT INTO "interest_levels" ("level_name", "lower_limit", "upper_limit") VALUES
('Interés total', 27, 30),
('Interés parcial', 21, 26),
('Indiferente', 16, 20),
('Rechazo parcial', 10, 15),
('Rechazo total', 6, 9);


--Vista de todas las preguntas por seccion
CREATE OR REPLACE VIEW allquestions AS
SELECT
    a.id,
    a.area AS title,
    a.interpretation AS interpretation,
    json_agg(q.question ORDER BY q.order_number) AS questions
FROM
    areas a
INNER JOIN
    questions q ON q.section_id = a.section
GROUP BY
    a.id, a.area, a.interpretation
ORDER BY
    a.id;


--vista de areas filtradas por seccion
CREATE OR REPLACE FUNCTION get_areas_by_sections(p_sections TEXT[])
RETURNS TABLE (
    id INT,
    section VARCHAR(10),
    title VARCHAR(100),
    area VARCHAR(50),
    interpretation TEXT,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
)
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        a.id,
        a.section,
        a.title,
        a.area,
        a.interpretation,
        a.created_at,
        a.updated_at
    FROM areas a
    WHERE a.section = ANY(p_sections);
END;
$$ LANGUAGE plpgsql;




-- Para buscar 'A', 'B' y 'C'
SELECT * FROM get_areas_by_sections(ARRAY['A']);



--PARA ALMACENAR ESTUDIANTE, CREAR CUENTA, GUARDAR TESTS Y RESULTADOS
CREATE OR REPLACE FUNCTION insert_student_with_results(
    p_username VARCHAR,
    p_email VARCHAR,
    p_password VARCHAR,
    p_rol_id INTEGER,
    p_student_name VARCHAR,
    p_age INTEGER,
    p_degree INTEGER,
    p_observations TEXT,
    p_total_score INTEGER,
    p_dominant_area VARCHAR,
    p_test_version VARCHAR,
    p_section_results JSON
)
RETURNS VARCHAR
AS $$
DECLARE
    v_user_id INTEGER;
    v_student_id INTEGER;
    v_session_id INTEGER;
    v_section JSON;
    v_section_id VARCHAR(10);
    v_score INTEGER;
    v_interest_level VARCHAR(30);
BEGIN
    -- 1. Insertar usuario
    INSERT INTO users(username, email, password, rol_id)
    VALUES (p_username, p_email, p_password, p_rol_id)
    RETURNING id INTO v_user_id;

    -- 2. Insertar estudiante
    INSERT INTO students(student_name, age, degree, observations, user_id)
    VALUES (p_student_name, p_age, p_degree, p_observations, v_user_id)
    RETURNING id INTO v_student_id;

    -- 3. Insertar sesión de test
    INSERT INTO test_sessions(student_id, total_score, dominant_area, test_version)
    VALUES (v_student_id, p_total_score, p_dominant_area, p_test_version)
    RETURNING id INTO v_session_id;

    -- 4. Insertar resultados por sección (desde JSON)
    FOR v_section IN SELECT * FROM json_array_elements(p_section_results)
    LOOP
        v_section_id := v_section->>'section_id';
        v_score := (v_section->>'score')::INTEGER;

        -- Obtener nivel de interés
        v_interest_level := calculate_interest_level(v_score);

        INSERT INTO section_results(student_id, section_id, session_id, score, level_interest)
        VALUES (v_student_id, v_section_id, v_session_id, v_score, v_interest_level);
    END LOOP;
	RETURN p_username;
END;
$$ LANGUAGE plpgsql;

SELECT insert_student_with_results(
  'juan123',                    -- p_username
  'juan@example.com',          -- p_email
  'hashedpassword123',         -- p_password (idealmente ya hasheado)
  2,                           -- p_rol_id
  'Juan Pérez',                -- p_student_name
  18,                          -- p_age
  5,                           -- p_degree
  'Sin observaciones',         -- p_observations
  180,                         -- p_total_score
  'LITERARIO',                -- p_dominant_area
  '1.0',                       -- p_test_version
  '[{"section_id":"A","score":21},{"section_id":"B","score":18}]'::JSON -- p_section_results
);


--VISTA DE USUARIO POR NOMBRE DE USUARIO
CREATE OR REPLACE FUNCTION get_user_by_username(p_username TEXT)
RETURNS TABLE (
    id INT,
    username VARCHAR(50),
    email VARCHAR(100),
	is_active BOOLEAN,
	rol_id INTEGER,
	rol VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
    U.id, 
    U.username, 
    U.email, 
    U.is_active,
	U.rol_id,
	R.rol,
    U.created_at,
    U.updated_at
	FROM 
		users U
	INNER JOIN 
		roles R ON U.rol_id = R.id
	WHERE 
		U.username = p_username;
END;
$$ LANGUAGE plpgsql;

-- Función alternativa que incluye filtro por id del ususario
CREATE OR REPLACE FUNCTION get_user_test_results_by_status(
    p_user_id INTEGER
)
RETURNS TABLE (
    test_id INTEGER,
    student_id INTEGER,
    user_id INTEGER,
    student_name VARCHAR(100),
    age INTEGER,
    degree INTEGER,
    observations TEXT,
    test_date TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20),
    total_score INTEGER,
    dominant_area VARCHAR(50),
    section VARCHAR(10),
    area VARCHAR(50),
    interpretation TEXT
) 
LANGUAGE SQL
STABLE
AS $$
    SELECT 
        t.id AS test_id,
        t.student_id,
        s.user_id,
        s.student_name,
        s.age,
        s.degree,
        s.observations,
        t.test_date,
        t.status,
        t.total_score,
        t.dominant_area,
        a.section,
        a.area,
        a.interpretation
    FROM test_sessions t
    INNER JOIN areas a ON t.dominant_area = a.area
    INNER JOIN students s ON t.student_id = s.id
    WHERE s.user_id = p_user_id;
$$;

-- Ejemplos de uso:
SELECT * FROM get_user_test_results_by_status(14);
