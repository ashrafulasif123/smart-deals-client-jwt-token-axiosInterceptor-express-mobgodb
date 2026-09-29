import { useEffect, useRef, useState } from "react";
import axiosInstance from "../axios/axiosInstance";
import { useAuth } from "../hooks/useAuth";
import { MyBid } from "../components/MyBid/MyBid";
import Swal from "sweetalert2";
import { useAxiosSecure } from "../hooks/useAxiosSecure";

export const MyBids = () => {
  const [myBids, setMyBids] = useState([]);
  const [myBidsLoading, setMyBidsLoading] = useState(true);
  const [productDetailsLoading, setProductDetailsLoading] = useState(false);
  const [productDetails, setProductDetail] = useState({});
  const { user } = useAuth();
  const axiosSecureInstance = useAxiosSecure();

  const productDetailsModal = useRef();

  const handleProductDetailsModal = (id) => {
    setProductDetailsLoading(true);
    axiosInstance
      .get(`/products/${id}`)
      .then((response) => {
        setProductDetail(response.data);
        setProductDetailsLoading(false);
        productDetailsModal.current.showModal();
      })
      .catch((error) => {
        const message = error.response?.message || error.response?.statusText;
        const status = error.response?.status;
        Swal.fire({
          icon: "question",
          title: "Oppss...",
          text: `Status ${status} : ${message}`,
        });
      });
  };

  useEffect(() => {
    if (!user?.email) return;
    axiosSecureInstance
      .get(`/myBids/?buyerEmail=${user?.email}`)
      .then((response) => {
        setMyBids(response.data);
        setMyBidsLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        const message =
          error.response?.data.message || error.response?.statusText;
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          setMyBidsLoading(false);
          return;
        }
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Status ${status} : ${message}`,
        });
        setMyBidsLoading(false);
      });
  }, [user?.email, axiosSecureInstance]);

  const handleDeleteBid = (bidId) => {
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
            .delete(`/bidDelete/${bidId}`)
            .then((response) => {
              const deletedId = response.data.deletedCount;
              if (deletedId) {
                const myBidsFiltered = myBids.filter(
                  (bid) => bid._id !== bidId,
                );
                setMyBids(myBidsFiltered);
                swalWithBootstrapButtons.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
                });
              } else {
                const message = response?.data.message || response?.statusText;
                const status = response.status;
                return Swal.fire({
                  icon: "warning",
                  title: "Oppss...",
                  text: `Status : ${status} : ${message}`,
                });
              }
            })
            .catch((error) => {
              const message =
                error.response?.data.message || error.response?.statusText;
              const status = error.response.status;
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
  const {
    category,
    condition,
    description,
    image,
    location,
    price_max,
    price_min,
    seller_contact,
    seller_image,
    seller_name,
    status,
    title,
  } = productDetails;

  if (myBidsLoading) {
    return (
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 loading loading-spinner text-error"></span>
    );
  }
  // if (productDetailsLoading) {
  //   return (
  //     <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 loading loading-spinner text-error"></span>
  //   );
  // }
  return (
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
          {myBids.map((bid) => (
            <MyBid
              key={bid._id}
              bid={bid}
              handleProductDetailsModal={handleProductDetailsModal}
              handleDeleteBid={handleDeleteBid}
            ></MyBid>
          ))}
        </tbody>
      </table>

      <dialog
        ref={productDetailsModal}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box max-w-2xl p-0 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h3 className="text-xl font-bold">Product Details</h3>

            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost">✕</button>
            </form>
          </div>

          {/* Scrollable Content */}

          {productDetailsLoading ? (
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 loading loading-bars loading-xl"></span>
          ) : (
            <div className="max-h-[70vh] overflow-y-auto">
              {/* Product Image */}
              <div className="w-full h-56">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="p-6">
                {/* Title + Status */}
                <div className="flex justify-between items-start gap-4 mb-4">
                  <h3 className="text-2xl font-bold">{title}</h3>

                  <span className="badge badge-primary">{status}</span>
                </div>

                {/* Category & Condition */}
                <div className="flex flex-wrap gap-2 mb-5">
                  <span className="badge badge-outline">{category}</span>

                  <span className="badge badge-outline">{condition}</span>
                </div>

                {/* Price */}
                <div className="bg-base-200 rounded-lg p-4 mb-5">
                  <p className="text-sm text-gray-500">Price Range</p>

                  <p className="text-xl font-bold text-primary">
                    ${price_min} - ${price_max}
                  </p>
                </div>

                {/* Description */}
                <div className="mb-5">
                  <h4 className="font-semibold text-lg mb-1">Description</h4>

                  <p className="text-gray-600 leading-relaxed">{description}</p>
                </div>

                {/* Location */}
                <div className="mb-5">
                  <span className="font-semibold">Location:</span> {location}
                </div>

                {/* Seller */}
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-lg mb-3">
                    Seller Information
                  </h4>

                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-full">
                        <img src={seller_image} alt={seller_name} />
                      </div>
                    </div>

                    <div>
                      <p className="font-semibold">{seller_name}</p>

                      <p className="text-sm text-gray-500">{seller_contact}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="border-t px-6 py-4 flex justify-end">
            <form method="dialog">
              <button className="btn btn-primary">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};
