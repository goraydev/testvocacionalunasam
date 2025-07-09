import { pool } from "../db.js";

export const getAllScaleOptions = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM scale_options");
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching scale options:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}