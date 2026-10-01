import { Outlet } from "react-router";
import { Navbar } from "../components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";

export const Root = () => {
  return (
    <div className="relative min-h-screen">
      <Navbar></Navbar>
      <main className="max-w-7xl mx-auto px-4">
        <ToastContainer />
        <Outlet />
      </main>
    </div>
  );
};
