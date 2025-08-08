import { Link, Outlet, useLocation } from "react-router-dom";
import useApp from "../store/store";

export const BreadCrumbs = () => {
  const location = useLocation();
  const user = useApp((state) => state.user);

  return (
    <>
      <main>
        {user?.rol === "administrador" && (
          <section className="flex flex-col md:flex-row justify-between items-center gap-2">
            <h1 className="text-3xl text-gray-800">Dashboard</h1>
            <ul className="menu menu-horizontal px-1 gap-2">
              <li>
                <Link to={"/dashboard"} className="btn btn-block">
                  Dashboard
                </Link>
              </li>
            </ul>
          </section>
        )}
        <div className="breadcrumbs text-sm text-gray-800">
          <ul>
            <li>
              <Link to={"/"} className="text-gray-800">
                Home
              </Link>
            </li>
            <li>
              <Link to={location} className="capitalize text-gray-800">
                {location.pathname.slice(1, location.pathname.length)}
              </Link>
            </li>
          </ul>
        </div>
        {<Outlet />}
      </main>
    </>
  );
};
