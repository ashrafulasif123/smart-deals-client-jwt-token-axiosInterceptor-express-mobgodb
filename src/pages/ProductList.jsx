import { useEffect, useRef, useState } from "react";
import axiosInstance from "../axios/axiosInstance";
import { Product } from "../components/Product/Product";
import Swal from "sweetalert2";
import { format } from "date-fns";

export const ProductList = () => {
  const [productLists, setProductLists] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [product, setProduct] = useState({});
  const productDetailsModal = useRef();
  const productsUpdateModal = useRef();
  useEffect(() => {
    axiosInstance.get("/").then((res) => {
      setProductLists(res.data);
    });
  }, [refetch]);

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

  /** Start Update Product */
  const handleProductUpdate = (e) => {
    productsUpdateModal.current.close();
    e.preventDefault();
    const form = e.target;

    const title = form.title.value;
    const price_min = Number(form.price_min.value);
    const price_max = Number(form.price_max.value);
    const email = form.email.value;
    const category = form.category.value;
    const created_at = form.created_at.value;
    const image = form.image.value;
    const status = form.status.value;
    const location = form.location.value;
    const seller_image = form.seller_image.value;
    const seller_name = form.seller_name.value;
    const condition = form.condition.value;
    const usage = form.usage.value;
    const description = form.description.value;
    const seller_contact = form.seller_contact.value;
    const expired_date = form.expired_date.value;

    // Required field validation
    if (
      !title ||
      !price_min ||
      !price_max ||
      !email ||
      !category ||
      !created_at ||
      !image ||
      !status ||
      !location ||
      !seller_image ||
      !seller_name ||
      !condition ||
      !usage ||
      !description ||
      !seller_contact ||
      !expired_date
    ) {
      return Swal.fire({
        icon: "warning",
        title: "Please fill up all fields",
      });
    }

    // Price validation
    if (price_min <= 0 || price_max <= 0) {
      return Swal.fire({
        icon: "warning",
        title: "Invalid Price",
        text: "Price must be greater than 0.",
      });
    }

    if (price_min > price_max) {
      return Swal.fire({
        icon: "warning",
        title: "Invalid Price Range",
        text: "Minimum price cannot be greater than maximum price.",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return Swal.fire({
        icon: "warning",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
    }

    // Bangladesh phone number validation
    const phoneRegex = /^01[3-9]\d{8}$/;

    if (!phoneRegex.test(seller_contact)) {
      return Swal.fire({
        icon: "warning",
        title: "Invalid Contact Number",
        text: "Please enter a valid Bangladesh mobile number.",
      });
    }

    // Expired date validation
    if (expired_date < created_at) {
      return Swal.fire({
        icon: "warning",
        title: "Invalid Date",
        text: "Expired date cannot be earlier than created date.",
      });
    }

    const updatedProduct = {
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
    };

    Swal.fire({
      title: "Do you want to Update the Product?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axiosInstance
          .put(`/product/${id}`, updatedProduct)
          .then((res) => {
            if (res.data.modifiedCount === 1) {
              Swal.fire("Update!", "", "success");
              setProductLists((prevProducts) => {
                return prevProducts.map((product) => {
                  const { _id } = product;
                  return _id === id
                    ? {
                        ...product,
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
                      }
                    : product;
                });
              });
            } else {
              const message = res.data.message;
              const status = res.status;
              Swal.fire("Oooops..", `Status: ${status} : ${message}`);
            }
          })
          .catch((error) => {
            const message =
              error.response?.data.message || error.response?.statusText;
            const status = error.response?.status;
            Swal.fire(`${status} : ${message}`, "", "error");
          });
      } else if (result.isDenied) Swal.fire("Update Cancel", "", "info");
    });
  };
  /** End Update Product */

  /** Start Delete Product */
  const handleDeleteProduct = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axiosInstance
            .delete(`/products/${id}`)
            .then((res) => {
              if (res.data.deletedCount) {
                swalWithBootstrapButtons.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
                });
                setRefetch((prev) => !prev);
                // setProductLists((previousProducts) => {
                //   return previousProducts.filter(
                //     (product) => product._id !== id,
                //   );
                // });
                // setProductLists((previousProducts) =>
                //   previousProducts.filter((product) => product._id !== id),
                // );
              }
            })
            .catch((error) => {
              const message =
                error.response?.data.message || error.response?.statusText;
              const status = error.response?.status;
              return Swal.fire({
                icon: "error",
                title: "Oppss...",
                text: `${status} : ${message}`,
              });
            });
        } else if (result.dismiss === Swal.DismissReason.cancel)
          /* Read more about handling dismissals below */
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
      });
  };
  /** End Delete Product */

  return (
    <>
      <table className="table w-full">
        {/* Table Head */}
        <thead className="bg-base-200">
          <tr>
            <th>Title</th>
            <th>Seller</th>
            <th>Seler Email</th>
            <th>Bid Price</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {productLists.map((product) => (
            <Product
              key={product._id}
              product={product}
              setProduct={setProduct}
              productDetailsModal={productDetailsModal}
              productsUpdateModal={productsUpdateModal}
              handleDeleteProduct={handleDeleteProduct}
            ></Product>
          ))}
        </tbody>
      </table>

      {/* Product Details Modal */}

      <dialog
        ref={productDetailsModal}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          {/* Product Image */}
          <img
            src={image}
            alt={title}
            className="w-full h-56 object-cover rounded-lg mb-4"
          />

          {/* Product Title */}
          <h2 className="text-2xl font-bold mb-3">{title}</h2>

          {/* Price */}
          <p className="text-lg font-semibold mb-2">
            Price: {price_min} - {price_max}
          </p>

          {/* Basic Information */}
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-semibold">Category:</span> {category}
            </p>

            <p>
              <span className="font-semibold">Condition:</span> {condition}
            </p>

            <p>
              <span className="font-semibold">Usage:</span> {usage}
            </p>

            <p>
              <span className="font-semibold">Location:</span> {location}
            </p>

            <p>
              <span className="font-semibold">Status:</span> {status}
            </p>

            <p>
              <span className="font-semibold">Seller:</span> {seller_name}
            </p>

            <p>
              <span className="font-semibold">Contact:</span> {seller_contact}
            </p>

            <p>
              <span className="font-semibold">Expires:</span> {expired_date}
            </p>
          </div>

          {/* Description */}
          <div className="mt-4">
            <h3 className="font-semibold mb-1">Description</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>

          {/* Close */}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      {/**Product Update Modal */}
      <dialog
        ref={productsUpdateModal}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <form onSubmit={handleProductUpdate}>
            {/* Title */}
            <label className="label">Title</label>
            <input
              type="text"
              name="title"
              defaultValue={title}
              className="input input-bordered w-full"
            />

            {/* Price Min */}
            <label className="label">Minimum Price</label>
            <input
              type="number"
              name="price_min"
              defaultValue={price_min}
              className="input input-bordered w-full"
            />

            {/* Price Max */}
            <label className="label">Maximum Price</label>
            <input
              type="number"
              name="price_max"
              defaultValue={price_max}
              className="input input-bordered w-full"
            />

            {/* Email */}
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              defaultValue={email}
              className="input input-bordered w-full"
            />

            {/* Category */}
            <label className="label">Category</label>
            <input
              type="text"
              name="category"
              defaultValue={category}
              className="input input-bordered w-full"
            />

            {/* Created At */}
            <label className="label">Created At</label>
            <input
              type="date"
              name="created_at"
              defaultValue={
                created_at && format(new Date(created_at), "yyyy-MM-dd")
              }
              className="input input-bordered w-full"
            />

            {/* Image */}
            <label className="label">Image</label>
            <input
              type="text"
              name="image"
              defaultValue={image}
              className="input input-bordered w-full"
            />

            {/* Status */}
            <label className="label">Status</label>
            <input
              type="text"
              name="status"
              defaultValue={status}
              className="input input-bordered w-full"
            />

            {/* Location */}
            <label className="label">Location</label>
            <input
              type="text"
              name="location"
              defaultValue={location}
              className="input input-bordered w-full"
            />

            {/* Seller Image */}
            <label className="label">Seller Image</label>
            <input
              type="text"
              name="seller_image"
              defaultValue={seller_image}
              className="input input-bordered w-full"
            />

            {/* Seller Name */}
            <label className="label">Seller Name</label>
            <input
              type="text"
              name="seller_name"
              defaultValue={seller_name}
              className="input input-bordered w-full"
            />

            {/* Condition */}
            <label className="label">Condition</label>
            <input
              type="text"
              name="condition"
              defaultValue={condition}
              className="input input-bordered w-full"
            />

            {/* Usage */}
            <label className="label">Usage</label>
            <input
              type="text"
              name="usage"
              defaultValue={usage}
              className="input input-bordered w-full"
            />

            {/* Description */}
            <label className="label">Description</label>
            <textarea
              name="description"
              defaultValue={description}
              className="textarea textarea-bordered w-full"
            />

            {/* Seller Contact */}
            <label className="label">Seller Contact</label>
            <input
              type="text"
              name="seller_contact"
              defaultValue={seller_contact}
              className="input input-bordered w-full"
            />

            {/* Expired Date */}
            <label className="label">Expired Date</label>
            <input
              type="date"
              name="expired_date"
              defaultValue={expired_date}
              className="input input-bordered w-full"
            />

            {/* Action */}
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Update
              </button>

              <button
                type="button"
                className="btn"
                onClick={() => productsUpdateModal.current.close()}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};
