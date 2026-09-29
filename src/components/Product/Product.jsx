import { format } from "date-fns";
import { Link, useOutletContext } from "react-router";

export const Product = ({
  product,
  view,
  setProduct,
  productDetailsModal,
  productsUpdateModal,
  handleDeleteProduct,
}) => {
  const { handleAddCart } = useOutletContext();

  const handleProductDetailsModal = () => {
    productDetailsModal.current.showModal();
    setProduct(product);
  };

  const handleProductUpdateModal = () => {
    productsUpdateModal.current.showModal();
    setProduct(product);
  };

  const {
    _id: id,
    title,
    price_min,
    price_max,
    email,
    category,
    created_at,
    image,
    status,
    location,
    seller_image,
    seller_name,
    condition,
    usage,
    description,
    seller_contact,
    expired_date,
  } = product;

  if (view === "card")
    return (
      <div className="card bg-base-100 w-full shadow-md border border-gray-200">
        <figure>
          <img src={image} alt={title} className="w-full h-56 object-cover" />
        </figure>

        <div className="card-body">
          <h2 className="card-title">{title}</h2>

          <p className="text-lg font-semibold">
            ${price_min} - ${price_max}
          </p>

          <div className="flex items-center gap-2">
            <img
              src={seller_image}
              alt={seller_name}
              className="w-10 h-10 rounded-full object-cover"
            />

            <div>
              <p className="font-medium">{seller_name}</p>
              <p className="text-sm text-gray-500">{email}</p>
            </div>
          </div>

          <div className="space-y-1 text-sm">
            <p>
              <span className="font-semibold">ID:</span> {id}
            </p>

            <p>
              <span className="font-semibold">Category:</span> {category}
            </p>

            <p>
              <span className="font-semibold">Location:</span> {location}
            </p>

            <p>
              <span className="font-semibold">Condition:</span> {condition}
            </p>

            <p>
              <span className="font-semibold">Usage:</span> {usage}
            </p>

            <p>
              <span className="font-semibold">Status:</span> {status}
            </p>

            <p>
              <span className="font-semibold">Contact:</span> {seller_contact}
            </p>

            <p>
              <span className="font-semibold">Created : </span>
              {new Date(created_at).toLocaleDateString()}
            </p>
            <p>
              {product.expired_date &&
                format(new Date(expired_date), "yyyy-MM-dd")}
            </p>
          </div>

          <p className="text-gray-600">{description}</p>

          <div className="card-actions justify-around">
            <button></button>
            <Link className="btn btn-primary" to={`/viewDetails/${id}`}>
              View Details
            </Link>
            <button
              onClick={() => handleAddCart(id, product)}
              className="btn btn-warning"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <>
      <tr className="hover:bg-base-100">
        <td>{title}</td>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={seller_image} alt="Buyer" />
              </div>
            </div>

            <div>
              <div className="font-bold">{seller_name}</div>
            </div>
          </div>
        </td>

        <td>{email}</td>

        <td className="font-semibold text-primary">
          ${price_min} - ${price_max}
        </td>

        <td>{seller_contact}</td>

        <td>
          <button
            onClick={handleProductDetailsModal}
            className="btn btn-dash btn-success"
          >
            Product Details
          </button>
        </td>
        <td>
          <button
            onClick={handleProductUpdateModal}
            className="btn btn-dash btn-neutral"
          >
            Update
          </button>
        </td>
        <td>
          <button
            onClick={() => handleDeleteProduct(id)}
            className="btn btn-dash btn-error"
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};
