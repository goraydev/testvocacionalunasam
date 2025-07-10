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
