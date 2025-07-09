import { pool } from "../db.js";


export const getAllQuestions = async (req, res) => {

    try {

        const result = await pool.query("SELECT * FROM allquestions");
        res.json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
