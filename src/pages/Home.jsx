import { useLoaderData } from "react-router";
import { Products } from "../components/Products/Products";

export const Home = () => {
  const data = useLoaderData();
  const products = data.data;
  return (
    <div className="my-8">
      <Products products={products}></Products>
    </div>
  );
};
