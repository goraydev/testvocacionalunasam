export const TemplateEmail = (url) => {
  return `
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #fff; padding: 20px;">
        <h1 style="color: #333;">Recuperar contraseña</h1>
        <p>Para recuperar tu contraseña haz clic en el siguiente enlace:</p>
        <a
          href="${url}"
          style="
            display: inline-block;
            padding: 10px 15px;
            background-color: #FF6363;
            color: #fff;
            border-radius: 5px;
            text-decoration: none;
          "
        >
          🔑 Recuperar contraseña
        </a>
        <p style="font-size: 12px; color: #777;">
          Si no solicitaste este cambio, ignora este mensaje.
        </p>
      </body>
    </html>
  `;
};
