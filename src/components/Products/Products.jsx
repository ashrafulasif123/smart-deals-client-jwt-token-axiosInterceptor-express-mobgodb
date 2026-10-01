import Swal from "sweetalert2";
import { getCartIds, setCartId } from "../../utilities/localstorage";
import { Product } from "../Product/Product";

export const Products = ({ products }) => {
  const handleAddCart = (id) => {
    const cartIds = getCartIds();
    if (cartIds.includes(id)) {
      return Swal.fire("You have Already Added This Product to Cart");
    }
    setCartId(id);
  };
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8 text-center">All Products</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            view="card"
            handleAddCart={handleAddCart}
          ></Product>
        ))}
      </div>
    </div>
  );
};
