import { Product } from "../Product/Product";

export const Products = ({ products }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8 text-center">All Products</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <Product key={product.id} product={product} view="card"></Product>
        ))}
      </div>
    </div>
  );
};
