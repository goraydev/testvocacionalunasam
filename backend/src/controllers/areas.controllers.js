import { pool } from "../db.js";

export const getAreasBySection = async (req, res) => {
  const sections = req.body || [];
  const filters = sections.map((area) => area.section);

  try {
    const result = await pool.query("SELECT * FROM get_areas_by_sections($1)", [
      filters,
    ]);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener areas por sección" });
  }
};
