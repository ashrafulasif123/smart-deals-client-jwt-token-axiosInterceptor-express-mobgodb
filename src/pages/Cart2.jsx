import { useOutletContext } from "react-router";
import { CartItem } from "../components/CartItem/CartItem";

export const Cart2 = () => {
  const { cart, handleDeleteCartItem } = useOutletContext();
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Price</th>
            <th>Category</th>
            <th>Location</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product) => (
            <CartItem
              key={product.id}
              product={product}
              handleDeleteCartItem={handleDeleteCartItem}
            ></CartItem>
          ))}
        </tbody>
      </table>
    </div>
  );
};
