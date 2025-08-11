import { pool } from "../db.js";
import bcrypt from "bcryptjs";
import { generarJWT } from "../helpers/jwt.js";
import { createUserNameStudent } from "../helpers/createUserNameStudent.js";

export const logIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existUser = await pool.query(
      `SELECT * FROM users WHERE username='${username}'`
    );

    if (existUser.rowCount === 0) {
      return res.status(404).json({ message: "Usuario no existe" });
    }

    //Confirmar los password
    const validatePassword = bcrypt.compareSync(
      password,
      existUser.rows[0].password
    );

    if (!validatePassword) {
      return res.status(400).json({ message: "Credenciales Incorrectas" });
    }

    //Comprobamos si la cuenta esta activo
    if (!existUser.rows[0].is_active) {
      return res
        .status(400)
        .json({ message: "Usuario se encuentra desactivado" });
    }

    const usuario = await pool.query(
      `SELECT * FROM get_user_by_username('${username}')`
    );

    //Generar Json Web token
    const token = await generarJWT(
      usuario.rows[0].id,
      usuario.rows[0].username,
      usuario.rows[0].rol
    );

    res.json({ message: "Autenticado", usuario: usuario.rows[0], token });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const renewToken = async (req, res) => {
  const { id, username, rol } = req;

  try {
    const usuario = await pool.query(
      `SELECT * FROM get_user_by_username('${username}')`
    );

    // Generar un nuevo JWT
    const token = await generarJWT(id, username, rol);

    res.json({ message: "token regenerado", usuario: usuario.rows[0], token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ messge: "Internal Server Error" });
  }
};

export const createAccountUserStudent = async (req, res) => {
  const { user, total_score_max, getDominantArea, sumSections } = req.body;

  if (!user) return;

  const userNameStudent = createUserNameStudent(user);
  const userPassword = createUserNameStudent(user);

  //Encriptar password
  const salt = bcrypt.genSaltSync();
  const passwordHash = bcrypt.hashSync(userPassword, salt);

  try {
    const result = await pool.query(
      `SELECT insert_student_with_results(
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
      )`,
      [
        userNameStudent,
        "",
        passwordHash,
        1,
        user.student,
        user.age,
        user.degree,
        "",
        total_score_max,
        getDominantArea,
        "1.0",
        JSON.stringify(sumSections),
      ]
    );

    res.json({
      message: "Usuario creado",
      user: result.rows[0].insert_student_with_results,
    });
  } catch (error) {
    console.error(error);

    if (error.code === "23505") {
      return res.status(400).json({ message: "Usuario ya existe" });
    }

    res.status(500).json({ message: "Error al crear usuario estudiante" });
  }
};

export const getTestSessionByIdUser = (req, res) => {
  const { id } = req.params;

  try {
    const query = `SELECT * FROM get_user_test_results_by_status($1)`;
    pool
      .query(query, [id])
      .then((result) => {
        if (result.rowCount === 0) {
          return res
            .status(404)
            .json({ message: "No se encontró la sesión de prueba" });
        }
        res.json(result.rows[0]);
      })
      .catch((error) => {
        console.error(error);
        res
          .status(500)
          .json({ message: "Error al obtener la sesión de prueba" });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la sesión de prueba" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newpassword } = req.body;

    if (newpassword.length < 8) {
      return res.status(400).json({
        message: "La nueva contraseña debe tener al menos 8 caracteres",
      });
    }

    const salt = bcrypt.genSaltSync();
    const passwordHash = bcrypt.hashSync(newpassword, salt);

    const result = await pool.query(
      `UPDATE users SET password = $1 WHERE id = $2`,
      [passwordHash, id]
    );

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "No se encontró la sesión de prueba" });
    }
    res.json({ message: "Contraseña cambiada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al cambiar la contraseña" });
  }
};

export const changeEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rowCount) {
      return res.status(404).json({ message: "El email ya está registrado" });
    }

    await pool.query(`UPDATE users SET email = $1 WHERE id = $2`, [email, id]);

    res.json({ email, message: "Email registrado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar el email" });
  }
};

export const changeUserName = async (req, res) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (username.length < 8) {
      return res.status(400).json({
        message: "El nombre de usuario debe tener al menos 8 caracteres",
      });
    }

    if (user.rowCount) {
      return res
        .status(404)
        .json({ message: "El nombre de usuario ya está registrado" });
    }

    await pool.query(`UPDATE users SET username = $1 WHERE id = $2`, [
      username,
      id,
    ]);

    res.json({ username, message: "Nombre de usuario actualizado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al cambiar el nombre de usuario" });
  }
};
