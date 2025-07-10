import { pool } from "../db.js";

export const getAllStudents = async (req, res) => {
    try {

        const result = await pool.query("SELECT * FROM allstudents");
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "No se encontraron estudiantes" });
        }
        return res.status(200).json(result.rows);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const getStudentCompleteData = async (req, res) => {
    const { id } = req.params;

    try {
        // Ejecutar ambas consultas en paralelo para optimizar tiempo
        const [sessionsResult, sectionResultsResult] = await Promise.all([
            pool.query("SELECT * FROM get_student_test_sessions($1)", [id]),
            pool.query("SELECT * FROM get_student_section_results($1)", [id])
        ]);

        // Verificar si se encontraron datos
        const hasSessions = sessionsResult.rows.length > 0;
        const hasSectionResults = sectionResultsResult.rows.length > 0;

        if (!hasSessions && !hasSectionResults) {
            return res.status(404).json({
                message: "No se encontraron datos para este estudiante"
            });
        }

        // Estructurar la respuesta
        const response = {
            student_id: parseInt(id),
            sessions: sessionsResult.rows,
            section_results: sectionResultsResult.rows,
            summary: {
                total_sessions: sessionsResult.rows.length,
                total_section_results: sectionResultsResult.rows.length,
                has_sessions: hasSessions,
                has_section_results: hasSectionResults
            }
        };

        return res.status(200).json(response);

    } catch (error) {
        console.error('Error fetching student complete data:', error);
        return res.status(500).json({
            message: "Error interno del servidor",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};