import { Footer, NavBar } from "../components";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <NavBar />
      <main
        className={`min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-indigo-100 p-4`}
      >
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
