import React from "react";

export const SendEmail = ({ url }) => {
  return (
    <html>
      <body
        style={{ backgroundColor: "#ffffff", fontFamily: "Arial, sans-serif" }}
      >
        <table
          width="100%"
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            padding: "20px",
            backgroundColor: "#ffffff",
            border: "1px solid #eaeaea",
            borderRadius: "8px",
          }}
        >
          <tbody>
            <tr>
              <td align="center">
                <img
                  src="https://react-email-demo-ebxvhnzrt-resend.vercel.app/static/raycast-logo.png"
                  alt="Logo"
                  width="48"
                  height="48"
                  style={{ display: "block", marginBottom: "20px" }}
                />
                <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
                  Recuperar contraseña
                </h1>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: "24px",
                    marginTop: "16px",
                  }}
                >
                  Para recuperar tu contraseña, haz clic en el siguiente enlace:
                </p>
                <p style={{ margin: "24px 0" }}>
                  <a
                    href={url}
                    style={{
                      display: "inline-block",
                      backgroundColor: "#FF6363",
                      color: "#ffffff",
                      padding: "12px 20px",
                      borderRadius: "6px",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                  >
                    🔑 Recuperar contraseña
                  </a>
                </p>
                <p style={{ fontSize: "14px", color: "#8898aa" }}>
                  Si no solicitaste este cambio, puedes ignorar este correo.
                </p>
                <hr style={{ margin: "32px 0", borderColor: "#eaeaea" }} />
                <p style={{ fontSize: "12px", color: "#8898aa" }}>
                  Test Vocacional • Perú
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
};
