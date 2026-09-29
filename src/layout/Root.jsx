import { Outlet } from "react-router";
import { Navbar } from "../components/Navbar/Navbar";
import { useState } from "react";
import Swal from "sweetalert2";
import { ToastContainer } from "react-toastify";

export const Root = () => {
  const [cart, setCart] = useState([]);
  const handleAddCart = (id, product) => {
    const existProduct = cart.find((c) => c.id === id);
    if (existProduct) {
      return alert("You have already Add This Product");
    }
    const updateCart = [...cart, product];
    setCart(updateCart);
  };
  const handleDeleteCartItem = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updateCart = cart.filter((product) => productId !== product.id);
        setCart(updateCart);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  return (
    <div className="relative min-h-screen">
      <Navbar cart={cart}></Navbar>
      <main className="max-w-7xl mx-auto px-4">
        <ToastContainer />
        <Outlet context={{ handleAddCart, cart, handleDeleteCartItem }} />
      </main>
    </div>
  );
};
