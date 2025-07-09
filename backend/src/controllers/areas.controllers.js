import { pool } from "../db.js";

export const getAreasBySection = async (req, res) => {
  const { form } = req.body; 
  const sections = Array.isArray(form) ? form : [];

  // Extraer solo los section_id del resultado
  const filters = sections.map((area) => area.section_id);

  try {
    const result = await pool.query(
      "SELECT * FROM get_areas_by_sections($1)",
      [filters]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener áreas por sección:", error);
    res.status(500).json({ error: "Error al obtener áreas por sección" });
  }
};
