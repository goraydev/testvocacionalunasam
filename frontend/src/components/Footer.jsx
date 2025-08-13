import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="footer bg-gray-800 text-neutral-content p-4 flex flex-col md:flex-row justify-center md:justify-between items-center">
      <aside className="grid-flow-col items-center">
        <p>Copyright © {new Date().getFullYear()} - Derechos reservados</p>
      </aside>
      <div>
        <p>
          Design & Developed by {""}
          <Link
            to={"https://gersonaguedoyanac.netlify.app/"}
            className="link link-info"
          >
            Gerson Aguedo Yanac
          </Link>
        </p>
      </div>
      <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end items-center">
        <p>Versión 2.0.0</p>
      </div>
    </footer>
  );
};
