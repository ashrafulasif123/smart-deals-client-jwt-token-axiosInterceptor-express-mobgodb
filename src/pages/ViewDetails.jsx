import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import axiosInstance from "../axios/axiosInstance";
import { useAuth } from "../hooks/useAuth";
import Swal from "sweetalert2";
import { ProductBid } from "../components/ProductBid/ProductBid";

export const ViewDetails = () => {
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [productBids, setProductBids] = useState([]);
  const { user } = useAuth();
  const params = useParams();
  const id = params.id;

  const bidModalRef = useRef();

  // Product Details
  useEffect(() => {
    axiosInstance.get(`/products/${id}`).then((data) => {
      const product = data.data;

      if (!product) {
        return alert("Product Details not Found");
      }
      setProductDetails(product);
      setLoading(false);
    });
  }, [id]);

  // ProductBids
  useEffect(() => {
    axiosInstance.get(`/productBids/?productId=${id}`).then((response) => {
      setProductBids(response.data);
    });
  }, [id]);

  if (loading) {
    return (
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 loading loading-spinner text-primary"></span>
    );
  }

  const {
    _id: productId,
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
  } = productDetails;

  const handleAddBid = (e) => {
    e.preventDefault();
    const form = e.target;
    const bidPrice = Number(form.price?.value);
    const buyerContact = form.contact?.value?.trim();
    bidModalRef.current.close();
    if (!bidPrice) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Bid Price Cannot Be empty",
      });
    }
    if (bidPrice < price_min || bidPrice > price_max) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Bid Price must be between Minimum & Maximum Price",
      });
    }
    if (!buyerContact) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Buyer Contact Can not be Empty",
      });
    }
    const bdPhoneRegex = /^01[3-9]\d{8}$/;
    if (!bdPhoneRegex.test(buyerContact)) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Contact Should be Valid",
      });
    }

    const bidProduct = {
      productId,
      buyerName: user?.displayName,
      buyerEmail: user?.email,
      buyerPhoto: user?.photoURL,
      bidPrice,
      buyerContact,
    };
    axiosInstance
      .post("/bids", bidProduct)
      .then((res) => {
        const insertedId = res.data.insertedId;
        if (insertedId) {
          bidProduct.insertedId = insertedId;
          setProductBids([...productBids, bidProduct]);
          return Swal.fire({
            icon: "success",
            title: "success",
            text: "bid successfully inserted",
          });
        }
      })
      .catch((error) => {
        if (error.response?.status === 409) {
          const message = error.response.data.message;
          return Swal.fire({
            icon: "error",
            title: "Exist",
            text: message,
          });
        }
        Swal.fire({
          icon: "error",
          title: "Oppss...",
          text: "Insetion Failed",
        });
      })
      .finally(() => {});
  };

  return (
    <>
      <div className="card bg-base-100 w-full shadow-md border border-gray-200">
        <figure>
          <img src={image} alt={title} className="w-full h-56 object-cover" />
        </figure>

        <div className="card-body">
          <h2 className="card-title">{title}</h2>

          <p className="text-lg font-semibold">
            ৳{price_min} - ৳{price_max}
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
              <span className="font-semibold">Created:</span>
              {new Date(created_at).toLocaleDateString()}
            </p>
          </div>

          <p className="text-gray-600">{description}</p>

          <div className="card-actions justify-end">
            <button
              onClick={() => bidModalRef.current.showModal()}
              className="btn btn-warning"
            >
              I want to Bid This Product
            </button>
          </div>
        </div>
        {/* Bid Modal Dialog */}
        {/* Open the modal using document.getElementById('ID').showModal() method */}

        <dialog
          ref={bidModalRef}
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <form onSubmit={handleAddBid}>
              <div className="mb-4">
                <label className="mr-4">Place Your Price</label>
                <input
                  type="number"
                  name="price"
                  placeholder={`Place Your Price Between ${price_min} to ${price_max}`}
                  className="input input-bordered"
                />
              </div>

              <div className="mb-4">
                <label className="mr-4">Contact</label>
                <input
                  type="tel"
                  name="contact"
                  placeholder="Your Contact Number"
                  className="input input-bordered"
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Submit Bid
              </button>
            </form>
            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={() => bidModalRef.current.close()}
                className="btn"
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      </div>
      {"Product Bids"}
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="table w-full">
          {/* Table Head */}
          <thead className="bg-base-200">
            <tr>
              <th>Product Id</th>
              <th>Buyer</th>
              <th>Buyer Email</th>
              <th>Bid Price</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {productBids.map((productBid) => (
              <ProductBid
                key={productBid._id}
                productBid={productBid}
              ></ProductBid>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
