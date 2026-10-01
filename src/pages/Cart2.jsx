import { CartItem } from "../components/CartItem/CartItem";

import { useEffect, useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router";
import { getCartIds, removeCartId } from "../utilities/localstorage";
import Swal from "sweetalert2";
import { useRef } from "react";
import { useAuth } from "../hooks/useAuth";
import { useAxiosSecure } from "../hooks/useAxiosSecure";

export const Cart2 = () => {
  const { user } = useAuth();
  const location = useLocation();
  const axiosSecureInstance = useAxiosSecure();
  const navigate = useNavigate();
  const products = useLoaderData().data;
  const [selectedProduct, setSelectedProduct] = useState({});
  const { _id: id, price_min, price_max } = selectedProduct;

  const [cartProducts, setCartProducts] = useState([]);
  const bidModalRef = useRef();
  useEffect(() => {
    const cartIds = getCartIds();
    const productsFilter = products.filter((product) =>
      cartIds.includes(product._id),
    );
    setCartProducts(productsFilter);
  }, [products]);

  const handleAddBidModal = (product) => {
    if (!user) {
      Swal.fire("Please Login First");
      return navigate("/login", {
        state: {
          from: location,
        },
      });
    }
    setSelectedProduct(product);
    bidModalRef.current.showModal();
  };

  const handleAddBid = (e) => {
    e.preventDefault();
    bidModalRef.current.close();
    const form = e.target;
    const bidPrice = form.price.value;
    const buyerContact = form.contact.value;

    if (bidPrice < price_min || bidPrice > price_max) {
      return Swal.fire("Bid Price Must be in range");
    }
    const bdPhoneRegex = /^01[3-9]\d{8}$/;
    if (!bdPhoneRegex.test(buyerContact)) {
      return Swal.fire("Contact Should be Valid");
    }

    const newBid = {
      productId: id,
      buyerName: user?.email,
      buyerEmail: user?.email,
      buyerPhoto: user?.photoURL,
      bidPrice,
      buyerContact,
    };
    axiosSecureInstance
      .post("/bids", newBid)
      .then((res) => {
        console.log(res);
        if (res.data.insertedId) {
          removeCartId(id);
          const cartProductFilter = cartProducts.filter(
            (product) => product._id !== id,
          );
          setCartProducts(cartProductFilter);
          Swal.fire({
            title: "You have Successfully add Bid",
            icon: "success",
            draggable: true,
          });
        }
      })
      .catch((error) => {
        const message =
          error.response?.data.message || error.response?.statusText;
        const status = error.response?.status;
        Swal.fire({
          title: `Status ${status} : ${message}`,
          icon: "error",
          draggable: true,
        });
      });
  };

  const handleDeleteCartItem = (id) => {
    removeCartId(id);
    const cartIds = getCartIds();
    const exist = cartIds.includes(id);
    if (exist) {
      return Swal.fire("Delete Not Successfull");
    }
    const remainingCartProducts = cartProducts.filter(
      (product) => product._id !== id,
    );
    setCartProducts(remainingCartProducts);
    return Swal.fire("Successfull Delete");
  };

  return (
    <>
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
            {cartProducts.map((product) => (
              <CartItem
                key={product.id}
                product={product}
                handleDeleteCartItem={handleDeleteCartItem}
                handleAddBidModal={handleAddBidModal}
              ></CartItem>
            ))}
          </tbody>
        </table>
      </div>

      <dialog ref={bidModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form onSubmit={handleAddBid}>
            <div className="mb-4">
              <label className="mr-4">Place Your Price</label>
              <input
                type="number"
                name="price"
                placeholder={`Place Your Price Between ${price_min} to ${price_max}`}
                className="input input-bordered"
                required
              />
            </div>

            <div className="mb-4">
              <label className="mr-4">Contact</label>
              <input
                type="tel"
                name="contact"
                placeholder="Your Contact Number"
                className="input input-bordered"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit Bid
            </button>
          </form>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button onClick={() => bidModalRef.current.close()} className="btn">
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};
