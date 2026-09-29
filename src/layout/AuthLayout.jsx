import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

export const AuthLayout = () => {
  <ToastContainer />;
  return (
    <>
      <ToastContainer />;
      <Outlet />
    </>
  );
};
