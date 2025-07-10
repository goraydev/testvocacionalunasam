import { Link } from "react-router-dom";
import useApp from "../store/store";
import useTestVocacional from "../hooks/useTestVocacional";

export const NavBar = () => {
  const user = useApp((state) => state.user);
  const { logOut } = useTestVocacional();
  const handleLogout = () => {
    logOut();
  };

  return (
    <nav className="navbar rounded-md sticky top-0 z-20 bg-gray-800 backdrop-blur-3xl border-b-2 border-b-gray-700">
      <div className="container mx-auto flex justify-between">
        <Link to={"/"} className="flex items-center gap-4">
          <i className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-xl shadow-cyan-500/25 transition-color p-2 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 48 48"
              className="text-white"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="4"
              >
                <path d="M2 17.4L23.022 9l21.022 8.4l-21.022 8.4z" />
                <path
                  strokeLinecap="round"
                  d="M44.044 17.51v9.223m-32.488-4.908v12.442S16.366 39 23.022 39c6.657 0 11.467-4.733 11.467-4.733V21.825"
                />
              </g>
            </svg>
          </i>
          <div className="flex flex-col">
            <p className="text-xl font-semibold text-white">Test Vocacional</p>
            <div className="stars flex gap-1"></div>
          </div>
        </Link>
        <div className="flex gap-2 justify-center items-center">
          <span className="text-white">{user?.username}</span>
          {user ? (
            <div className="dropdown dropdown-end z-10">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full flex flex-row justify-center items-center border border-gray-500">
                  <p className="text-2xl uppercase">{user?.username.at()}</p>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-50"
              >
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                {user?.rol === "administrador" && (
                  <li>
                    <Link to={"/dashboard"}>Dashboard</Link>
                  </li>
                )}

                <li>
                  <button onClick={handleLogout}>Cerrar Sesión</button>
                </li>
              </ul>
            </div>
          ) : (
            <ul className="menu menu-horizontal items-center px-1 gap-2">
              {/* validar-estudiante */}
              <li>
                <Link
                  to="/login"
                  className="btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 text-white border-0 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-lg shadow-cyan-500/25 transition-color"
                >
                  Iniciar Sesión
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};
